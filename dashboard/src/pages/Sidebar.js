import React from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { HearingOutlined, Home, Info,  Visibility} from "@mui/icons-material";
import LogoutIcon from '@mui/icons-material/Logout';

function Sidebar({ role = 'user' }) {
    const LinkOrDisabled = role === 'user' ? Link : ({to, children}) => <div>{children}</div>;

    return (
        <div className="sidebar">
            <div className="conSidebar">
                <LinkOrDisabled to="/">
                    <div className="item">
                        <Home />
                        <p>HOME</p>
                    </div>
                </LinkOrDisabled>

                <LinkOrDisabled to="/addstudent">
                    <div className="item">
                        <Info />
                        <p>ADD STUDENT</p>
                    </div>
                </LinkOrDisabled>

                <LinkOrDisabled to="/viewstudent">
                    <div className="item">
                        <Visibility />
                        <p>VIEW STUDENT</p>
                    </div>
                </LinkOrDisabled>

                <LinkOrDisabled to="/viewuser">
                    <div className="item">
                        <Visibility />
                        <p>VIEW USER</p>
                    </div>
                </LinkOrDisabled>

                <LinkOrDisabled to="/managestudent">
                    <div className="item">
                        <Visibility />
                        <p>MANAGE STUDENT</p>
                    </div>
                </LinkOrDisabled>

                <LinkOrDisabled to="/demo">
                    <div className="item">
                        <HearingOutlined />
                        <p>DEMO</p>
                    </div>
                </LinkOrDisabled>

                <Link to="/" onClick={() => localStorage.removeItem('user')}>
                    <div className="item">
                        <LogoutIcon />
                        <p>LOGOUT</p>
                    </div>
                </Link>

            </div>
        </div>
    );
}

export default Sidebar;
