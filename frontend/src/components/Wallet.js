import React, { useState, useEffect } from 'react';

function Wallet() {

    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
    const userId2 = params.get('docid2');

    const [walletCredit, setWalletCredit] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [paymentAmount, setPaymentAmount] = useState('');
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
            console.log("i am here")
            console.log(data)
            setWalletCredit(data.WalletCredit);
            setIsLoading(false);
        })
        .catch(error => {
            setError(error.message);
            setIsLoading(false);
        });
    };

    const handlePayment = () => {
        fetch('/payWithWallet', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount: Number(userId2),_id: userId })
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setWalletCredit(data.newWalletCredit);
            } else {
                setError(data.message);
            }
        })
        .catch(error => {
            setError(error.message);
        });
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;


    return (
        <>
        
        {/* Header */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
    <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/payment?docid=${userId}&docid2=${userId2}`}/>
    <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
    <h1>El7a2ni Clinic</h1>
    </div>
        
        <div>
            <h2>Wallet Credit: ${walletCredit}</h2>
            
            <button onClick={fetchWalletCredit}>Check Wallet Credit</button>
            <p>Session Price = {userId2}</p>
            <button style={{ backgroundColor: '#4584ff'}} onClick={handlePayment}>Pay</button>
            {isLoading && <div>Loading...</div>}
            {error && <div>Error: {error}</div>}
        </div>

        {/* Page Content */}
 <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
 {/* Add your main content here */}
</div>


{/* Footer */}
<div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>

</>
    );
}


export default Wallet;
