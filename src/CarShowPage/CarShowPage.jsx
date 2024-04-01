import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import '../styles.css';

const CarShowPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (!carId) {
        setError('Car ID is invalid');
        setLoading(false);
        return;
      }
      
      try {
        const url = `https://used-car-dealership-be.onrender.com/api/cars/${encodeURIComponent(carId)}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Could not fetch car data');
        }
        const data = await response.json();
        setCar(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetching car failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleBackClick = () => {
    navigate('/');
  };

  const handleDelete = async () => {
    const confirmation = window.confirm('Are you sure you want to delete this car?');
    if (confirmation) {
      try {
        const response = await fetch(`https://used-car-dealership-be.onrender.com/api/cars/${encodeURIComponent(carId)}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete car');
        }
        navigate('/'); // Redirect back to the inventory list after deletion
      } catch (err) {
        setError(err.message);
        console.error("Deleting car failed:", err);
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Car not found.</div>;

  return (
    <div className="car-show-container">
      <div className="navigation-buttons">
        <button onClick={handleBackClick} className="back-to-list-btn">Back to inventory</button>
        <Link to={`/cars/edit/${carId}`} className="edit-car-btn">Edit</Link>
        <button onClick={handleDelete} className="delete-car-btn">Delete</button>
      </div>
      <h2 className="car-show-header">{car.year} {car.make} {car.model}</h2>
      <img src={car.photo_url} alt={`${car.make} ${car.model}`} className="car-show-image" />
      <div className="car-show-detail"><strong>Color:</strong> {car.color}</div>
      <div className="car-show-detail"><strong>Mileage:</strong> {car.mileage} miles</div>
      <div className="car-show-detail"><strong>Price:</strong> ${car.price}</div>
      <div className="car-show-description">{car.description}</div>
    </div>
  );
};

export default CarShowPage;
