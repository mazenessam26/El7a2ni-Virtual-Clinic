import React, { useState } from 'react';

function WalletViewer() {

    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');

    const [walletCredit, setWalletCredit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');

    const fetchWalletCredit = () => {
        setIsLoading(true);
        fetch('/getWalletCredit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ _id: userId }),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setWalletCredit(data.WalletCredit);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    };

    return (
     <>
        {/* Header */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/homepagepatient?docid=${userId}`}/>
    <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <h1>El7a2ni Clinic</h1>
    </div>
         {/* Page Content */}
 <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
        <div>
            <h2>Wallet Credit Viewer</h2>
            
            <button style={{ backgroundColor: '#4584ff'}} onClick={fetchWalletCredit}>View Wallet Credit</button>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
            <div>Wallet Credit for {username}: ${walletCredit}</div>
        </div>
        </div>

        {/* Footer */}
<div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
        </>
    );
}

export default WalletViewer;