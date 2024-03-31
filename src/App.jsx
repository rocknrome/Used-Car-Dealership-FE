import React, { useEffect, useState } from 'react';

const CarList = () => {
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
        <div>
            <h1>Cars for Sale</h1>
            <ul>
                {cars.map((car) => (
                    <li key={car.id}>{car.make} {car.model} - {car.year}</li>
                ))}
            </ul>
        </div>
    );
};

export default CarList;
