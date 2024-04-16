import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Sidebar";
import "./ViewUser.css";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

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

function ViewUser() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [refreshData, setRefreshData] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    middlename: "",
    email: "",
    password: "",
  });

  //open function
  function handleOpen(user, edit) {
    // Open the modal and set the current user
    setOpen(true);
    setIsEditMode(edit);
    setCurrentUser(user);
  }

  function handleClose() {
    setOpen(false);
  }
  // for password
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      console.log('User not logged in');
      navigate('/');
  }
    axios
      .get(`http://localhost:1337/viewusers`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [refreshData]);

  const handleChange = (e) => {
    const setFunction = isEditMode ? setCurrentUser : setUser;
    const userObject = isEditMode ? currentUser : user;

    setFunction({
      ...userObject,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:1337/updateuser",
        currentUser
      );

      const result = response.data;

      if (result.success) {
        alert(result.message);
        setRefreshData(!refreshData);
        setOpen(false);
      } else {
        alert("Failed to update user. Please try again!.");
      }
    } catch (error) {
      console.error("Error updating user:", error);
      alert("An error occured. Please try again.");
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:1337/adduser", user);

      const result = await response.data;

      if (result.success) {
        setRefreshData(!refreshData);
        setOpen(false);
      }
      alert(result.message);
    } catch (error) {
      console.error("Error adding user:", error);
      alert("An error occured. Please try again.");
    }
  };

  return (
    <div className="viewuser">
      <Sidebar />
      <div className="vucon">
        <h1>View User</h1>
        <div className="addbutton">
          <Button variant="contained" onClick={() => handleOpen(users, false)}>
            ADD USER
          </Button>
          <br />
        </div>
        <TableContainer style={{ maxHeight: 500 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Middle Name</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>EDIT</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((users) => (
                <TableRow key={users.id}>
                  <TableCell>{users.firstname}</TableCell>
                  <TableCell>{users.lastname}</TableCell>
                  <TableCell>{users.middlename}</TableCell>
                  <TableCell>{users.email}</TableCell>

                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleOpen(users, true)}
                    >
                      EDIT
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal open={open} onClose={handleClose}>
          <Box sx={style} className="box">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              User Information
            </Typography>
            {currentUser && (
              <form
                className="editModalText"
                onSubmit={isEditMode ? handleUpdateUser : handleAddUser}
              >
                <TextField
                  required
                  id="firstname"
                  name="firstname"
                  label="First Name"
                  variant="outlined"
                  value={currentUser.firstname}
                  onChange={handleChange}
                  inputProps={{ pattern: "^[A-Za-z ]+$" }}
                />
                <TextField
                  required
                  id="lastname"
                  name="lastname"
                  label="Last Name"
                  variant="outlined"
                  value={currentUser.lastname}
                  onChange={handleChange}
                  inputProps={{ pattern: "^[A-Za-z ]+$" }}
                />
                <TextField
                  id="middlename"
                  name="middlename"
                  label="Middle Name"
                  variant="outlined"
                  value={currentUser.middlename}
                  onChange={handleChange}
                  inputProps={{ pattern: "^[A-Za-z ]+$" }}
                />
                <TextField
                  required
                  name="email"
                  label="Email"
                  disabled={isEditMode}
                  variant="outlined"
                  value={currentUser.email}
                  onChange={handleChange}
                  inputProps={{ pattern: "^[A-Za-z @.]+$" }}                />
                <TextField
                  id="password"
                  required
                  label="password"
                  type={showPassword ? "text" : "password"}
                  variant="outlined"
                  value={currentUser.password}
                  onChange={handleChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <div className="buttonGroup">
                  <Button variant="contained" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="contained" type="submit">
                    SAVE
                  </Button>
                </div>
              </form>
            )}
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default ViewUser;
