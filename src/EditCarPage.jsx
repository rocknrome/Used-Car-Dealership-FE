import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updateCar, fetchCarById } from './services/carService';
import './styles.css';

const EditCarPage = () => {
  const { carId } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({
    make: '',
    model: '',
    color: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
    photo_url: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await fetchCarById(carId);
        setCar(data);
      } catch (err) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateCar(carId, car);
      alert('Car updated successfully!');
      navigate(`/cars/${carId}`);
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="edit-car-container">
      <h2>Edit Car</h2>
      <form onSubmit={handleSubmit} className="edit-car-form">
        <label htmlFor="make">Make:</label>
        <input id="make" name="make" type="text" value={car.make} onChange={handleChange} required />

        {/* Add other input fields similar to the above */}

        <button type="submit" className="submit-btn">Update Car</button>
      </form>
    </div>
  );
};

export default EditCarPage;
