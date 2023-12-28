import React, { useState } from 'react';

const MailInbox = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);

  const messages = [
    { id: 1, sender: 'El7a2ni Team', subject: 'OTP 1', content: 'Your OTP: 2421234' },
    { id: 2, sender: 'Sender 2', subject: 'Subject 2', content: 'Message content 2' },
    { id: 3, sender: 'Sender 3', subject: 'Subject 3', content: 'Message content 3' },
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
          <a href="http://localhost:3000/resetpassword">Reset Password</a>
        </div>
      )}
    </div>
  );
};

export default MailInbox;