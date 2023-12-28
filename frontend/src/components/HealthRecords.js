import React, { useState } from 'react';

const HealthRecords = () => {
    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');

    const fetchHealthRecords = () => {
        setLoading(true);
        fetch('/getHealthRecords', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: username }),
        })
        .then(response => response.json())
        .then(data => {
            const flatRecords = data.flat();
            setRecords(flatRecords);
            setLoading(false);
        })
        .catch(error => {
            console.error('Error fetching health records:', error);
            setLoading(false);
        });
    };

    return (
        <div>
            <h2>Health Records</h2>
            <input 
                type="text" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="Enter username" 
            />
            <button onClick={fetchHealthRecords}>Fetch Records</button>
            {loading && <div>Loading...</div>}
            <ul>
                {records.map((record, index) => (
                    <li key={index}>
                        {record.dtype.startsWith('image/') && (
                            <img src={`data:${record.dtype};base64,${record.data}`} alt={`Health Record ${index + 1}`} />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HealthRecords;
