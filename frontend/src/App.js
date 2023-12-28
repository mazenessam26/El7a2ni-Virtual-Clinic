import './App.css';
//import './components/chat.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CreateAdmin from './components/FormAdminstrator';
import CreateDoctor from './components/FormDoctor';
import CreatePatient from './components/FormPatient';
import FamilyMemberadd from './components/FamilyMemberAdd';
import FamilyMemberpatient from './components/FamilyMemberpatient';
import UpdateDoctor from './components/UpdateDoctor';
import DeleteDoctor from './components/DeleteDoctor';
import DeleteAdmin from './components/DeleteAdminstrator';
import DeletePatient from './components/DeletePatient';
import Prescriptions from './components/Prescriptions';
import ListDoctor from './components/ListDoctors';
import InfoDoctor from './components/InfoDoctor';
import Homepage from './components/homepage';
import ListDoctorsAdmin from './components/ListDoctorsAdmin';
import AdminHomepage from './components/homepageAdmin';
import PatientHomepage from './components/homepagePatient';
import DoctorHomepage from './components/homepageDoctor';
import HealthRecordsAdd from './components/HealthRecordsAdd';
import Loginadmin from './components/LoginAdmin';
import Logindoctor from './components/LoginDoctor';
import Loginpatient from './components/LoginPatient';
import Updatepassadmin from './components/Updatepasswordadmin';
import Updatepassdoctor from './components/Updatepassworddoctor';
import Updatepasspatient from './components/Updatepasswordpatient';
import Email from './components/Email'
import Followup from './components/Followup'
import Emailadmin from './components/Emailadmin'
import ViewHealthPackage from './components/viewHealthPackage';
import SubscribeToHealthPkg from './components/SubscribeToHealthPkg'
import PaymentForm1 from './components/PaymentForm1'
import Emaildoctor from './components/Emaildoctor'
import Emaildoctor2 from './components/emaildoctor2'
import ResetPassword from './components/ResetPassword'
import ResetPasswordPatient from './components/resetPasswordPatient'
import ResetPasswordDoctor from './components/ResetPasswordDoctor'
import ResetPasswordAdmin from './components/ResetPasswordAdmin'
import PaymentForm from './components/PaymentForm'
import Wallet from './components/Wallet'
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import HealthRecordsremove from './components/HealthRecordsremove';
import Contract from './components/Contract';
import SelectTimeSlot from './components/Addavaliable';
import DoctorScheduler from './components/Viewappointments';
import DoctorScheduler2 from './components/viewappointments2';
import HealthRecords from './components/HealthRecords';
import WalletViewer from './components/WalletViewer';

import DoctorAppointments from './components/DoctorAppointments';
import DoctorPrescriptions from './components/DoctorPrescriptions';
import PatientPrescriptions from './components/PatientPrescriptions';

import RescheduleButton from './components/ResceduleButton';
import RescheduleButton2 from './components/ResceduleButton2';

import Resetpassword from './components/resetPassworddoctor1'
import Resetpassword2 from './components/ResetPasswordDoctor'
//import io from "socket.io-client";
//import Chat from "./components/Chat";
const stripePromise = loadStripe("pk_test_51K8pKeAHoHtEwtN5PmpH89COOO1E8kd0TT27PiU2NovDU5RPHP20Q2EXUjzstNx6yhBMwir9egTX1tCwO3D3ebvD00QujcIxos");

//const socket = io.connect("http://localhost:5001");


