import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import React, { useState} from "react";
import "./Login.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
    const [user, setUser] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name || e.target.id]: e.target.value,
        });
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        navigate("/signup");
    };

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(
                "http://localhost:1337/login",
                user
            );
    
            const result = response.data;
    
            if (result.success) {
                console.log(user);
    
                // Store the user's email in local storage regardless of their role
                localStorage.setItem("user", user.email);
    
                if (result.role === "student") {
                    navigate("/studentinformation");
                } else {
                    navigate("/dashboard");
                }
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
                <p>Welcome Back!</p>
                <form className="loginForm" onSubmit={handleLogin}>
                    <TextField
                        required
                        name="email"
                        label="Email or ID Number"
                        variant="outlined"
                        value={user.email}
                        onChange={handleChange}
                        inputProps={{
                            pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$",
                        }}
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
                                        {showPassword ? (
                                            <Visibility />
                                        ) : (
                                            <VisibilityOff />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div className="btnGroup">
                        <Button variant="contained" type="submit">
                            Login
                        </Button>
                        <Button variant="contained" onClick={handleSignUp}>
                            SignUp
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;
