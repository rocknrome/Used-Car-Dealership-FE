import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CarList from './CarList/CarList';
import CarShowPage from './CarShowPage/CarShowPage';
import EditCarPage from './EditCarPage';
import AddCarForm from './AddCarForm';
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
        <Routes>
          <Route path="/" element={<CarList cars={cars} />} />
          <Route path="/cars/add" element={<AddCarForm />} />
          <Route path="/cars/:carId" element={<CarShowPage />} />
          <Route path="/cars/edit/:carId" element={<EditCarPage />} />
          
        </Routes>
      </div>
    </Router>
  );
};

export default App;
