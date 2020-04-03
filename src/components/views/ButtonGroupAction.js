import React, { Component } from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes, faUserEdit} from "@fortawesome/free-solid-svg-icons";

export default class ButtonGroupAction extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render(){
        return(
            <ButtonGroup aria-label="Basic example">
                <Button variant={"warning"}><FontAwesomeIcon icon={faUserEdit}/></Button>
                <Button variant={"danger"}
                        onClick={() => this.setState({isShown: true, data: "users"}
                        )}><FontAwesomeIcon icon={faTimes}/></Button>
            </ButtonGroup>
        )
    }
}