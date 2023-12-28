import React, { useState } from 'react';
import './style.css'

const DoctorForm = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Name: '',Email: '',DateOfBirth: '',Hospital:'',HourlyRate:0,EducationalBackground:'',Speciality:'',ID:'',MedicalLicense:null,MedicalDegree:null
  });

  const handleChange = (event) => {
    const { name, value, type, files } = event.target;

    // Check if the input is a file input
    const inputValue = type === 'file' ? files[0] : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: inputValue,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    try {
      const response = await fetch('http://localhost:8000/createDoctor', {
        method: 'POST',
        body: data
      });

      // Handle the response as needed
      console.log(response);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  

  return (
    <>

    <div className="bot-bar2">
    <div className="overlap-group">
        <div className="rectangle2" />
        <img className="acllogo2" alt="Acllogo" src="acllogo.png" />
        <p className="text-wrapper2">© el7a2ni clinics and pharmacy 2023</p>
    </div>
    </div>

    <div className="nav-bar2">
        <div className="overlap-2">
            <div className="rectangle-22" />
            <div className="logo">
                <div className="overlap-group-2">
                    <img className="img2" alt="Acllogo" src="acllogo.png" />
                    <div className="text-wrapper-22">clinic</div>
                    <div className="logo-btn" />
                </div>
            </div>
  </div>
</div>
    
    
<div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
    <form onSubmit={handleSubmit}  encType='multipart/form-data'>
      <div className="formdoc">
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
        Email:
        <input
          type='email'
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
        Date Of Birth:
        <input
          type="date"
          name="DateOfBirth"
          required
          value={formData.DateOfBirth}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          name="Password"
          required
          value={formData.Password}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Hospital:
        <input
          type="text"
          name="Hospital"
          required
          value={formData.Hospital}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Hourly Rate:
        <input
          type="number"
          name="HourlyRate"
          required
          value={formData.HourlyRate}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Educational Background:
        <input
          type="text"
          name="EducationalBackground"
          required
          value={formData.EducationalBackground}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Speciality:
        <input
          type="text"
          name="Speciality"
          required
          value={formData.Speciality}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        ID:
        <input
          type="text"
          name="ID"
          required
          value={formData.ID}
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Medical License:
        <input
          type="file"
          name="MedicalLicense"
          required
          
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <label>
        Medical Degree:
        <input
          type="file"
          name="MedicalDegree"
          required
          
          onChange={handleChange}
          style={{
            borderRadius: '5px', // Adjust the border radius as needed
            borderColor: 'navy', // Navy border color
            padding: '8px', // Adjust padding as needed
          }}/>
      </label>
      <br />
      <button type="submit"  style={{ backgroundColor: '#4584ff'}} onClick={() => window.alert("Submission Completed,Wating For Approval From The Adminstrator")}>Register</button>
      <a href="http://localhost:3000/logindoctor">Already have an Account</a>
      </div>
    </form>
    </div>
    
    </>
  );
};

export default DoctorForm;