import React from "react";
import "./style.css";
const WelcomePage = () => {
return (
<div className="welcome-page">
<div className="div">
<div className="overlap">
<div className="nav-bar">
<div className="overlap-group">
<div className="rectangle" />
<img className="acllogo" alt="Acllogo" src="acllogo.png" />
</div>
</div>
<p className="text-wrapper">© el7a2ni clinics and pharmacy 2023</p>
</div>
<a href="/PatientForm" className="clinic-btn">
<div className="overlap-2">
<div className="rectangle-2" />
<div className="CLINIC">
EL7A2NI
<br />
CLINIC
</div>
</div>
</a>
<div className="pharma-btn">
<div className="overlap-3">
<div className="rectangle-2" />
<div className="PHARMACY">
EL7A2NI
<br />
PHARMACY
</div>
</div>
</div>
<div className="overlap-4">
<p className="p">WELCOME TO EL7A2NI, YOUR GATEWAY TO COMPLETE MEDICAL SERVICE!</p>
<div className="overlap-wrapper">
<div className="overlap-5">
<div className="rectangle-3" />
<img className="img" alt="Acllogo" src="acllogo.png" />
</div>
</div>
</div>
</div>
</div>
);
};

export default WelcomePage;