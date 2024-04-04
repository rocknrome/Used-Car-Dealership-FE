import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import Confetti from 'react-confetti';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { carId } = useParams();
  const location = useLocation();
  const [car, setCar] = useState(location.state ? location.state.car : null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongratsMessage, setShowCongratsMessage] = useState(false);

  const [confettiWidth, setConfettiWidth] = useState(window.innerWidth);
  const [confettiHeight, setConfettiHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setConfettiWidth(window.innerWidth);
      setConfettiHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!car && carId) {
      fetchCarDetails(carId);
    }
  }, [carId, car]);

  const fetchCarDetails = async (id) => {
    try {
      const response = await fetch(`https://used-car-dealership-be.onrender.com/api/cars/${encodeURIComponent(id)}`);
      if (!response.ok) {
        throw new Error('Could not fetch car data');
      }
      const data = await response.json();
      setCar(data);
    } catch (error) {
      console.error("Fetching car failed:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const confirmation = window.confirm('Are you sure you want to buy this car? All sales are final.');
    if (confirmation) {
      setShowConfetti(true);
      setShowCongratsMessage(true);

      try {
        const response = await fetch(`https://used-car-dealership-be.onrender.com/api/cars/${encodeURIComponent(carId)}`, {
          method: 'DELETE',
        });
        if (!response.ok) {
          throw new Error('Failed to delete car');
        }

        setTimeout(() => {
          alert("Purchase Complete! Congratulations on your new car!");
          navigate('/');
        }, 5000);
      } catch (error) {
        console.error("Deleting car failed:", error);
        alert("Failed to complete the purchase. Please try again.");
      }
    } else {
      console.log("Purchase cancelled");
    }
  };

  if (!car) return <div>Loading car details...</div>;

  return (
    <div className="shopping-cart-container">
      {showConfetti && <Confetti width={confettiWidth} height={confettiHeight} />}
      <div className="car-summary">
        <h3>{car.year} {car.make} {car.model}</h3>
        <img src={car.photo_url} alt={`${car.make} ${car.model}`} />
        <p><strong>Color:</strong> {car.color}</p>
        <p><strong>Mileage:</strong> {new Intl.NumberFormat('fr-FR').format(car.mileage)} miles</p>
        <p><strong>Price:</strong> ${new Intl.NumberFormat('en-US').format(car.price)}</p>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <label>New Owner: <input type="text"/></label><br/>
        <label>Card Number: <input type="text" inputMode="numeric"/></label><br/>
        <label>Expiration (MM/YY): <input type="text"/></label><br/>
        <label>CVV: <input type="text" inputMode="numeric" maxLength="4"/></label><br/>
        <label>Delivery Address: <input type="text"/></label><br/>
        <button type="submit" className="complete-purchase-btn">Complete Purchase</button>
      </form>
      {showCongratsMessage && (
        <div className="congrats-message">
          🎉 Congratulations on your new wheels! 🎉
        </div>
      )}
      <button onClick={() => navigate('/')} className="back-to-list-btn">Back to Inventory</button>
    </div>
  );
};

export default ShoppingCart;
