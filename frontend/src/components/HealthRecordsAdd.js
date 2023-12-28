import React, { useState } from 'react';

const FamilyMemberForm = () => {

  const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');

  const [formData, setFormData] = useState({
    HealthRecords: [],
    userid: '',
  });

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    // For file input, use the first file in the array
    const file = files && files.length > 0 ? files[0] : null;

    setFormData({
      ...formData,
      [name]: file ? file : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData();
      data.append('HealthRecords', formData.HealthRecords);
      window.alert(formData.HealthRecords)
      data.append('userid', userId);

      const response = await fetch('http://localhost:8000/addHealthRecords', {
        method: 'POST',
        body: data,
      });

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
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div>
        <label>Upload Document</label>
        <input type="file" name="HealthRecords" onChange={handleChange} required />
      </div>

      <br />
      
      <br />

      <button style={{ backgroundColor: '#4584ff'}} type="submit">Add Health Records</button>
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