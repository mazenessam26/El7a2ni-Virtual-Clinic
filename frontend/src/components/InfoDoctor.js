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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

const { useState } = require("react");

const BlogList = () => { 

    const [authors,setAuthors] = useState([]);
    const params = new URLSearchParams(window.location.search);
    //window.alert(params);
    const userId = params.get('Username');
    window.alert(userId)
    console.log(userId);
 

    const getBlogs=  async () => {
        /*
        get the blogs from the backend  
        */     
        await axios.get(`http://localhost:8000/getDocto`).then(
            (res) => { 
                const authors = res.data
                console.log(authors)
                //window.alert(authors)
                setAuthors(authors)
                
            }
        )

    }
    return(
        /* 
        1. create a button to load the blogs
        2. map over the blogs and display them
        */

        
        
        <div className="UsersList">
            <Box sx={{marginBottom: 2}}>
            <Button variant="contained"
            onClick={getBlogs}
            margin="normal"
            padding="normal"
            >Load Doctor Info</Button>
            {/* margin */}
            </Box>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Speciality</StyledTableCell>
            <StyledTableCell align="center">Hospital</StyledTableCell>
            <StyledTableCell align="center">Educational Background</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {authors.map((author) => (
            <TableRow
            hover
            sx={{
                "&:hover":{
                cursor: "pointer",
                backgroundColor: "#f5f5f5",
                width: "100%"
                }
            }}
           
              key={author._id}

              >
              <TableCell align="center">{author.Name}</TableCell>
              <TableCell align="center">{author.Speciality}</TableCell>
              <TableCell align="center">{author.Hospital}</TableCell>
              <TableCell align="center">{author.EducationalBackground}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>    

    )
}
export default BlogList;