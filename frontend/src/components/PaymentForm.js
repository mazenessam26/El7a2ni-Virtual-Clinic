import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import StripeCheckout from 'react-stripe-checkout';

const PaymentForm = () => {

    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
    const userId2 = params.get('docid2');
    //window.alert(userId);
    //window.alert(userId2);

    const handleToken = async (token, addresses) => {
        const response = await fetch('http://localhost:8000/payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: token.id,
                amount: 1000
            })
        });
    
        const data = await response.json();
        if (data.success) {
            console.log('Payment successful', data);
        } else {
            console.error('Payment error', data.error);
        }
    };

    return (
        <>
        {/* Header */}
        <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
        <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/ListDoctors?docid=${userId}`}/>
        <img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <h1>El7a2ni Clinic</h1>
        </div>
        {/* Page Content */}
     <div style={{ backgroundImage: 'url("background.jpg")', backgroundSize: 'cover', height: '500px' }}>
     {/* Add your main content here */}
        <div>
            <StripeCheckout
                stripeKey="pk_test_51K8pKeAHoHtEwtN5PmpH89COOO1E8kd0TT27PiU2NovDU5RPHP20Q2EXUjzstNx6yhBMwir9egTX1tCwO3D3ebvD00QujcIxos"
                token={handleToken}
                amount={1000}
                name="Your Product Name"
            />
            <button type="submit" onClick={() => window.location.href = `/getWalletCredit?docid=${userId}&docid2=${userId2}`}>Wallet</button>
        </div>
        </div>
               {/* Footer */}
    <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',bottom:'1000px' }}>
        <img src="acllogo.png" alt="Footer Logo" style={{ marginRight: '10px' ,width:'200px'}} />
        <p style={{ marginRight: '10px',left:'-1000px'}}>© el7a2ni clinics and pharmacy 2023</p>
      </div>
      
      </>
        
    );
};

export default PaymentForm;