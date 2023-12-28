// const PatientHomepage = () =>{

//     const params = new URLSearchParams(window.location.search);
//     const userId = params.get('docid');
//     //window.alert(userId);

//     return(
//         <><button type="submit" onClick={() => window.location.href = `/emaildoctor?docid=${userId}`}>Notifications</button><button type="submit" onClick={() => window.location.href = `/ListDoctors?docid=${userId}`}>view all Doctors</button><button type="submit" onClick={() => window.location.href = `/viewappointments?docid=${userId}`}>View Appointments</button><button type="submit" onClick={() => window.location.href = `/addhealthrecords`}>Add Health Records</button><button type="submit" onClick={() => window.location.href = `/removehealthrecords`}>view Health Records</button><button type="submit" onClick={() => window.location.href = `/addFamilyMember`}>Add Family Member</button><button type="submit" onClick={() => window.location.href = `/updatepasswordpatient`}>Change Password</button><button type="submit" onClick={() => window.location.href = `/PatientForm`}>Patient</button><button type="submit" onClick={() => window.location.href = `/payment`}>Payment</button> <button type="submit" onClick={() => window.location.href = `/getHealthRecords`}>Get Health Records</button> <button type="submit" onClick={() => window.location.href = `/subscribetohealthpackage`}>health Packages</button><button type="submit" onClick={() => window.location.href = `/viewWallet`}>View Wallet</button><a href="http://localhost:3000/">Logout</a></>
//     )
// }
// export default PatientHomepage


import React from 'react';

const PatientHomepage = () => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('docid');

  return (
    <>
      {/* Header */}
      <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
        <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <h1>El7a2ni Clinic</h1>
      </div>

      {/* Navigation Bar */}
      <div className='homepage' style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
        {/* Add your buttons here */}
        <><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/emaildoctor?docid=${userId}`}>Notifications</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/ListDoctors?docid=${userId}`}>view all Doctors</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/viewappointments?docid=${userId}`}>View Appointments</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/patientpre?docid=${userId}`}>View Prescriptions</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/addhealthrecords?docid=${userId}`}>Add Health Records</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/removehealthrecords?docid=${userId}`}>view Health Records</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/addFamilyMember?docid=${userId}`}>Add Family Member</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/updatepasswordpatient?docid=${userId}`}>Change Password</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/viewWallet?docid=${userId}`}>View Wallet</button><a href="http://localhost:3000/">Logout</a></>
        {/* Add other buttons similarly */}
      </div>

      {/* Page Content */}
      <div style={{ backgroundImage: 'url("homepage2.jpg")', backgroundSize: 'cover', height: '500px' }}>
        {/* Add your main content here */}
      </div>

      {/* Footer */}
      <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
    </>
  );
};

export default PatientHomepage;