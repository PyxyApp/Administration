import React, {Component} from 'react';
import {Badge, Card} from "react-bootstrap";
import Users from "./Users";
import Lists from "./Lists";
import Tasks from "./Tasks";
import Categories from "./Categories";
import getToken from "../../../functions/getToken";
const token = getToken();

export default class FormData extends Component {

    constructor(props) {
        super(props);
        let doLength = this.props.match.params.do.length;
        this.state = {
            tokenACP: token,
            action: this.props.match.params.do,
            dataType: this.props.location.pathname.substr(doLength+7),
            showToast: false,
        };
    }

    showToasts = () => {this.setState({showToast: true})};
    closeToast = () => {this.setState({showToast: false})};
    delayToHide = () => {setTimeout(this.closeToast, 10000)};

    render() {
        const listData = {
            users: <Users dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
            tasks: <Tasks dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
            lists: <Lists dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
            categories: <Categories dataType={this.state.dataType} showToasts={this.showToasts} delayToHide={this.delayToHide} showT={this.state.showToast}/>,
        };

        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        <span><Badge variant={"warning"}>{this.state.action}</Badge> Form Data : {this.state.dataType}</span>
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        {listData[this.state.dataType]}
                    </Card.Body>
                </Card>
            </div>
        )
    }
}