import React, { useState } from 'react';

const PrescriptionList = () => {
  const [prescriptions, setPrescriptions] = useState([
    { id: 1, date: '2023-11-10', doctor: 'Dr. Smith', filled: true },
    { id: 2, date: '2023-11-12', doctor: 'Dr. Johnson', filled: false },
    { id: 3, date: '2023-11-15', doctor: 'Dr. Brown', filled: true },
    // Add more prescriptions as needed
  ]);

  const viewAllPrescriptions = () => {
    console.log('All Prescriptions:', prescriptions);
  };

  const filterPrescriptionsByDate = (date) => {
    const filteredPrescriptions = prescriptions.filter(prescription => prescription.date === date);
    console.log(`Prescriptions on ${date}:`, filteredPrescriptions);
  };

  const filterPrescriptionsByDoctor = (doctor) => {
    const filteredPrescriptions = prescriptions.filter(prescription => prescription.doctor.toLowerCase().includes(doctor.toLowerCase()));
    console.log(`Prescriptions from Dr. ${doctor}:`, filteredPrescriptions);
  };

  const filterPrescriptionsByStatus = (filled) => {
    const filteredPrescriptions = prescriptions.filter(prescription => prescription.filled === filled);
    console.log(`${filled ? 'Filled' : 'Unfilled'} Prescriptions:`, filteredPrescriptions);
  };

  const selectPrescriptionById = (id) => {
    const selectedPrescription = prescriptions.find(prescription => prescription.id === id);
    console.log('Selected Prescription:', selectedPrescription);
  };

  return (
    <div>
      <h2>Prescription List</h2>
      <button onClick={viewAllPrescriptions}>View All Prescriptions</button>
      <button onClick={() => filterPrescriptionsByDate('2023-11-12')}>Filter by Date</button>
      <button onClick={() => filterPrescriptionsByDoctor('Johnson')}>Filter by Doctor</button>
      <button onClick={() => filterPrescriptionsByStatus(false)}>Filter by Unfilled</button>
      <button onClick={() => selectPrescriptionById(2)}>Select Prescription by ID</button>
    </div>
  );
};

export default PrescriptionList;