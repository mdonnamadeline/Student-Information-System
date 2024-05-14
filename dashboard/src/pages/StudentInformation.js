import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "./Sidebar";
import "./StudentInformation.css";
// import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudentInformation() {
    // const navigate = useNavigate();


    const initialData = {
        id: "",
        firstname: "",
        lastname: "",
        middlename: "",
        course: "",
        year: "",
        password: "",
    };

    const [currentUser, setCurrentUser] = useState(initialData);

    useEffect(() => {
        const fetchStudentData = async () => {
            const studentId = localStorage.getItem("user");
            try {
                const response = await axios.post(
                    "http://localhost:1337/studentinfo",
                    {
                        id: studentId,
                    }
                );
                setCurrentUser(response.data);
            } catch (error) {
                console.error("Error fetching student data:", error);
            }
        };

        fetchStudentData();
    }, []);

    return (
        <div className="studentUser">
            <Sidebar role='student' />
            <div className="studentContainer">
                <h1>STUDENT INFORMATION</h1>
                {currentUser && (
                    <div className="container">
                        <p>ID: {currentUser.id}</p>
                        <p>First Name: {currentUser.firstname}</p>
                        <p>Middle Name: {currentUser.middlename}</p>
                        <p>Last Name: {currentUser.lastname}</p>
                        <p>Course: {currentUser.course}</p>
                        <p>Year: {currentUser.year}</p>
                        <p>Password: {currentUser.password}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default StudentInformation;
