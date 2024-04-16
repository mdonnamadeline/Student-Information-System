import React, { useEffect } from "react";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user')) {
      navigate('/');
    }
  }, []);
  return (
      <div className="dashboard">
        <Sidebar />
        <div className="con">
            <h1>Welcome to Saint Mary's University</h1>
        </div>  
      </div>
  );
}

export default Dashboard;
