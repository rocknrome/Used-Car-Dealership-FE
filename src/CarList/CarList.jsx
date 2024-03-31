import React from 'react';
import './CarList.css';

const CarList = ({ cars }) => {
  return (
    <div className="car-list-container">
      <div className="header">
        <h2>New Arrivals</h2>
      </div>
      <div className="car-list">
        {cars.map((car) => (
          <div key={car.id} className="car-card">
            <div className="car-image-container">
              {/* Use photo_url for the car image */}
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
        ))}
      </div>
    </div>
  );
};

export default CarList;
