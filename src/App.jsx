import React, { useEffect, useState } from 'react';
import CarList from './CarList/CarList';
import './styles.css';


const App = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
      fetch('https://used-car-dealership-be.onrender.com/api/cars/')
          .then((response) => {
              if (!response.ok) {
                  throw new Error('Network response was not ok');
              }
              return response.json();
          })
          .then((data) => setCars(data))
          .catch((error) => {
              console.error("Fetching cars failed:", error);
              setError("Failed to load cars from the backend.");
          });
  }, []);

  if (error) {
      return <p>{error}</p>;
  }

  return (
    <div className="centered-container">
  <h1>Cars for Sale</h1>
  <CarList cars={cars} />
</div>
  );
};

export default App;
