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
//import datetime from './ResceduleButton'

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

  const params = new URLSearchParams(window.location.search);
  const userId = params.get('docid');

  const [authors, setAuthors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);

  const [formData, setFormData] = useState({
    Username: ''
    
  });


  const [re, setRe] = useState(false);
    const [pres, setPres] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    const user = event.target.value
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const doctor = event.target.value;
    //window.alert("Reservation completed with "+ doctor)
    try {
      const response = await fetch('http://localhost:8000/createnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userId,doctorid:doctor,subject:"Chat Request",content:"there is a request to make a live meeting with you ,invitation id: 8011145782'+' pass: weYr3F By: "}),
      });

      // Handle the response as needed
      console.log(response);
      window.location.href=`/payment?docid=${userId}&docid2=${doctor}`
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }


    
  
  };

  const handlefollowup = async (event) => {
    event.preventDefault();
    
    const doctor = event.target.value;
    //window.alert("Reservation completed with "+ doctor)
    try {
      const response = await fetch('http://localhost:8000/createnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userId,doctorid:doctor,subject:"Followup Request",content:"there is a request to make a Followup between you and "}),
      });

      // Handle the response as needed
      console.log(response);
      //window.location.href=`/payment?docid=${userId}&docid2=${doctor}`
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }


    
  
  };



  

  const handleReschedule = async (event) => {
    event.preventDefault();
    
    const doctor = event.target.value;
    //window.alert("Reservation completed with "+ doctor)
    try {
      const response = await fetch('http://localhost:8000/createnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:doctor,doctorid:userId,subject:"Appointment Rescedule",content:"Your Appointment have been Resceduled to Date: "+date+" By: "}),
      });

      // Handle the response as needed
      console.log(response);
      window.location.href=`/payment?docid=${userId}&docid2=${doctor}`
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleCancel = async (event) => {
    event.preventDefault();
    
    const doctor = event.target.value;
    //window.alert("Reservation completed with "+ doctor)
    try {
      const response = await fetch('http://localhost:8000/createnotification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({userid:userId,doctorid:doctor,subject:"Appointment Cancelled",content:"Your Appointment have been Canceled With: "}),
      });

      // Handle the response as needed
      console.log(response);
      window.alert("Cancellation Completed")
      //history.push('/filter');
      //window.location.href="http://localhost:8000/createAdminstrator"
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const getAuthors = async () => {
    await axios.post('http://localhost:8000/getappointments',{userid:userId}).then(
      (res) => {
        const authors = res.data;
        console.log(authors);
        setAuthors(authors);
      }
    );
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    const filteredList = authors.filter(author =>
      author.Name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAuthors(filteredList);
  };

  return (
    <>
    {/* Header */}
     <div style={{ backgroundColor: '#4584ff', width: '100%', padding: '10px', display: 'flex', alignItems: 'center' }}>
     <img src="back.png" alt="Logo" style={{ marginRight: '10px' ,width:'50px'}} onClick={()=>window.location.href=`/homepagepatient?docid=${userId}`}/>
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
          Load Appointments
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
              <StyledTableCell align="center">Username</StyledTableCell>
              <StyledTableCell align="center">Reserved</StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center"></StyledTableCell>
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
                <TableCell align="center">{author.Username}</TableCell>
                <TableCell align="center">{author.DateOfBirth}</TableCell>
                {!(author.Gender) && <TableCell align="center"><Button value={author._id} name='Username' onClick={handlefollowup}>Request Followup</Button></TableCell>}
                <TableCell align="center"><Button value={author._id} name='Username' onClick={()=>{window.location.href=`/reschedule?docid=${userId}&docid2=${author._id}`}}>Reschedule</Button></TableCell>
                <TableCell align="center"><Button value={author._id} name='Username' onClick={handleCancel}>Cancel</Button></TableCell>
                {author.Status!=='Cancelled' && (<TableCell align="center" onClick={() => window.location.href=`https://us05web.zoom.us/j/8011145782?pwd=6qQZprzfr11od523tbsaZ8bL4IMdLg.1

`}><Button value={author._id} name='Username' onClick={handleSubmit}>Chat</Button></TableCell>)}
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