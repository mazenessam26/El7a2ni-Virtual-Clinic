const DoctorHomepage = () =>{
    
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
    
    return(
        <>
         {/* Header */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <h1>El7a2ni Clinic</h1>
    </div>
    <div className='homepage' style={{ display: 'flex', justifyContent: 'space-around', padding: '10px' }}>
        {/* Add your buttons here */}
        <><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/emaildoctor2?docid=${userId}`}>Notifications</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/viewappointments2?docid=${userId}`}>View Appointments</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/drapp?docid=${userId}`}>Add Prescriptions</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/drpre?docid=${userId}`}>View Prescriptions</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/UpdateDoctor?docid=${userId}`}>Update info</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/updatepassworddoctor?docid=${userId}`}>Change Password</button><button type="submit" style={{ backgroundColor: '#4584ff'}} onClick={() => window.location.href = `/addslot?docid=${userId}`}>Add Slot</button> <a href="http://localhost:3000/">Logout</a></>
   </div>
 {/* Page Content */}
 <div style={{ backgroundImage: 'url("homepagedoc.jpg")', backgroundSize: 'cover', height: '500px' }}>
        {/* Add your main content here */}
      </div>


    {/* Footer */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
    </>
    )
}
export default DoctorHomepage