import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';

const ShoppingCart = ({ car }) => {
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(false);
  const [showCongratsMessage, setShowCongratsMessage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowConfetti(true);
    setShowCongratsMessage(true); // Display congrats message on form submission

    // Hide the message and confetti after a delay
    setTimeout(() => {
      navigate('/'); // redirect to index after some time
    }, 5000); // Time in milliseconds
  };

  return (
    <div className="shopping-cart-container">
      {showConfetti && <Confetti />}
      <form onSubmit={handleSubmit}>
        {/* Form fields to add later*/}
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
