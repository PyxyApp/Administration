import * as firebase from "firebase";
import React, { Component } from 'react';
import {Badge, Image, Nav, Navbar, NavDropdown} from "react-bootstrap";
import {history} from "../../redux/store/defaultStore";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
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
                    <Navbar>
                        <Navbar.Brand href="#home">PYXY</Navbar.Brand>
                        {/* Remove display user during front dev */}
                        {/*<NavDropdown title={(user.displayName !== null) ? (user.displayName) : (user.email)} id="basic-nav-dropdown">*/}
                        <Nav className="mr-auto">
                            <Nav.Link to="/">Dashboard</Nav.Link>
                            <Nav.Link to="/users">Users</Nav.Link>
                        </Nav>
                        <NavDropdown title={(
                            <span>
                            <FontAwesomeIcon icon={faBell} />
                            <Badge pill variant="danger" className={"notifications"}>
                            5
                            </Badge>
                            </span>
                        )} id="basic-nav-dropdown">
                            <NavDropdown.Item disabled>Notifications</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={(
                            <span>
                                <FontAwesomeIcon icon={faEnvelopeOpenText} />
                                <Badge pill variant="info" className={"notifications"}>
                                    4
                                  </Badge>
                            </span>
                        )} id="basic-nav-dropdown">
                            <NavDropdown.Item disabled>Messages</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title={(
                            <Image roundedCircle
                                   src="https://avatars0.githubusercontent.com/u/13368283?s=460&u=80a43e0502d07ae15fe7a83b546b4e63fb9fb837&v=4"
                                   alt=""
                                   height={"35px"} />
                                )} id="basic-nav-dropdown">
                            <NavDropdown.Item href="/profile/settings">Settings</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="/logout">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </Navbar>
                ) : "" }
            </div>
        )
    }
}
export default (Header);