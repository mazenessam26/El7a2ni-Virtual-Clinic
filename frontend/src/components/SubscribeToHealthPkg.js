import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SubscribeHealthPackage = () => {
  const [healthPackages, setHealthPackages] = useState([]);
  const [formData, setFormData] = useState({
    Username: '',
    HealthPackage: '',
    FamilyMembers: [{ Name: '' }], // Initialize with one family member
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Fetch health packages when the component mounts
    const fetchHealthPackages = async () => {
      try {
        const response = await axios.get('http://localhost:8000/viewHealthPackages');
        setHealthPackages(response.data);
      } catch (error) {
        console.error('Error fetching health packages:', error);
      }
    };

    fetchHealthPackages();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFamilyMemberInputChange = (index, e) => {
    const newFamilyMembers = [...formData.FamilyMembers];
    newFamilyMembers[index].Name = e.target.value;

    setFormData({
      ...formData,
      FamilyMembers: newFamilyMembers,
    });
  };

  const addFamilyMember = () => {
    setFormData({
      ...formData,
      FamilyMembers: [...formData.FamilyMembers, { Name: '' }],
    });
  };

  const removeFamilyMember = (index) => {
    const newFamilyMembers = [...formData.FamilyMembers];
    newFamilyMembers.splice(index, 1);

    setFormData({
      ...formData,
      FamilyMembers: newFamilyMembers,
    });
  };

  const handleSubscribe = async () => {
    // Filter out empty family member names
    const nonEmptyFamilyMembers = formData.FamilyMembers.filter(
      (familyMember) => familyMember.Name.trim() !== ''
    );

    try {
      const response = await axios.post(
        'http://localhost:8000/addhealthpackage',
        {
          ...formData,
          FamilyMembers: nonEmptyFamilyMembers,
        }
      );
      console.log('Subscription successful:', response.data);

      setSuccessMessage(
        'Subscription successful! Redirecting to the payment page...'
      );
      setErrorMessage('');

      // After a successful subscription, you can redirect the user to the payment page
      // You may replace '/payment' with the actual route for your payment page
      setTimeout(() => {
        window.location.href = '/paymentform1';
      }, 3000); // Redirect after 3 seconds (adjust as needed)
    } catch (error) {
      console.error(
        'Subscription error:',
        error.response ? error.response.data : error.message
      );

      setSuccessMessage('');
      setErrorMessage(
        'Subscription failed. Please check your input and try again.'
      );
    }
  };

  return (
    <div>
      <h2>Subscribe to Health Package</h2>
      <form>
        <label>
          Username:
          <input type="text" name="Username" value={formData.Username} onChange={handleInputChange} />
        </label>
        <br />
        <label>
          Health Package:
          <select name="HealthPackage" value={formData.HealthPackage} onChange={handleInputChange}>
            <option value="">Platinum</option>
            {healthPackages.map((pkg, index) => (
              <option key={index} value={pkg.name}>
                {pkg.name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <div>
          <h4>Family Members</h4>
          {formData.FamilyMembers.map((familyMember, index) => (
            <div key={index}>
              <label>
                Member {index + 1} Name:
                <input
                  type="text"
                  name="Name"
                  value={familyMember.Name || ''}
                  onChange={(e) => handleFamilyMemberInputChange(index, e)}
                />
              </label>
              {formData.FamilyMembers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFamilyMember(index)}
                >
                  Remove Member
                </button>
              )}
              <br />
            </div>
          ))}
          <button type="button" onClick={addFamilyMember}>
            Add Family Member
          </button>
        </div>
        <br />
        <button type="button" onClick={handleSubscribe}>
          Subscribe
        </button>

        {successMessage && (
          <p style={{ color: 'green' }}>{successMessage}</p>
        )}
        {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
      </form>
    </div>
  );
};

export default SubscribeHealthPackage;
