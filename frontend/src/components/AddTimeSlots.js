import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const DoctorScheduler = () => {
  const { Username } = useParams();
  const [available, setAvailable] = useState('');
  const [slots, setSlots] = useState([]);
  const [update, setUpdate] = useState('');
    const [isLoading,setLoading]=useState(false);
  useEffect(() => {
    getTimeSlots();
  }, [update]);

  const addTimeSlot = async () => {
    // try {
        setLoading(true)
      await axios.put("http://localhost:8000/addSlots", { Username, available }).then((response)=>{
        console.log(response.data);
        setUpdate(response.data)
        setLoading(false)
      }).catch((err)=>{
        console.log(err)
        setLoading(false)

      })
    //   getTimeSlots();
    // } catch (error) {
    //   console.error('Error adding time slot:', error.response.data.error);
    // }
  };

  const getTimeSlots = async () => {
   
      await axios.get("http://localhost:8000/getTimeSlots/"+Username).then((response)=>{
        console.log(response.data);
        setSlots(response.data)

      }).catch((err)=>{
        console.log(err)
      })
      
  };

  return (
    <div>
      <h1>Doctor Scheduler</h1>

      <div>
        <label>
          Add Time Slot:
          <input type="datetime-local" value={available} onChange={(e) => setAvailable(e.target.value)} />
        </label>
        <button onClick={addTimeSlot}  disabled={isLoading}>Add Slot</button>
      </div>

      <div>
        <h2>Available Time Slots:</h2>
        <ul>
          {slots.map((slot, index) => (
            <li key={index}>{new Date(slot).toLocaleString()}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DoctorScheduler;
