import React, { useState, useEffect } from 'react';
import axios from 'axios';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
//import Prescriptions from '../../../src/Models/Prescriptions';

const DoctorPrescriptions = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pres, setPres] = useState(false);
    const [preid, setpreid] = useState();
    const[FormData,setFormData] = useState({Did:userId,Prescription:'',newPrescription:''});

    useEffect(() => {
        const fetchDoctorPrescriptions = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/viewDrPres/${userId}`);
                setPrescriptions(response.data);
            } catch (error) {
                console.error('Error fetching doctor prescriptions:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctorPrescriptions();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((FormData) => ({ ...FormData, [name]: value }));
    };
    const handlePrescriptionSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('http://localhost:8000/editdrpres', FormData);
            window.alert('Prescription added:', response.data.Prescription);
            // Handle success, reset the form, or navigate to another page if needed
   
                
                setPres(false)
         
        } catch (error) {
            console.error('Error adding prescription:', error);
            // Handle error, show an error message to the user, etc.
        }
    };
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
        <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/homepagedoctor?docid=${userId}`}/>
        
        <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <h1>El7a2ni Clinic</h1>
        </div>
         {/* Page Content */}
  
        <div>
            <h2>Doctor Prescriptions</h2>
            {loading ? (
                <p>Loading prescriptions...</p>
            ) : (
                <ul>
                    {prescriptions.map((prescription) => (
                        <li className='selectedprescription' key={prescription._id}>
                            <p>Patient Name : {prescription.PName}</p>
                            <p>Appointment Date : {prescription.AppointmentDate}</p>
                            <p>Prescription: {prescription.Prescription}</p>
                            <p>Status: {prescription.Status}</p>
                            <button style={{ backgroundColor: '#4584ff'}} onClick={handledownload}>Download</button>
                            <button style={{ backgroundColor: '#4584ff'}} type="submit" name="Prescription" value={prescription.Prescription} onClick={()=>{
            
            setFormData({ ...FormData, Prescription: prescription.Prescription });;setPres(true);;setpreid(prescription._id)
        }}>Edit Prescription</button>
        {pres && preid === prescription._id &&
        <form onSubmit={handlePrescriptionSubmit}>
        <label htmlFor="Prescription">Prescription:</label>
            <textarea
                
                name="newPrescription"
                rows="4"
                cols="50"
                value={FormData.newPrescription}
                onChange={handleInputChange}
                
            />

            <button style={{ backgroundColor: '#4584ff'}} type="submit">Update Prescription</button>
        </form>

        }
                        </li>
                    ))}
                </ul>
                
            )
            }
               
        </div>
        
         {/* Footer */}
    <footer style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',bottom:'1000px' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </footer>
        </>
    );
};

export default DoctorPrescriptions;
