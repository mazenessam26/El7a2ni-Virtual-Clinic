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
    const userId = params.get('userId');
    console.log(userId);
 

    const getBlogs=  async () => {
        /*
        get the blogs from the backend  
        */     
        await axios.get(`http://localhost:8000/filter?userId=${userId}`).then(
            (res) => { 
                const authors = res.data
                console.log(authors)
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
            >Load Blogs</Button>
            {/* margin */}
            </Box>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">title</StyledTableCell>
            <StyledTableCell align="center">body</StyledTableCell>
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
              <TableCell align="center">{author.title}</TableCell>
              <TableCell align="center">{author.body}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </div>    

    )
}
export default BlogList;