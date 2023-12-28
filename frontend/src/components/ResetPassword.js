import React, { useState } from 'react';

const UpdateDoctorForm = () => {
  const [formData, setFormData] = useState({
    
    Username: '',otp:0,newPassword:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/resetpassword', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      console.log(response);
      window.alert(response.statusText);
      if(response.status==200){
        window.location.href = '/homepagePatient'
      }
      
    } catch (error) {
      window.alert('Error submitting form:', error);
    }
  };

  return (
    
    <form onSubmit={handleSubmit}>
      <label>
        OTP:
        <input
          type="number"
          name="otp"
          required
          value={formData.otp}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Username:
        <input
          type="text"
          name="Username"
          required
          value={formData.Username}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        New Password:
        <input
          type="password"
          name="newPassword"
          required
          value={formData.newPassword}
          onChange={handleChange}
        />
      </label>
      <br />
     
      
      
      <button type="submit">Update Password</button>
    </form>
  );
};

export default UpdateDoctorForm;