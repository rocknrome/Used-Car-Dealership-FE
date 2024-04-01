const BASE_URL = 'https://used-car-dealership-be.onrender.com/api/cars/';

// Fetch all cars
export const fetchCars = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch cars: ${response.statusText} (${response.status})`);
  }
  return response.json();
};

// Fetch a single car by ID
export const fetchCarById = async (carId) => {
  const response = await fetch(`${BASE_URL}/${carId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch car with ID ${carId}: ${response.statusText} (${response.status})`);
  }
  return response.json();
};

// Add a new car
export const addCar = async (carData) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
  if (!response.ok) {
    throw new Error(`Failed to add new car: ${response.statusText} (${response.status})`);
  }
  return response.json();
};

// Update an existing car
export const updateCar = async (carId, carData) => {
  const response = await fetch(`${BASE_URL}/${carId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(carData),
  });
  if (!response.ok) {
    throw new Error(`Failed to update car: ${response.statusText} (${response.status})`);
  }
  return response.json();
};

// Delete a car
export const deleteCar = async (carId) => {
  const response = await fetch(`${BASE_URL}/${carId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    throw new Error(`Failed to delete car: ${response.statusText} (${response.status})`);
  }
  // returning true or some indication of success if no content is expected
  return response.ok;
};
