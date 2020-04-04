import React, { Component } from 'react';
import {ListGroup} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import {faUser, faFolder, faFlag, faClipboardList, faClipboard, faTachometerAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import ListGroupItem from './ListGroupItem';

export default class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        if (this.props.location.pathname !== '/login') return (
            <div className={"sideMenu col-2"}>
                <ListGroup variant="flush" defaultActiveKey="#link1">
                    <NavLink exact to={'/'} activeClassName="active">
                        <ListGroup.Item>
                            <FontAwesomeIcon icon={faTachometerAlt}/> Dashboard
                        </ListGroup.Item>
                    </NavLink>
                    <h3>Data</h3>
                        <ListGroupItem to={'/users'} dataType={"Users"} icon={faUser}/>
                        <ListGroupItem to={'/categories'} dataType={"Categories"} icon={faFolder}/>
                        <ListGroupItem to={'/lists'} dataType={"Lists"} icon={faClipboard}/>
                        <ListGroupItem to={'/tasks'} dataType={"Tasks"} icon={faClipboardList}/>
                    <h3>Moderation</h3>
                        <ListGroupItem to={'/alert'} dataType={"Reporting"} icon={faFlag}/>
                </ListGroup>
            </div>
        )
    }
}