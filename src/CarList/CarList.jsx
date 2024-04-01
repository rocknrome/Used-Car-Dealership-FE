import React from 'react';
import '../styles.css';
import { Link, useNavigate } from 'react-router-dom';

const CarList = ({ cars }) => {
  const navigate = useNavigate();

  const handleAddCarClick = () => {
    navigate('/cars/add');
  };

  return (
    <div>
      <h1>Cars for Sale</h1>
      <button onClick={handleAddCarClick} className="add-car-btn">Add a Car</button>
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
                <p>Mileage: {car.mileage} miles</p>
                <p>Price: ${car.price}</p>
                <p>{car.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CarList;
