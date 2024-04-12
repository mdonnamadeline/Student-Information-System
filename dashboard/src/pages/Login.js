import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import "./Login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from 'react-router-dom';



function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/signup');
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();  try {
        const response = await axios.post("http://localhost:1337/login", user);
        const result = await response.data;
  
        if (result.success) {
            navigate('/');
        }
        alert(result.message);
      } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occured. Please try again.");
      }
  };

  return (
    <div className="loginContainer">
      <div className="loginMain">
        <p>STUDENT INFORMATION SYSTEM</p>
        <form className="loginForm" onSubmit={handleLogin}>
          <TextField
            required
            name="email"
            label="Email"
            variant="outlined"
            value={user.email}
            onChange={handleChange}
            inputProps={{ pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" }}
          />
          <TextField
            id="password"
            required
            label="password"
            type={showPassword ? "text" : "password"}
            variant="outlined"
            value={user.password}
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
          <div className="btnGroup">
            <Button variant="contained" type="submit" >Login</Button>
            <Button variant="contained" onClick={handleSignUp}>SignUp</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
