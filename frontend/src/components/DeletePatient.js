/*import React, { useState } from 'react';
//import { useHistory } from 'react-router';
//import { ImgHTMLAttributes } from 'react';
import './theme.css';
const DeleteUser = () => {
   // const history = useHistory();
 
    const [formData, setFormData] = useState({
    Username: '',
    
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Handle the response as needed
      console.log(response);
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
      window.alert("deleted!");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    
    <><form action="/createAdminstrator" onSubmit={handleSubmit}>
          <label>
              Username:
              <input
                  type="text"
                  name="Username"
                  required
                  value={formData.Username}
                  onChange={handleChange} />
          </label>
          <br />
          

          <button type="submit">Delete Patient</button>
      </form><img src="./acllogo.png"alt="logo" width="150px" height="80px"></img></>
  );
};

export default DeleteUser;*/

import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Input from '@mui/material/Input';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#4584ff',
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const { useState } = require("react");

const DoctorsList = () => {
  
  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);


  const [formData, setFormData] = useState({
    Username: ''
    
  });
    

  const handleChange = (event) => {
    const { name, value } = event.target;
    const user = event.target.value
    setFormData({ ...formData, [name]: value });
  };

  const handlenotification = async (event) => {
    event.preventDefault();
  
    const doctor = event.target.value;
    //window.alert("Reservation completed with " + doctor);
  
    try {
      const date = new Date('2023-12-12');
      //window.alert(date);
  
      // Use Promise.all to execute both fetch requests concurrently
      await Promise.all([
        fetch('http://localhost:8000/createnotification', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userid: userId, doctorid: doctor, subject: "Scheduling Appointment", content: "Appointment has been successfully booked with " }),
        }),
        fetch('http://localhost:8000/reserveTimeSlot', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ Pid: userId, Did: doctor, ADate: "2023-11-11" }),
        }),
      ]);
  
      // Continue with the rest of your code or handle responses as needed
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getAuthors = async () => {
    await axios.get('http://localhost:8000/getPatients').then(
      (res) => {
        const authors = res.data;
        console.log(authors);
        setAuthors(authors);
      }
    );
  };
  const handledelete = async (event) => {
    event.preventDefault();
    const user = event.target.value;
    try {
      const response = await fetch('http://localhost:8000/deleteUser', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Username:user}),
      });

      // Handle the response as needed
      console.log(response);
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
      window.alert("deleted!");
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };


  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredList = authors.filter(author =>
      author.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAuthors(filteredList);
  };

  const params = new URLSearchParams(window.location.search);
  const userId = params.get('docid');

  return (

    <>
        
    {/* Header */}
<div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
<img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/homepageAdmin?docid=${userId}`}/>
<img src="acllogo.png" alt="Logo" style={{ marginRight: '10px' ,width:'200px'}} />
<h1>El7a2ni Clinic</h1>
</div>

    <div className="UsersList">
      <Box sx={{ marginBottom: 2 }}>
        <Button variant="contained"
          onClick={getAuthors}
          margin="normal"
          padding="normal"
        >
          Load Patients
        </Button>
      </Box>
     
      <Input
        type="text"
        placeholder="Search by Name"
        value={searchQuery}
        onChange={handleSearch}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              
              <StyledTableCell align="center"></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(searchQuery ? filteredAuthors : authors).map((author) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%"
                  },
                }}
                
                key={author._id}
                
              >
                <TableCell align="center">{author.Name}</TableCell>
                <TableCell align="center">{author.Email}</TableCell>
                
                <TableCell align="center"><Button value={author.Username} value2 ={author.Username} name='Username' type='submit' onClick={handledelete}>Delete</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default DoctorsList;