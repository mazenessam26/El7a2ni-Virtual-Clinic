
import React, { useState } from 'react';

const FamilyMemberForm = () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('docid');
  const [formData, setFormData] = useState({
    
    Name:'',NationalID:0,Age:0,Gender:'',Relation:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/addFamilyMember', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userId,formData}),
      });

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <>
    {/* Header */}
<div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
<img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/homepagepatient?docid=${userId}`}/>
<img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
<h1>El7a2ni Clinic</h1>
</div>
  {/* Page Content */}
  <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
    <form onSubmit={handleSubmit}>
      
      <label>
        Name:
        <input
          type="text"
          name="Name"
          required
          value={formData.Name}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        National ID:
        <input
          type='number'
          name="NationalID"
          required
          value={formData.NationalID}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Age:
        <input
          type="text"
          name="Age"
          required
          value={formData.Age}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Gender:
        <input
          type="text"
          name="Gender"
          required
          value={formData.Gender}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Relation:
        <input
          type="text"
          name="Relation"
          required
          value={formData.Relation}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      
      <button type="submit">Add Family Member</button>
      <a href={`http://localhost:3000/addFamilyMemberpatient?docid=${userId}`}>The family member have an account here</a>
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

export default FamilyMemberForm;