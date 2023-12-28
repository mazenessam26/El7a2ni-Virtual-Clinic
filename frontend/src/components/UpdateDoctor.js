import React, { useState } from 'react';

const UpdateDoctorForm = () => {
  const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
  
  const [formData, setFormData] = useState({
    
    userid: userId,newEmail:'',newHospital:'',newHourlyRate:0 
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/editDoctorInfo', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      window.alert("Date Updated Succesfully")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
        {/* Header */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/homepagedoctor?docid=${userId}`}/>
    <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <h1>El7a2ni Clinic</h1>
    </div>
         {/* Page Content */}
 <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
    <form onSubmit={handleSubmit}>
      
      <br />
      <label>
        New Email:
        <input
          type="email"
          name="newEmail"
          required
          value={formData.newEmail}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        New Hospital:
        <input
          type='text'
          name="newHospital"
          required
          value={formData.newHospital}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        New Hourly Rate:
        <input
          type="number"
          name="newHourlyRate"
          required
          value={formData.newHourlyRate}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      
      <button type="submit">Update info</button>
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