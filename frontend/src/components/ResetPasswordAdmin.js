import React, { useState } from 'react';

const UpdateDoctorForm = () => {
  const params = new URLSearchParams(window.location.search);
  const otpp = params.get('docid');

  const [formData, setFormData] = useState({
    
    Username: '',otpreal:otpp,otp:'',newPassword:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/resetpasswordadmin', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      //console.log(response);
      const responseData = await response.json();
      const {docid} = responseData;
      //window.alert(response.status);
      if(response.ok){
        window.alert("Password Changed Sucessfully")
        window.location.href = `/homepagePatient?docid=${docid}`
      }
      else{
        window.alert('Error submitting form', error);
      }
      
    } catch (error) {
      window.alert('Error submitting form', error);
    }
  };

  return (

    <>
    {/* Header */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <h1>El7a2ni Clinic</h1>
    </div>
    {/* Page Content */}
 <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
    
    <form onSubmit={handleSubmit}>
      <label>
        OTP:
        <input
          type="text"
          name="otp"
          required
          value={formData.otp}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
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
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
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
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
     
      
      
      <button type="submit" style={{ backgroundColor: '#4584ff'}}>Update Password</button>
    </form>

    </div>
    {/* Footer */}
<div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
      
        </>
  );
};

export default UpdateDoctorForm;