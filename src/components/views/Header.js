import * as firebase from "firebase";
import React, { Component } from 'react';
import {Nav, Navbar} from "react-bootstrap";
import {history} from "../../redux/store/defaultStore";
import NavDropdown from "react-bootstrap/NavDropdown";
require("firebase/auth");
require("firebase/firestore");

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }


    render(){
        const user = firebase.auth().currentUser;
        return(
            <div>
                {history.location.pathname !== '/login' ? (
                    <Navbar bg="dark" variant="dark">
                        <Navbar.Brand href="#home">PYXY</Navbar.Brand>
                        {/* Remove display user during front dev */}
                        {/*<NavDropdown title={(user.displayName !== null) ? (user.displayName) : (user.email)} id="basic-nav-dropdown">*/}
                        <NavDropdown title="Nicolas Notararigo" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <Nav className="mr-auto">
                            <Nav.Link to="/">Dashboard</Nav.Link>
                            <Nav.Link to="/users">Users</Nav.Link>
                        </Nav>
                    </Navbar>
                ) : "" }
            </div>
        )
    }
}
export default (Header);