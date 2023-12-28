import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewHealthPackage = () => {
  const [healthPackages, setHealthPackages] = useState([]);

  useEffect(() => {
    // Make an API request to fetch health packages
    axios.get('http://localhost:8000/viewHealthPackages')
      .then(response => {
        setHealthPackages(response.data);
      })
      .catch(error => {
        console.error('Error fetching health packages:', error);
      });
  }, []); // Empty dependency array ensures the effect runs once when the component mounts

  return (
    <div>
      <h2>Health Packages</h2>
      <ul>
        {healthPackages.map(pkg => (
          <li key={pkg._id}>
            <strong>{pkg.name}</strong>
            <p>Description: {pkg.description}</p>
            <p>Price: {pkg.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewHealthPackage;
