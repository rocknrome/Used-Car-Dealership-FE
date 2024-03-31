import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../styles.css';

const CarShowPage = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`https://used-car-dealership-be.onrender.com/api/cars/${carId}`);
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>Car not found.</div>;

  return (
    <div className="car-show-container">
  <h2 className="car-show-header">{car.make} {car.model} - {car.year}</h2>
  <img src={car.photo_url} alt={`${car.make} ${car.model}`} className="car-show-image" />
  <div className="car-show-detail"><strong>Color:</strong> {car.color}</div>
  <div className="car-show-detail"><strong>Mileage:</strong> {car.mileage} miles</div>
  <div className="car-show-detail"><strong>Price:</strong> ${car.price}</div>
  <div className="car-show-description">{car.description}</div>
</div>

  );
};

export default CarShowPage;
