import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './CarList/CarList';
import CarShowPage from './CarShowPage/CarShowPage'; // Make sure the path matches your file structure
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
    <Router>
      <div className="app-content">
        <h1>Cars for Sale</h1>
        <Routes>
            <Route path="/" element={<CarList cars={cars} />} />
            <Route path="/cars/:carId" element={<CarShowPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
