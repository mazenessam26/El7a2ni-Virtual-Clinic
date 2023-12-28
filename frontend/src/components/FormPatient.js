// import React, { useState } from 'react';
// //import formdoc from "https://www.figma.com/file/n3uz77S7FsMwHllakr9CKW/Untitled?type=design&node-id=1-103&mode=design&t=PopAebdzOuLrwMYj-0";

// const PatientForm = () => {
//   const [formData, setFormData] = useState({
//     Username: '',
//     Password: '',
//     Name: '',Email: '',DateOfBirth: '',Gender:'',MobileNumber:0,EmergencyContactFullName:'',EmergencyContactNumber:0
//   });

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     try {
//       const response = await fetch('http://localhost:8000/addUser', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(formData),
//       });

//       // Handle the response as needed
//       console.log(response);
//     } catch (error) {
//       console.error('Error submitting form:', error);
//     }
//   };

//   return (
    
//     <form onSubmit={handleSubmit}>
//       <label>
//         Username:
//         <input
//           type="text"
//           name="Username"
//           required
//           value={formData.Username}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Name:
//         <input
//           type="text"
//           name="Name"
//           required
//           value={formData.Name}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Email:
//         <input
//           type='email'
//           name="Email"
//           required
//           value={formData.Email}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Date Of Birth:
//         <input
//           type="date"
//           name="DateOfBirth"
//           required
//           value={formData.DateOfBirth}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Password:
//         <input
//           type="password"
//           name="Password"
//           required
//           value={formData.Password}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Gender:
//         <input
//           type="text"
//           name="Gender"
//           required
//           value={formData.Gender}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Mobile Number:
//         <input
//           type="number"
//           name="MobileNumber"
//           required
//           value={formData.MobileNumber}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//         Emergency Contact Full Name:
//         <input
//           type="text"
//           name="EmergencyContactFullName"
//           required
//           value={formData.EmergencyContactFullName}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <label>
//       Emergency Contact Number:
//         <input
//           type="number"
//           name="EmergencyContactNumber"
//           required
//           value={formData.EmergencyContactNumber}
//           onChange={handleChange}
//         />
//       </label>
//       <br />
//       <button type="submit"  onClick={() => window.location.href=`/homepagePatient`}>Register</button>
//       <a href="http://localhost:3000/loginpatient">Already have an Account</a>
//     </form>
//   );
// };

// export default PatientForm;

import React, { useState } from "react";
import "./style.css";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Name: '',Email: '',DateOfBirth: '',Gender:'',MobileNumber:0,EmergencyContactFullName:'',EmergencyContactNumber:0
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/addUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const responseData = await response.json();
      const {docid} = responseData;
      // Handle the response as needed
      console.log(response);
      if(response.ok){
        window.alert("Sign Up Successful!");
        window.location.href = `/homepagePatient?docid=${docid}`
      }
      else{
        window.alert("No User With this Username and Password found")
      }
      //window.location=`/homepagePatient?docid=${docid}`;
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

    return (
        <div className="pharma-signup-page">
            <div className="div">
                <div className="bot-bar">
                    <div className="overlap-group">
                        <div className="rectangle" />
                        <img className="acllogo" alt="Acllogo" src="acllogo.png" />
                        <p className="text-wrapper">© el7a2ni clinics and pharmacy 2023</p>
                    </div>
                </div>
                <div className="overlap">
                    <div className="nav-bar">
                        <div className="overlap-2">
                            <div className="rectangle-2" />
                            <div className="logo">
                                <div className="overlap-group-2">
                                    <img className="img" alt="Acllogo" src="acllogo.png" />
                                    <div className="text-wrapper-2">clinic</div>
                                    <div className="logo-btn" />
                                </div>
                            </div>
                            <div className="sign-up">
                                <div className="overlap-3">
                                    <div className="rectangle-3" />
                                    <button className="p" onClick={()=> window.location.href =`/DoctorForm`}>Sign Up As A Doctor</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="login" onSubmit={handleSubmit}>
                        <div className="overlap-4">
                            
                            
                            <div className="emergency-contact">
                                <img className="line" alt="Line" src="Line1.svg" />
                                <div className="overlap-5">
                                    <img className="line-2" alt="Line" src="Line1.svg" />
                                    <div className="text-wrapper-4">Emergency Contact</div>
                                </div>
                            </div>
                            
                            <div className="form-bounds">
                            <form >
                                <div className="overlap-group-wrapper">
                                    <div className="overlap-group-3">
                                        <div className="rectangle-4" onClick={() => window.location.href=`/homepagePatient?docid=${docid}`}/>
                                        <button className="text-wrapper-5" type="submit" onSubmit={handleSubmit} onClick={() => window.location.href=`/homepagePatient?docid=${docid}`}>Sign Up</button>
                                    </div>
                                </div>
                                
                        
                                <img className="line-3" alt="Line" src="Line1.svg" />
                                <div className="overlap-6">
                                    <img className="line-4" alt="Line" src="Line1.svg" />
                                    <div className="text-wrapper-6">Sign Up</div>
                                </div>
                                </form>
                            </div>
                            
                            <div className="mobile-no">
                            <p>Number</p>
                               <div className="div-wrapper">
                                <input type="number" name="EmergencyContactNumber" required value={formData.EmergencyContactNumber} onChange={handleChange}/>
                               </div>
                            </div>
                            <div className="name">
                            <p>Full Name</p>
                                <div className="div-wrapper">
                                <input type="text" name="EmergencyContactFullName" required value={formData.EmergencyContactFullName} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="overlap-wrapper">
                            <p>Mobile Number</p>
                                <div className="div-wrapper">
                                <input type="number" name="MobileNumber" required value={formData.MobileNumber} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="gender">
                            <p>Gender</p>
                                <div className="div-wrapper">
                                <input type="text" name="Gender" required value={formData.Gender} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="dob">
                            <p>Date Of Birth</p>
                                <div className="div-wrapper">
                                <input type="date" name="DateOfBirth" required value={formData.DateOfBirth} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="password">
                            <p>Password</p>
                                <div className="div-wrapper">
                                <input type="password" name="Password" required value={formData.Password} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="email">
                            <p>Email</p>
                                <div className="div-wrapper">
                                <input type="email" name="Email" required value={formData.Email} onChange={handleChange}/>
                                </div>
                            </div>
                            <div className="name-2">
                              <p>Name</p>
                                <div className="div-wrapper">
                                <input type="text" name="Name"  required value={formData.Name} onChange={handleChange}/>
                                    
                                </div>
                            </div>
                            
                            <div className="username" >
                              <p>Username</p>
                                <div className="div-wrapper">
                                <input type="text" name="Username" required value={formData.Username} onChange={handleChange}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <a href="http://localhost:3000/loginpatient">Already have an Account</a>
        </div>
        
    );
};

export default PatientForm;
