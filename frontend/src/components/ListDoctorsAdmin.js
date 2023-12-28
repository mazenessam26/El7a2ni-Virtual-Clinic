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

  const getAuthors = async () => {
    await axios.get('http://localhost:8000/getRequests').then(
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
      author.Username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredAuthors(filteredList);
  };

  const handleAccept = async (e) => {
    e.preventDefault();
    const doctor = e.target.value;
    window.alert(doctor)
    //window.alert(mongoose.Types.ObjectId.isValid(doctor))
    //if (mongoose.Types.ObjectId.isValid(doctor)){
      try {
        const response = await fetch(`http://localhost:8000/acceptdoc?userId=${doctor}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId: doctor}),
        });
  
        // Handle the response as needed
        console.log(response);
        window.alert(response.status)
        
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    
    
  }

  const handleReject = async (e) => {
    e.preventDefault();
    const doctor = e.target.value;
    window.alert(doctor)
    //window.alert(mongoose.Types.ObjectId.isValid(doctor))
    //if (mongoose.Types.ObjectId.isValid(doctor)){
      try {
        const response = await fetch(`http://localhost:8000/rejectdoc?userId=${doctor}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({userId: doctor}),
        });
  
        // Handle the response as needed
        console.log(response);
        window.alert(response.status)
        
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    
    
  }

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
          Load Doctors
        </Button>
      </Box>

      <Input
        type="text"
        placeholder="Search by Username"
        value={searchQuery}
        onChange={handleSearch}
      />

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            <StyledTableCell align="center"></StyledTableCell>
            <StyledTableCell align="center"></StyledTableCell>
              <StyledTableCell align="center">Name</StyledTableCell>
              <StyledTableCell align="center">Email</StyledTableCell>
              <StyledTableCell align="center">Session Price</StyledTableCell>
              <StyledTableCell align="center">Speciality</StyledTableCell>
              <StyledTableCell align="center">Username</StyledTableCell>
              
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
                <TableCell align="center"><Button value={author._id} onClick={handleAccept}>Accept</Button></TableCell>
                <TableCell align="center"><Button value={author._id} onClick={handleReject}>Reject</Button></TableCell>
                <TableCell align="center">{author.Name}</TableCell>
                <TableCell align="center">{author.Email}</TableCell>
                <TableCell align="center">{author.SessionPrice}</TableCell>
                <TableCell align="center">{author.Speciality}</TableCell>
                <TableCell align="center">{author.Username}</TableCell>
                
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