function App() {
  
  
  
  return (
    <div className="App">



      <BrowserRouter>
      <Routes>
        <Route path="/AdminForm"
        element={<CreateAdmin/>}/>
        
        <Route path="/DoctorForm"
        element={<CreateDoctor/>}/>
        <Route path="/PatientForm"
        element={<CreatePatient/>}/>
        <Route path="/addFamilyMember"
        element={<FamilyMemberadd/>}/>
        <Route path="/addFamilyMemberpatient"
        element={<FamilyMemberpatient/>}/>
        <Route path="/UpdateDoctor"
        element={<UpdateDoctor/>}/>
        <Route path="/DeleteDoctor"
        element={<DeleteDoctor/>}/>
        <Route path="/DeleteAdmin"
        element={<DeleteAdmin/>}/>
        <Route path="/DeletePatient"
        element={<DeletePatient/>}/>
        <Route path="/filter7"
        element={<Prescriptions/>}/>
        <Route path="/ListDoctors"
        element={<ListDoctor/>}/>
        <Route path="/filter9"
        element={<InfoDoctor/>}/>
        <Route path="/"
        element={<Homepage/>}/>
        <Route path="/ListDoctorsAdmin"
        element={<ListDoctorsAdmin/>}/>
        <Route path="/homepageAdmin"
        element={<AdminHomepage/>}/>
        <Route path="/homepagePatient"
        element={<PatientHomepage/>}/>
        <Route path="/homepagedoctor"
        element={<DoctorHomepage/>}/>
        <Route path="/addhealthrecords"
        element={<HealthRecordsAdd/>}/>
        <Route path="/removehealthrecords"
        element={<HealthRecordsremove/>}/>
        <Route path="/loginadmin"
        element={<Loginadmin/>}/>
        <Route path="/logindoctor"
        element={<Logindoctor/>}/>
        <Route path="/loginpatient"
        element={<Loginpatient/>}/>
        <Route path="/updatepasswordadmin"
        element={<Updatepassadmin/>}/>
         <Route path="/updatepassworddoctor"
        element={<Updatepassdoctor/>}/>
         <Route path="/updatepasswordpatient"
        element={<Updatepasspatient/>}/>
        <Route path="/email"
        element={<Email/>}/>
        <Route path="/followup"
        element={<Followup/>}/>
        <Route path="/emailadmin"
        element={<Emailadmin/>}/>
        <Route path="/emaildoctor"
        element={<Emaildoctor/>}/>
        <Route path="/emaildoctor2"
        element={<Emaildoctor2/>}/>
        <Route path="/resetpassword"
        element={<ResetPasswordPatient/>}/>
        <Route path="/resetpassworddoctor"
        element={<ResetPasswordDoctor/>}/>
        <Route path="/resetpassword1"
        element={<Resetpassword/>}/>
        <Route path="/resetpassword2"
        element={<Resetpassword2/>}/>
         <Route path="/viewhealthpackages"
        element={<ViewHealthPackage/>}/>
        <Route path="/subscribetohealthpackage"
        element={<SubscribeToHealthPkg/>}/>
        <Route path="/paymentform"
        element={<PaymentForm/>}/>
        <Route path="/resetpasswordadmin"
        element={<ResetPasswordAdmin/>}/>
        <Route path="/Contract"
        element={<Contract/>}/>
        <Route path="/viewappointments"
        element={<DoctorScheduler/>}/>
        <Route path="/viewappointments2"
        element={<DoctorScheduler2/>}/>
        <Route path="/addslot"
        element={<SelectTimeSlot/>}/>
        <Route path="/getWalletCredit"
        element={<Wallet/>}/>
        <Route path="/viewWallet"
        element={<WalletViewer/>}/>
        <Route path="/getHealthRecords"
        element={<HealthRecords/>}/>
        <Route path="/drapp"
        element={<DoctorAppointments/>}/>
        <Route path="/drpre"
        element={<DoctorPrescriptions/>}/>
        <Route path="/patientpre"
        element={<PatientPrescriptions/>}/>
        <Route path="/reschedule"
        element={<RescheduleButton/>}/>
        <Route path="/reschedule2"
        element={<RescheduleButton2/>}/>
        <Route path="/payment" element={
          <Elements stripe={stripePromise}>
              <PaymentForm/>
          </Elements>
          
          }/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
