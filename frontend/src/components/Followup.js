import React, { useState } from 'react';
//import { useHistory } from 'react-router';
//import { ImgHTMLAttributes } from 'react';
import './theme.css';
const AdminstratorForm = () => {

  const params = new URLSearchParams(window.location.search);
  const userIdreal = params.get('docid2');
  const userId = params.get('docid');
   // const history = useHistory();
 
    const [formData, setFormData] = useState({
   
    DateOfBirth: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const date = new Date(formData.DateOfBirth)
      window.alert(date)
      const response = await fetch('http://localhost:8000/reschedule', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userIdreal,docid:userId,DateOfBirth:date}),
      });

      // Handle the response as needed
      console.log(response);
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    
    <><form  onSubmit={handleSubmit}>
          
          <label>
              Followup:
              <input
                  type="date"
                  name="DateOfBirth"
                  required
                  value={formData.DateOfBirth}
                  onChange={handleChange} />
          </label>
          <br />

          <button type="submit" onClick={() => window.alert("FollowUp added successufly")}>Submit</button>
         
      </form><img src="./acllogo.png"alt="logo" width="150px" height="80px"></img></>
  );
};

export default AdminstratorForm;