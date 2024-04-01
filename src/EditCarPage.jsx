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
        <label htmlFor="model">Model:</label>
        <input id="model" name="model" type="text" value={car.model} onChange={handleChange} required />
        <label htmlFor="color">Color:</label>
        <input id="color" name="color" type="text" value={car.color} onChange={handleChange} required />
        <label htmlFor="year">Year:</label>
        <input id="year" name="year" type="number" value={car.year} onChange={handleChange} required />
        <label htmlFor="mileage">Mileage:</label>
        <input id="mileage" name="mileage" type="number" value={car.mileage} onChange={handleChange} required />
        <label htmlFor="price">Price:</label>
        <input id="price" name="price" type="text" value={car.price} onChange={handleChange} required />
        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={car.description} onChange={handleChange} />
        <label htmlFor="photo_url">Photo URL:</label>
        <input id="photo_url" name="photo_url" type="text" value={car.photo_url} onChange={handleChange} />

        <button type="submit" className="submit-btn">Update Car</button>
      </form>
    </div>
  );
};

export default EditCarPage;
