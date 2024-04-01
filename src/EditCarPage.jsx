import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './styles.css'; // Assumes styles.css is located at the src level

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
    const fetchCarDetails = async () => {
      try {
        const response = await fetch(`https://used-car-dealership-be.onrender.com/api/cars/${carId}/`);
        if (!response.ok) throw new Error('Failed to fetch car details');
        const data = await response.json();
        setCar(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        console.error(err);
      }
    };

    fetchCarDetails();
  }, [carId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCar(prevCar => ({ ...prevCar, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const response = await fetch(`https://used-car-dealership-be.onrender.com/api/cars/${carId}/`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(car),
          });
          
      if (!response.ok) throw new Error('Failed to update car details');
      navigate(-1);
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
        <input id="color" name="color" type="text" value={car.color} onChange={handleChange} />

        <label htmlFor="year">Year:</label>
        <input id="year" name="year" type="number" value={car.year} onChange={handleChange} required />

        <label htmlFor="mileage">Mileage:</label>
        <input id="mileage" name="mileage" type="number" value={car.mileage} onChange={handleChange} />

        <label htmlFor="price">Price:</label>
        <input id="price" name="price" type="text" value={car.price} onChange={handleChange} required />

        <label htmlFor="description">Description:</label>
        <textarea id="description" name="description" value={car.description} onChange={handleChange} />

        <label htmlFor="photo_url">Photo URL:</label>
        <input id="photo_url" name="photo_url" type="text" value={car.photo_url} onChange={handleChange} />

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-btn">Update Car</button>
      </form>
    </div>
  );
};

export default EditCarPage;
