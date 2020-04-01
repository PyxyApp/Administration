import React, { Component } from 'react';
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
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
                                Dashboard
                            </ListGroup.Item>
                        </NavLink>
                        <h3>Data</h3>
                        <NavLink to={"/users"} activeClassName="active">
                            <ListGroup.Item>
                                Users
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink to={"/categories"} activeClassName="active">
                            <ListGroup.Item>
                                Categories
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink to="/lists" activeClassName="active">
                            <ListGroup.Item>
                                Lists
                            </ListGroup.Item>
                        </NavLink>
                        <NavLink to={"/tasks"} activeClassName="active">
                            <ListGroup.Item>
                                Tasks
                            </ListGroup.Item>
                        </NavLink>
                        <h3>Moderation</h3>
                        <NavLink to={"/alert"} activeClassName="active">
                            <ListGroup.Item>
                                Reporting
                            </ListGroup.Item>
                        </NavLink>
                    </ListGroup>
                </div>
            )
        }
    }
}
export default (Header);