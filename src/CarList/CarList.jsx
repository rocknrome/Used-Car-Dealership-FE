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
      <div className="header-container">
        <img src="https://live.staticflickr.com/65535/53627450262_be6b5d1702_n.jpg" alt="Logo" className="logo" />
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
