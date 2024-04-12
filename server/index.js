//import the Express module
const express = require("express");
const mongoose = require('mongoose');
const Student = require("./models/student.model");
const User = require("./models/user.model");
const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const fs = require("fs");
app.use(cors());
app.use(bodyParser.json());

const port = 1337;

//creating routes
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

//MARK: OLD STUDENT
//route to view added student
app.get("/viewStudents", (req, res) => {
  try {
    const studentData = JSON.parse(fs.readFileSync("student.json"));
    res.json(studentData);
  } catch (error) {
    console.error("Error reading student data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to handle POST request for adding a student
app.post("/addStudent", (req, res) => {
  const studentData = req.body;
  //Reading existing data from the file (if any)
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync("student.json"));
  } catch (error) {
    //File might not exist yet, or it might be empty
    console.log("didn't find old data");
  }

  //Add new student data to the existing array
  existingData.push(studentData);

  //Write the updated data back to the file
  fs.writeFileSync("student.json", JSON.stringify(existingData, null, 2));

  res.json({ success: true, message: "Student added succesfully" });
});
//end for adding student

//update added student
//Route to handle POST modify the data of the students
app.post("/updatestudent", async (req, res) => {
  const studentData = req.body;

  // Read existing data from the file (if any)
  let existingData = [];
  try {
    existingData = JSON.parse(fs.readFileSync("student.json"));
  } catch (error) {
    // Handle file reading errors here, e.g., log the error
  }

  // Find the index of the student with the given ID
  const studentIndex = existingData.findIndex(
    (student) => student.id === studentData.id
  );

  if (studentIndex !== -1) {
    // Update the existing student's data
    existingData[studentIndex] = studentData;

    // Write the updated data back to the file
    fs.writeFileSync("student.json", JSON.stringify(existingData, null, 2));

    res.json({ success: true, message: "Student Updated Successfully!" });
  } else {
    // Student with the given ID not found
    res.json({ success: false, message: "Student Not Found" });
  }
});
//end ng update

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});

//MARK:MONGODB
// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ipt', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection error', err));

//add user
app.post("/adduser", async (req, res) => {
  const incomingData = req.body;

  try {
      const user = new User(incomingData);
      await user.save();
      res.json({ success: true, message: "User added successfully!" });
  } catch (error) {
      console.error("Error adding User:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//read users
app.get("/viewusers", async (req, res) => {
  try {
      const users = await User.find({});
      res.json(users);
  } catch (error) {
      console.error("Error reading student data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//update user
app.post("/updateuser", async (req, res) => {
  const incomingData = req.body;

  try {
      const user = await User.findOne({ email: incomingData.email });
      if (!user) {
          res.json({ success: false, message: "User not found" });
      } else {
          Object.assign(user, incomingData);
          await user.save();
          res.json({ success: true, message: "User updated successfully!" });
      }
  } catch (error) {
      console.error("Error updating User:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//MARK:LOGIN
// Login route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Compare the provided password with the password in the database
    if (password !== user.password) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    // User is authenticated
    res.json({ success: true, message: "User authenticated successfully" });
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//MARK: SIGNUP
//add user
app.post("/addstudents", async (req, res) => {
  const incomingData = req.body;

  try {
      const user = new Student(incomingData);
      await user.save();
      res.json({ success: true, message: "User added successfully!" });
  } catch (error) {
      console.error("Error adding User:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//read users
app.get("/viewmanagestudent", async (req, res) => {
  try {
      const users = await Student.find({});
      res.json(users);
  } catch (error) {
      console.error("Error reading student data:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//update user
app.post("/updatestudents", async (req, res) => {
  const incomingData = req.body;

  try {
      const user = await Student.findOne({ email: incomingData.email });
      if (!user) {
          res.json({ success: false, message: "User not found" });
      } else {
          Object.assign(user, incomingData);
          await user.save();
          res.json({ success: true, message: "User updated successfully!" });
      }
  } catch (error) {
      console.error("Error updating User:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});
