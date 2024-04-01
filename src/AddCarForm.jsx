import React, { useState } from 'react';
import { addCar } from './services/carService';
import { useNavigate } from 'react-router-dom';

const AddCarForm = () => {
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    make: '',
    model: '',
    year: '',
    mileage: '',
    price: '',
    description: '',
    photo_url: '',
    color: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addCar(carData);
      alert('Car added successfully!');
      // Resetting form to initial state after successful submission
      setCarData({
        make: '',
        model: '',
        year: '',
        mileage: '',
        price: '',
        description: '',
        photo_url: '',
        color: '',
      });
    } catch (error) {
      console.error('Error adding car:', error);
      setError('Failed to add the car. Please try again.');
    }
  };

  // Function to handle clicking the "Back to inventory" button
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="make" value={carData.make} onChange={handleChange} placeholder="Make" required />
      <input type="text" name="model" value={carData.model} onChange={handleChange} placeholder="Model" required />
      <input type="number" name="year" value={carData.year} onChange={handleChange} placeholder="Year" required />
      <input type="text" name="color" value={carData.color} onChange={handleChange} placeholder="Color" required />
      <input type="number" name="mileage" value={carData.mileage} onChange={handleChange} placeholder="Mileage" required />
      <input type="text" name="price" value={carData.price} onChange={handleChange} placeholder="Price" required />
      <textarea name="description" value={carData.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="photo_url" value={carData.photo_url} onChange={handleChange} placeholder="Photo URL" />
      
      {error && <p className="error-message">{error}</p>}
      
        <div>
            <button type="submit" className="add-car-button">Add Car</button>
            <button type="button" onClick={handleBackClick} className="add-car-button">Back to inventory</button>
        </div>
    </form>
  );
};

export default AddCarForm;
