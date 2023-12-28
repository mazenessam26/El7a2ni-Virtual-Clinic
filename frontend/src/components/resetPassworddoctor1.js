import React, { useState } from "react";
//import { useHistory } from 'react-router-dom';

const ResetPasswordPatient = () => {
  //const history = useHistory();
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(formData);
      const response = await fetch(
        "http://localhost:8000/verify",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      // Handle the response as needed
      console.log(response);
      window.alert(response.statusText);
      if (response.status == 200) {
        window.location.href = "/";
      }
    } catch (error) {
      console.log("not here el mfrod");
      window.alert("Error submitting form:", error);
    }
  };

  const requestOTP = async (event) => {
    console.log("f1");
    event.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8000/requestOTP",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData.email }),
        }
      );
      //console.log({ email: formData.email });
      // Handle the response as needed
      window.alert("OTP Request Done Sucessfully!");
      if (response.ok) {
        const responseData = await response.json();
        const {docid} = responseData;
        /*history.push({
          pathname: '/resetpasswordadmin',
          state: { docid: docid },
        });*/
        window.location.href = `/resetpassword2?docid=${docid}`
      }
    } catch (error) {
      console.log("here");
      window.alert("Error submitting form:", error);
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
    <div>
      <br></br>
      <form onSubmit={requestOTP}>
        <label>
          Email:
          <input
            type="text"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            style={{
              borderRadius: '5px', // Adjust the border radius as needed
              borderColor: 'navy', // Navy border color
              padding: '8px', // Adjust padding as needed
            }}/>
        </label>
        <br />
        <br />
        <button type="submit" style={{ backgroundColor: '#4584ff'}}>Request OTP</button>
      </form>
      <br />
      
    </div>
    </div>
    {/* Footer */}
<div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
      
        </>
  );
};

export default ResetPasswordPatient;
