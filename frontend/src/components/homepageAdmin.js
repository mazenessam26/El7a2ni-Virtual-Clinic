/*const AdminHomepage = () =>{
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
    return(
        <><button type="submit" onClick={() => window.location.href = `/DeleteDoctor`}>Delete Doctor</button><button type="submit" onClick={() => window.location.href = `/DeletePatient`}>Delete Patient</button><button type="submit" onClick={() => window.location.href = `/DeleteAdmin`}>Delete Admin</button><button type="submit" onClick={() => window.location.href = `/ListDoctorsAdmin`}>View Doctors</button><button type="submit" onClick={() => window.location.href = `/Email`}>Email</button><button type="submit" onClick={() => window.location.href = `/updatepasswordadmin?docid=${userId}`}>Change Password</button><a href="http://localhost:3000/">Logout</a></>
    )
}
export default AdminHomepage*/

import React from "react";
import "./style.css";

const PharmaAdmin = () => {
    const params = new URLSearchParams(window.location.search);
    const userId = params.get('docid');
    return (
        <div className="pharma-admin">
            <div className="div">
                <div className="bot-bar">
                    <div className="overlap-group">
                        <div className="rectangle" />
                        <img className="acllogo" alt="Acllogo" src="acllogo.png" />
                        <p className="text-wrapper">© el7a2ni clinics and pharmacy 2023</p>
                    </div>
                </div>
                <div className="overlap">
                    <div className="nav-bar">
                        <div className="overlap-2">
                            <div className="rectangle-2" />
                            <div className="logo">
                                <div className="overlap-group-2">
                                    <img className="img" alt="Acllogo" src="acllogo.png" />
                                    <div className="text-wrapper-2">Clinic - Admin</div>
                                    <div className="logo-btn" />
                                </div>
                            </div>
                            <div className="sign-up" onClick={() => window.location.href = `/`}>
                                <div className="overlap-3">
                                    <div className="rectangle-3" />
                                    <div className="sign-up-2">Log Out</div>
                                </div>
                            </div>
                            <div className="overlap-wrapper" onClick={() => window.location.href = `/updatepasswordadmin?docid=${userId}`}>
                                <div className="overlap-4">
                                    <div className="rectangle-4" />
                                    <div className="sign-up-3">Change Password</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="text-wrapper-3">Welcome, [Admin]!</div>
                </div>
                <div className="navigation">
                    <div className="overlap-5">
                        
                        <button className="overlap-group-wrapper" onClick={() => window.location.href = `/DeleteAdmin`}>
                            <div className="overlap-group-3">
                                <div className="rectangle-5" />
                                <div className="sign-up-4">Delete Admin</div>
                            </div>
                        </button>
                        <button className="div-wrapper" onClick={() => window.location.href = `/DeletePatient`}>
                            <div className="overlap-group-3">
                                <div className="rectangle-5" />
                                <div className="sign-up-4">Delete Patient</div>
                            </div>
                        </button>
                        <button className="button" onClick={() => window.location.href = `/DeleteDoctor`}>
                            <div className="overlap-group-3">
                                <div className="rectangle-5" />
                                <div className="sign-up-4">Delete Doctor</div>
                            </div>
                        </button>
                        <button className="btn-2" onClick={() => window.location.href = `/ListDoctorsAdmin`}>
                            <div className="overlap-group-3">
                                <div className="rectangle-5" />
                                <div className="sign-up-4">Doctors Join Requests</div>
                            </div>
                        </button>
                        <button className="btn-3" onClick={() => window.location.href = `/AdminForm`}>
                            <div className="overlap-group-3">
                                <div className="rectangle-5" />
                                <div className="sign-up-4">Add An Adminstrator</div>
                            </div>
                        </button>
                    </div>
                    <div className="text-wrapper-4">Admin Navigation Dashboard</div>
                </div>
            </div>
        </div>
    );
};

export default PharmaAdmin;
