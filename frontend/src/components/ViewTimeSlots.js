import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

  

const DoctorTimeSlots = () => {
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [reservationType, setReservationType] = useState('self');
  const [familyMembers, setFamilyMembers] = useState([]);
  const [familyMember, setFamilyMember] = useState(null);

  const [selectedFamilyMember, setSelectedFamilyMember] = useState(null);
  const [patient,setPatient]=useState('');
  const [doctor,setDoctor]=useState('');
  const [isLoading,setLoading]=useState(false);

  useEffect(() => {
    getDoctor()
    getPatient()
    
  }, []);
const getDoctor =async()=>{
    await axios.get("http://localhost:8000/getDocto").then((response)=>{
       console.log(response.data,"hiii");
       setDoctor(response.data)
       getDoctorTimeSlots(response.data.Username)
      }).catch((err)=>{
        console.log(err)
      })
}
const getPatient =async()=>{
    await axios.get("http://localhost:8000/getPatients").then((response)=>{
        console.log(response.data[1]);
    setPatient(response.data[1])
    setFamilyMembers(response.data[1].FamilyMembers)

      }).catch((err)=>{
        console.log(err)
      })
}
  const getDoctorTimeSlots = async (Username) => {
    try {
      const response = await axios.get(`http://localhost:8000/getTimeSlots/${Username}`);
      setTimeSlots(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleReservationTypeChange = (type) => {
    setReservationType(type);
    setSelectedFamilyMember(null);
  };

  const handleFamilyMemberSelection = (familyMember) => {
    setSelectedFamilyMember(familyMember);
    familyMembers.map((familyMemberr, index) =>{
        if(familyMemberr?.Name===familyMember){
            setFamilyMember(familyMemberr)
        }
        
    })
  };

  const handleReservation = async () => {

    setLoading(true)
    console.log(familyMember)
    if(reservationType === 'family')
     {
        if(!selectedFamilyMember){
            await axios.post("http://localhost:8000/reserveTimeSlot", {Dusername:doctor.Username,Pusername:patient.Username,Did:doctor._id,Pid:patient._id,PFamilyMemberName:familyMembers[0]?.Name,PFamilyMemberID:familyMembers[0]?.ID,ADate:selectedSlot}).then((response)=>{
        console.log(response.data);
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setLoading(false)

      })
        }
        else{
            await axios.post("http://localhost:8000/reserveTimeSlot", {Dusername:doctor.Username,Pusername:patient.Username,Did:doctor._id,Pid:patient._id,PFamilyMemberName:familyMember.Name,PFamilyMemberID:familyMember.ID,ADate:selectedSlot}).then((response)=>{
        console.log(response.data);
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setLoading(false)

      })
        }
        console.log(selectedFamilyMember,familyMembers)
        }
      else{
        await axios.post("http://localhost:8000/reserveTimeSlot", {Dusername:doctor.Username,Pusername:patient.Username,Did:doctor._id,Pid:patient._id,ADate:selectedSlot}).then((response)=>{
        console.log(response.data);
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setLoading(false)

      })
      }

  };

  return (
    <div>
      <h1>Doctor Time Slots</h1>
      <h2>Doctor: {doctor?.Name}</h2>

      <div>
        <h3>Available Time Slots:</h3>
        <ul>
          {timeSlots.map((slot, index) => (
            <li
              key={index}
              onClick={() => handleSlotSelection(slot)}
              style={{ cursor: 'pointer', fontWeight: selectedSlot === slot ? 'bold' : 'normal' }}
            >
              {new Date(slot).toLocaleString()}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <label>
          Reserve for:
          <select value={reservationType} onChange={(e) => handleReservationTypeChange(e.target.value)}>
            <option value="self">Self</option>
            <option value="family">Family Member</option>
          </select>
        </label>

        {reservationType === 'family' && (
          <div>
            <label>
              Select Family Member:
              <select value={selectedFamilyMember} onChange={(e) => handleFamilyMemberSelection(e.target.value)}>
                <option value="" disabled>
                  Choose a family member
                </option>
                {familyMembers.map((familyMember, index) => (
                  <option key={index} value={familyMember.Name}>
                    {familyMember.Name}
                  </option>
                ))}
              </select>
            </label>
          </div>
        )}

        <button onClick={handleReservation} disabled={isLoading}>Reserve</button>
      </div>
    </div>
  );
};

export default DoctorTimeSlots;
