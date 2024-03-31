import React, { useEffect, useState } from 'react';

const CarList = () => {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetch('https://used-car-dealership-be.onrender.com/api/cars/')
            .then((response) => response.json())
            .then((data) => setCars(data))
            .catch((error) => console.error("Fetching cars failed", error));
    }, []);

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
