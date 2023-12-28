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
import HealthRecords from './HealthRecords';

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
  const [filename, setfilename] = useState("");
  const [filteredAuthors, setFilteredAuthors] = useState([]);
  const [formData, setFormData] = useState({
    Username: '',
    
  });
  //var filename =""; 
  const getAuthors = async (e) => {
    e.preventDefault();
    const emailInput = document.getElementById("Username");
    await axios.post('http://localhost:8000/gethealthrecords',{Username:"matrixcheck3"}).then(
      (res) => {
        const authors = res.data;

        window.alert(authors.HealthRecords[0].dtype +" loaded sucessfuly");
        const  filename = authors.HealthRecords[0].dtype;
        setfilename(filename);
        setAuthors(authors);
        
      }
    );
  };

 

  

  const handleReject = async (e) => {
    e.preventDefault();
    const doctor = e.target.value;
    window.alert(doctor)
    //window.alert(mongoose.Types.ObjectId.isValid(doctor))
    //if (mongoose.Types.ObjectId.isValid(doctor)){
      try {
        const response = await fetch(`http://localhost:8000/removehealthrecords?userId=${doctor}`, {
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
          Load Files
        </Button>
      </Box>

     
      

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
            
            <StyledTableCell align="center">Name</StyledTableCell>

            <StyledTableCell align="center"></StyledTableCell>
            
              <StyledTableCell align="center">File Name</StyledTableCell>
              
              
            </TableRow>
          </TableHead>
          <TableBody>
            {
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#000080",
                    width: "100%"
                  },
                }}
                
                key={authors._id}
              >
                <TableCell align="center">{authors.Name}</TableCell>
                <TableCell align="center"><Button value={authors._id} onClick={handleReject}>Remove</Button></TableCell>
                <TableCell align="center">{filename}</TableCell>
                
                
              </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </>
  );
};

export default DoctorsList;