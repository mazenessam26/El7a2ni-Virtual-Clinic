import React, { useState } from 'react';

const FancyDateInput = () => {

  const params = new URLSearchParams(window.location.search);
    const userId2 = params.get('docid');
    const userId = params.get('docid2');

  const [selectedDate, setSelectedDate] = useState('');

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleReschedule = async (event) => {
    event.preventDefault();
    
    const doctor = event.target.value;
    //window.alert(doctor);
    //window.alert("Reservation completed with "+ doctor)
    try {
      const response = await fetch('http://localhost:8000/createnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userId,doctorid:userId2,subject:"Appointment Rescedule",content:"Your Appointment have been Resceduled to Date: "+doctor+" By: "}),
      });

      // Handle the response as needed
      console.log(response);
      //window.location.href=`/payment?docid=${userId}&docid2=${doctor}`
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }

    try {
      const response2 = await fetch('http://localhost:8000/reschedule', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userId,docid:userId2,DateOfBirth:doctor}),
      });

      // Handle the response as needed
      console.log(response2);
      //window.location.href=`/payment?docid=${userId}&docid2=${doctor}`
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
      window.alert("Reschedule Completed!")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleres2 = async (event) => {
    event.preventDefault();
    
    const doctor = event.target.value;
    window.alert(doctor);
    //window.alert("Reservation completed with "+ doctor)
    

    try {
      const response = await fetch('http://localhost:8000/reschedule', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userId,docid:userId2,DateOfBirth:doctor}),
      });

      // Handle the response as needed
      console.log(response);
      //window.location.href=`/payment?docid=${userId}&docid2=${doctor}`
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const availableDates = [
    '2023-12-01',
    '2023-12-15',
    '2023-12-31',
    // Add more available dates as needed
  ];

  return (
    <>
    {/* Header */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/viewappointments2?docid=${userId}`}/>
    <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <h1>El7a2ni Clinic</h1>
    </div>
    {/* Page Content */}
 <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
    <div style={{
      width: '300px',
      height: '300px',
      borderRadius: '15px',
      border: '2px solid #4584ff',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <label style={{ marginBottom: '10px', fontSize: '18px' }}>
        Select an Avaliable Slot:
      </label>
      <select
        value={selectedDate}
        onChange={handleDateChange}
        style={{
          width: '80%',
          padding: '10px',
          borderRadius: '10px',
          border: '1px solid #4584ff',
          fontSize: '16px',
          outline: 'none', // Remove default input focus outline
        }}
      >
        <option value="">Select a date</option>
        {availableDates.map((date, index) => (
          <option key={index} value={date}>{date}</option>
        ))}
      </select>
      <p>Selected Date: {selectedDate}</p>
      <button style={{ backgroundColor: '#4584ff'}} value={selectedDate} onClick={handleReschedule}>Rescedule</button>
    </div>
    </div>
    {/* Footer */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',bottom:'1000px' }}>
    <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
  </div>
  
  </>
  );
};

export default FancyDateInput;