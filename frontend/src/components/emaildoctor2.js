import React, { useState } from 'react';
import axios from 'axios';

const MailInbox = () => {
  
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('docid');

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [authors, setAuthors] = useState([]);

  const getAuthors = async () => {
    await axios.post('http://localhost:8000/getnotificationsdoctor',{docid:userId}).then(
      (res) => {
        const authors = res.data;
        console.log(authors);
        setAuthors(authors);
      }
    );
  };

  getAuthors();
  


  const messages = [
    
  ];

  const handlereject = async (event) => {
    event.preventDefault();
    
    const doctor = event.target.value;
    //window.alert("Reservation completed with "+ doctor)
    try {
      const response = await fetch('http://localhost:8000/createnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:doctor,doctorid:userId,subject:"Followup Reject",content:"The Followup request have been Rejected by: "}),
      });

      // Handle the response as needed
      console.log(response);
      window.alert("Cancellation Completed")
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const showMessage = (messageId) => {
    const message = authors.find((msg) => msg._id === messageId);
    setSelectedMessage(message);
  };

  return (
    
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '300px', backgroundColor: '#fff', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        {authors.map((message) => (
          <div
            key={message._id}
            style={{
              cursor: 'pointer',
              padding: '10px',
              borderBottom: '1px solid #ccc',
              transition: 'background-color 0.3s',
            }}
            onClick={() => showMessage(message._id)}
          >
            <strong>{message.sender}:</strong> {message.subject}
          </div>
        ))}
      </div>

      {selectedMessage && (
        <div style={{ flex: 1, padding: '20px' }}>
          <h2>{selectedMessage.subject}</h2>
          <p>From: {selectedMessage.sender}</p>
          <div>{selectedMessage.content}</div>
          {selectedMessage.subject === 'Chat Request' && (<a href="https://app.zoom.us/wc/join">Accept Invitation</a>)}
          
          {selectedMessage.subject === 'Followup Request' && (<><a href={`/followup?docid=${userId}&docid2=${selectedMessage.userid}`}>Accept</a><button value={selectedMessage.userid} onClick={handlereject}>Reject</button></>)}
 


        </div>
      )}
    </div>
  );
};

export default MailInbox;

