import React, { useState } from 'react';

const FamilyMemberForm = () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('docid');
  const [formData, setFormData] = useState({
    
    userid: userId,Email:'',Relation:''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/addfamilymemberpatient', {
        method: 'POST',
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

  return (
    <>
    {/* Header */}
<div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
<img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/addFamilyMember?docid=${userId}`}/>
<img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
<h1>El7a2ni Clinic</h1>
</div>
  {/* Page Content */}
  <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
    <form onSubmit={handleSubmit}>
      
      <br />
      <label>
        type the patient email here:
        <input
          type="email"
          name="Email"
          required
          value={formData.Email}
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