import React, { Component } from 'react';
import {ListGroup} from "react-bootstrap";
import {history} from "../../redux/store/defaultStore";
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
                        <ListGroup.Item action href="#link1">
                            Link 1
                        </ListGroup.Item>
                        <ListGroup.Item href="#link2">
                            Link 2
                        </ListGroup.Item>
                    </ListGroup>
                    ) : "" }
            </div>
        )
    }
}
export default (Header);