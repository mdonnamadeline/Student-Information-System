import { Button, TextField } from "@mui/material";
import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import "./Sidebar";
import { useState } from "react";
import "./demo.css";
import { useNavigate } from "react-router-dom";

function Demo() {
  // dito sa taas ng return ang mga logic
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const navigate = useNavigate();

  function handleAddCar() {
    console.log(brand);
    console.log(color);
    console.log(model);
    console.log(year);
  }

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      console.log("User not logged in");
      navigate("/");
    }
  }, []);
  
  return (

        <div className="demo-container">
          <Sidebar />
          <div className="demo-content">
          <h1>DEMO</h1>
            <TextField
              id="outlined-basic"
              label="Car Brand"
              variant="outlined"
              margin="normal"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            ></TextField>

            <br />

            <TextField
              id="outlined-basic"
              label="Car Model"
              variant="outlined"
              margin="normal"
              value={model}
              onChange={(e) => setModel(e.target.value)}
            ></TextField>

            <br />

            <TextField
              id="outlined-basic"
              label="Car Color"
              variant="outlined"
              margin="normal"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            ></TextField>

            <br />

            <TextField
              id="outlined-basic"
              label="Car Year"
              variant="outlined"
              margin="normal"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            ></TextField>

            <br />

            <Button variant="contained" onClick={handleAddCar}>
              ADD CAR
            </Button>

            <h1>My {brand}</h1>

            <p>
              It is a {color} {model} from {year}
            </p>
          </div>
        </div>
  );
}

export default Demo;
