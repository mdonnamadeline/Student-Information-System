import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Sidebar";
import "./ViewStudent.css";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  Button,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

// style ng Modal
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 2,
  borderRadius: "10px",
  width: "20%",
  p: 4,
};

// function para icall yung laman ng student
function ViewStudent() {
  const [students, setStudents] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentStudent, setCurrentStudent] = useState(null);
  const [refreshData, setRefreshData] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1337/viewStudents")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student data:", error);
      });
  }, [refreshData]);

  // para iclose yung button
  function handleClose() {
    setOpen(false);
  }

  function handleEditStudent(student) {
    setCurrentStudent(student);
    setOpen(true);
  }

  //function to handle textfield
  const handleChange = (e) => {
    //para number lang ang mailalagay
    if (e.target.id === "id" && isNaN(e.target.value)) {
      return;
    }
    //para sa names letter lang no digits
    if (
      (e.target.id === "firstname" ||
        e.target.id === "lastname" ||
        e.target.id === "middlename" ||
        e.target.id === "course") &&
      e.target.value !== "" &&
      !/^[A-Za-z .-]+$/.test(e.target.value)
    ) {
      return;
    }

    if (e.target.id === "year") {
      if (e.target.value > 5 || e.target.value < 1) {
        return;
      }
    }

    setCurrentStudent({
      ...currentStudent,
      //e.target.name gets the name of the textfields and uses that for getting the value
      [e.target.name]: e.target.value,
      [e.target.id]: e.target.value,
    });
  };

  //function para update info ng students
  const handleUpdateStudent = async () => {
    try {
      const response = await fetch("http://localhost:1337/updatestudent", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(currentStudent),
      });

      const result = await response.json();

      if (result.success) {
        setRefreshData(!refreshData);
        handleClose();
      } else {
        alert("Failed to add student. Please try again.");
      }
      alert(result.message);
    } catch (error) {
      console.error("Error updating student:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="viewstudent">
      <Sidebar />
      <div className="vscon">
        <h1>View Students</h1>
          <TableContainer className="tableContainer" style={{ maxHeight: 500 }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Middle Name</TableCell>
                  <TableCell>Course</TableCell>
                  <TableCell>Year</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {students.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell>{student.id}</TableCell>
                    <TableCell>{student.firstname}</TableCell>
                    <TableCell>{student.lastname}</TableCell>
                    <TableCell>{student.middlename}</TableCell>
                    <TableCell>{student.course}</TableCell>
                    <TableCell>{student.year}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        onClick={() => handleEditStudent(student)}
                      >
                        EDIT
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              {currentStudent && (
                <>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    {/* nag add me here na firstname and lastname nag papakita sa taas ng info ng student */}
                    {/* {currentStudent.firstname} {currentStudent.lastname} */}
                    Student Information
                  </Typography>

                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {/* dito na yung info ng student and textfield to edit the info of students */}
                    <form
                      onSubmit={handleUpdateStudent}
                      className="editModalText"
                    >
                      <TextField
                        required
                        id="id"
                        disabled
                        label="ID Number"
                        variant="outlined"
                        value={currentStudent.id}
                        onChange={handleChange}
                        inputProps={{ maxLength: 8 }}
                      />

                      <TextField
                        required
                        id="firstname"
                        label="First Name"
                        variant="outlined"
                        value={currentStudent.firstname}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                      />

                      <TextField
                        required
                        id="lastname"
                        label="Last Name"
                        variant="outlined"
                        value={currentStudent.lastname}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                      />

                      <TextField
                        id="middlename"
                        label="Middle Name"
                        variant="outlined"
                        value={currentStudent.middlename}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                      />

                      <TextField
                        required
                        id="course"
                        label="Course"
                        variant="outlined"
                        value={currentStudent.course}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                      />

                      <FormControl variant="outlined" required>
                        <InputLabel id="year-label">Year</InputLabel>
                        <Select
                          labelId="year-label"
                          name="year"
                          value={currentStudent.year}
                          onChange={handleChange}
                          label="Year"
                        >
                          <MenuItem value="1">1</MenuItem>
                          <MenuItem value="2">2</MenuItem>
                          <MenuItem value="3">3</MenuItem>
                          <MenuItem value="4">4</MenuItem>
                          <MenuItem value="5">5</MenuItem>
                        </Select>
                      </FormControl>
                      <div className="buttonGroup">
                        <Button variant="contained" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="contained" type="submit">
                          UPDATE STUDENT
                        </Button>
                      </div>
                    </form>
                  </Typography>
                  <br />
                </>
              )}
            </Box>
          </Modal>
        </div>
      </div>
  );
}

export default ViewStudent;
