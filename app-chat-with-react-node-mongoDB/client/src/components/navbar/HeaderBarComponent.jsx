import  { useContext } from "react";
import { Navbar } from "react-bootstrap";
import "./style.css";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

const HeaderBar = () => {

  const {logoutUser} = useContext(AuthContext);

    return (
      <div className="topnav">
        <Navbar
        style={{background: "#f2f0f0"}}
          fixed="top"
          expand="lg"
          bg="#cec3c342"
          variant="#red "
          className="topnav"
        >
          <Navbar.Brand href="">
            <span>Chat app</span>
            <span style={{right: "34px",position: "absolute"}}><Link onClick={() => logoutUser()} to="/login-register" className="btn btn-primary">Log out</Link></span>
          </Navbar.Brand>
        </Navbar>
      </div>
    );
}

export default HeaderBar;