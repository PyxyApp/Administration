import React, { Component } from 'react';
import {ListGroup} from "react-bootstrap";
import {history} from "../../redux/store/defaultStore";
import {Link} from "react-router-dom";
class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <div>
                {history.location.pathname !== '/login' ? (
                    <ListGroup variant="flush" defaultActiveKey="#link1">
                        <Link to={'/'}>
                            <ListGroup.Item>
                                Dashboard
                            </ListGroup.Item>
                        </Link>
                        <h3>Data</h3>
                        <Link to={"/users"}>
                            <ListGroup.Item>
                                Users
                            </ListGroup.Item>
                        </Link>
                        <Link to={"/categories"}>
                            <ListGroup.Item>
                                Categories
                            </ListGroup.Item>
                        </Link>
                        <Link to="/activities">
                            <ListGroup.Item>
                                Users
                            </ListGroup.Item>
                        </Link>
                        <Link to="/lists">
                            <ListGroup.Item>
                                Lists
                            </ListGroup.Item>
                        </Link>
                        <Link to={"/tasks"}>
                            <ListGroup.Item>
                                Tasks
                            </ListGroup.Item>
                        </Link>
                        <h3>Moderation</h3>
                        <Link to={"/alert"}>
                            <ListGroup.Item>
                                Signalement
                            </ListGroup.Item>
                        </Link>
                    </ListGroup>
                    ) : "" }
            </div>
        )
    }
}
export default (Header);