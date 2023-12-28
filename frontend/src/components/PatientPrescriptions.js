import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'


const PrescriptionItem = ({ prescription }) => (
    <div>
      <p>Doctor Name : {prescription.DName}</p>
      <p>Appointment Date : {prescription.AppointmentDate}</p>
      <p>Prescription: {prescription.Prescription}</p>
      <p>Status: {prescription.Status}</p>
    </div>
  );

const PatientPrescriptions = () => {

    const params = new URLSearchParams(window.location.search);
  const userId = params.get('docid');

    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loader,setLoader] = useState(false);

    

    useEffect(() => {
        const fetchPatientPrescriptions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/viewPatPres/${userId}`);
                setPrescriptions(response.data);
            } catch (error) {
                console.error('Error fetching patient prescriptions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPatientPrescriptions();
    }, []);

   const handledownload = () =>{
    const capture = document.querySelector('.selectedprescription')
    html2canvas(capture).then((canvas)=>{
        const imgData = canvas.toDataURL('img/png');
        const doc = new jsPDF('p','mm','a4')
        const componentWidth = doc.internal.pageSize.getWidth();
        const componentHeight = doc.internal.pageSize.getHeight();
        doc.addImage(imgData,'PNG',0,0,componentWidth,componentHeight);
        doc.save('prescription.pdf')
    })
   }

    return (
        <>
        {/* Header */}
        <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
        <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/homepagepatient?docid=${userId}`}/>
        <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <h1>El7a2ni Clinic</h1>
        </div>
        
        <div className="downloadpdf">
            <h2>Patient Prescriptions</h2>
            {loading ? (
                <p>Loading prescriptions...</p>
            ) : (
                <ul>
                    {prescriptions.map((prescription) => (
                        <li className='selectedprescription' key={prescription._id}>
                            <p>Doctor Name : {prescription.DName}</p>
                            <p>Appointment Date : {prescription.AppointmentDate}</p>
                            <p>Prescription: {prescription.Prescription}</p>
                            <p>Status: {prescription.Status}</p>
                            <button style={{ backgroundColor: '#4584ff'}} onClick={handledownload}>Download</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
         {/* Footer */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',bottom:'1000px' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
        </>
    );
};

export default PatientPrescriptions;
