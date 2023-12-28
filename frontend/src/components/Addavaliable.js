import React, { useState } from 'react';

const UpdateDoctorForm = () => {
  const [formData, setFormData] = useState({
    
    Username: '',Avaliable:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/addSlots', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleSubmit1 = async (event) => {
    window.alert("slot added!")
  }

  return (
<>
    {/* Header */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <h1>El7a2ni Clinic</h1>
  </div>
    
    <form onSubmit={handleSubmit1}>
      
      
      <label>
        Avaliable:
        <input type="date"  name="Avaliable" value={formData.Avaliable} onChange={handleChange}/>
      </label>
      <br />
      
      
      <button type="submit">Add slot</button>
    </form>

    {/* Footer */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',bottom:'1000px' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
    </>
  );
};

export default UpdateDoctorForm;