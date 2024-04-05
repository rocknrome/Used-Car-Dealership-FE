import React, { useEffect, useState } from 'react';
import '../styles.css';
import { Link, useNavigate } from 'react-router-dom';

const CarList = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]); // State to hold the list of cars

  useEffect(() => {
    // Fetching cars from backend
    const fetchCars = async () => {
      try {
        const response = await fetch('https://used-car-dealership-be.onrender.com/api/cars/');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error("Error fetching cars:", error);
      }
    };

    fetchCars();
  }, []); // Empty array means this effect runs once on mount

  const handleAddCarClick = () => {
    navigate('/cars/add');
  };

  return (
    <div>
      <div className="header-container">
        <img src="https://i.ibb.co/5xK9zRc/logo-transparent.png" alt="Logo" className="logo" />
      </div>
      <button onClick={handleAddCarClick} className="add-car-button">Sell Your Car</button>
      <div className="car-list-container">
        {cars.map((car) => (
          <Link to={`/cars/${car.id}`} key={car.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className="car-card">
              <div className="car-image-container">
                <img src={car.photo_url} alt={`${car.make} ${car.model}`} className="car-image"/>
              </div>
              <div className="car-info">
                <h3>{`${car.make} ${car.model}`}</h3>
                <p>Color: {car.color}</p>
                <p>Year: {car.year}</p>
                <p>Mileage: {new Intl.NumberFormat('fr-FR').format(car.mileage)} miles</p>
                <p>Price: ${new Intl.NumberFormat('en-US').format(car.price)}</p>
                <p>{car.description}</p>
                <button className="buy-now-button">Buy Now</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarList;
