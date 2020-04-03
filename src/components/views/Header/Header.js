// import * as firebase from "firebase";
import React, { Component } from 'react';
import {Badge, Nav, Navbar, NavDropdown} from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBell, faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons';
import {faFly} from '@fortawesome/free-brands-svg-icons';
import {Link} from "react-router-dom";
import Gravatar from 'react-gravatar';
import Dropdown from "./Dropdown";

export default class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        if (this.props.location.pathname !== '/login') {
            return (
                <Navbar fixed="top">
                    <Navbar.Brand href="#home"><FontAwesomeIcon icon={faFly} className={"color-danger"}/> PYXY</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link to="/">Dashboard</Nav.Link>
                        <Nav.Link to="/users">Users</Nav.Link>
                    </Nav>
                    <Dropdown title={"Notifications"} icon={faBell} type={"danger"}/>
                    <Dropdown title={"Messages"} icon={faEnvelopeOpenText} type={"info"}/>
                    <Link to={"/profile/settings"} className={"ml-2"}>
                        <Gravatar email={'nicolas.notararigo@gmail.com'} className={"rounded-circle"} size={35}/>
                    </Link>
                </Navbar>
            )
        }
    }
}