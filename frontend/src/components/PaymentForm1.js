import React, { useState } from 'react';
import axios from 'axios';

const PaymentForm = () => {
  const [username, setUsername] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [creditCardNumber, setCreditCardNumber] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Create a payload based on the selected payment method
      let paymentPayload;

      if (paymentMethod === 'cash') {
        paymentPayload = {
          Username: username,
          PaymentMethod: paymentMethod,
        };
      } else if (paymentMethod === 'credit') {
        paymentPayload = {
          Username: username,
          PaymentMethod: paymentMethod,
          CreditCard: {
            Number: creditCardNumber,
            ExpirationDate: expirationDate,
            CVV: cvv,
          },
        };
      }

      // Make an API call to the payForHealthPackage endpoint
      const response = await axios.post('http://localhost:8000/paymentform', paymentPayload);

      // Handle the response
      console.log(response.data);

      if (response.data.success) {
        setSuccessMessage('Successful!');
        setErrorMessage('');
      } else {
        setSuccessMessage('');
        setErrorMessage(response.data.message || 'Payment failed. Please check your input and try again.');
      }
    } catch (error) {
      // Handle errors, you may want to display an error message to the user
      console.error('Error:', error.message);
      setSuccessMessage('');
      setErrorMessage('An error occurred. Please check your input and try again.');
    }

    // Reset form fields
    setUsername('');
    setPaymentMethod('cash');
    setCreditCardNumber('');
    setExpirationDate('');
    setCvv('');
  };

  return (
    <div>
      <h1>Payment Form</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
        >
          <option value="cash">Cash</option>
          <option value="credit">Credit Card</option>
        </select>

        {paymentMethod === 'credit' && (
          <div>
            <label htmlFor="creditCardNumber">Credit Card Number:</label>
            <input
              type="text"
              id="creditCardNumber"
              name="creditCardNumber"
              value={creditCardNumber}
              onChange={(e) => setCreditCardNumber(e.target.value)}
              required
            />

            <label htmlFor="expirationDate">Expiration Date:</label>
            <input
              type="text"
              id="expirationDate"
              name="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
            />

            <label htmlFor="cvv">CVV:</label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={cvv}
              onChange={(e) => setCvv(e.target.value)}
              required
            />
          </div>
        )}

        <button type="submit">Submit Payment</button>

        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
        {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      </form>
    </div>
  );
};

export default PaymentForm;
