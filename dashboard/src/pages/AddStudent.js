import {
    Button,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import React, { useEffect } from "react";
import "./Sidebar";
import Sidebar from "./Sidebar";
import "./AddStudent.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";

function AddStudent() {
    const [student, setStudent] = useState({
        id: "",
        firstname: "",
        lastname: "",
        middlename: "",
        course: "",
        year: ""
    });

    async function handleAddStudent() {
        try {
            const respond = await fetch("http://localhost:1337/addStudent", {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify(student),
            });

            const result = await respond.json();

            alert(result.message);

            if (result.success) {
                setStudent({
                    id: "",
                    firstname: "",
                    lastname: "",
                    middlename: "",
                    course: "",
                    year: ""
                });
            }
        } catch (error) {
            console.error("Error adding student:", error);
            alert("An error occured. Please try again.");
        }
    }
    
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

        setStudent({
            ...student,
            [e.target.name]: e.target.value,
            [e.target.id]: e.target.value,
        });
    };

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            console.log("User not logged in");
            Navigate("/");
        }
    }, []);

    return (
        <div className="addstudent">
            <Sidebar />
            <div className="content">
                <h1>ADD STUDENT</h1>
                <form className="textbox" onSubmit={handleAddStudent}>
                    <TextField
                        required
                        id="id"
                        typ="number"
                        label="ID Number"
                        variant="outlined"
                        value={student.id}
                        onChange={handleChange}
                        inputProps={{ maxLength: 8 }}
                    />

                    <TextField
                        required
                        id="firstname"
                        label="First Name"
                        variant="outlined"
                        value={student.firstname}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                    />

                    <TextField
                        required
                        id="lastname"
                        label="Last Name"
                        variant="outlined"
                        value={student.lastname}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                    />

                    <TextField
                        id="middlename"
                        label="Middle Name"
                        variant="outlined"
                        value={student.middlename}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                    />

                    <TextField
                        required
                        id="course"
                        label="Course"
                        variant="outlined"
                        value={student.course}
                        onChange={handleChange}
                        inputProps={{ pattern: "^[A-Za-z]+$" }}
                    />

                    <FormControl variant="outlined" required>
                        <InputLabel id="year-label">Year</InputLabel>
                        <Select
                            labelId="year-label"
                            name="year"
                            value={student.year}
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
                    <Button variant="contained" type="submit">
                        ADD STUDENT
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default AddStudent;
