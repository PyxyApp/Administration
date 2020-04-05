import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {firebaseConfig} from "../../../firebaseConfig";
import key from "../../../privateKey";
import * as jwt from "jsonwebtoken";
import Users from "./Users";
import Lists from "./Lists";
import Tasks from "./Tasks";
import Categories from "./Categories";

//TODO export all function of all page to one function
let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

export default class CreateData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: "",
            dataType: this.props.location.pathname.substr(8),
            showToast: false,
        };
    }

    showToasts = () => {this.setState({showToast: true})};
    closeToast = () => {this.setState({showToast: false})};
    delayToHide = () => {setTimeout(this.closeToast, 10000)};

    render() {
        const listData = {
            users: <Users dataType={this.state.dataType} showToasts={this.showToasts} closeToast={this.closeToast} showT={this.state.showToast}/>,
            tasks: <Tasks dataType={this.state.dataType} showToasts={this.showToasts} closeToast={this.closeToast} showT={this.state.showToast}/>,
            lists: <Lists dataType={this.state.dataType} showToasts={this.showToasts} closeToast={this.closeToast} showT={this.state.showToast}/>,
            categories: <Categories dataType={this.state.dataType} showToasts={this.showToasts} closeToast={this.closeToast} showT={this.state.showToast}/>,
        };

        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        CreateData : {this.state.dataType}
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        {listData[this.state.dataType]}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}