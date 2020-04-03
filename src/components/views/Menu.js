import React, { Component } from 'react';
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {faUser, faFolder, faFlag, faClipboardList, faClipboard, faTachometerAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        if (this.props.location.pathname === '/login') {
            return ''
        } else {
            return (
                <div className={"sideMenu col-2"}>
                    <ListGroup variant="flush" defaultActiveKey="#link1">
                        <NavLink exact to={'/'} activeClassName="active">
                            <ListGroup.Item>
                                <FontAwesomeIcon icon={faTachometerAlt}/> Dashboard
                            </ListGroup.Item>
                        </NavLink>
                        <h3>Data</h3>
                        <NavLink to={"/list/users"} activeClassName="active">
                            <ListGroup.Item>
                                <FontAwesomeIcon icon={faUser}/> Users
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink to={"/list/categories"} activeClassName="active">
                            <ListGroup.Item>
                                <FontAwesomeIcon icon={faFolder}/> Categories
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink to="/list/lists" activeClassName="active">
                            <ListGroup.Item>
                                <FontAwesomeIcon icon={faClipboard}/> Lists
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink to={"/list/tasks"} activeClassName="active">
                            <ListGroup.Item>
                                <FontAwesomeIcon icon={faClipboardList}/> Tasks
                            </ListGroup.Item>
                        </NavLink>
                        <h3>Moderation</h3>
                        <NavLink to={"/alert"} activeClassName="active">
                            <ListGroup.Item>
                                <FontAwesomeIcon icon={faFlag}/> Reporting
                            </ListGroup.Item>
                        </NavLink>
                    </ListGroup>
                </div>
            )
        }
    }
}
export default (Header);