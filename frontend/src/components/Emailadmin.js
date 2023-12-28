import React, { useState } from 'react';

const MailInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    { id: 1, sender: 'El7a2ni Team', subject: 'Live Meeting', content: 'Dr dr requested to make a live meeting with you'+'\n' +'invitation id: 8011145782'+' pass: weYr3F' },
    
  ];

  const showMessage = (messageId) => {
    const message = messages.find((msg) => msg.id === messageId);
    setSelectedMessage(message);
  };

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '300px', backgroundColor: '#fff', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        {messages.map((message) => (
          <div
            key={message.id}
            style={{
              cursor: 'pointer',
              padding: '10px',
              borderBottom: '1px solid #ccc',
              transition: 'background-color 0.3s',
            }}
            onClick={() => showMessage(message.id)}
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
          <a href="https://app.zoom.us/wc/join">Accept invitation</a>
        </div>
      )}
    </div>
  );
};

export default MailInbox;