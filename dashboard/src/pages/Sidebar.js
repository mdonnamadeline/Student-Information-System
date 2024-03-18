import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { HearingOutlined, Home, Info, Visibility } from "@mui/icons-material";

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="conSidebar">
                <Link to="/">
                    <div className="item">
                        <Home />
                        <p>HOME</p>
                    </div>
                </Link>

                <Link to="/addstudent">
                    <div className="item">
                        <Info />
                        <p>ADD STUDENT</p>
                    </div>
                </Link>

                <Link to="/viewstudent">
                    <div className="item">
                        <Visibility />
                        <p>VIEW STUDENT</p>
                    </div>
                </Link>

                <Link to="/viewuser">
                    <div className="item">
                        <Visibility />
                        <p>VIEW USER</p>
                    </div>
                </Link>

                <Link to="/demo">
                    <div className="item">
                        <HearingOutlined />
                        <p>DEMO</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Sidebar;
