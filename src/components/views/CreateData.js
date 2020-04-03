import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import Toasts from "./Toasts";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class CreateData extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: "",
            showToast: false,
            toastMessage: '',
            toastType: ''
        };
    }

    handleClose = () => { this.setState({isShown: false})};
    showToasts = () => {this.setState({showToast: true})};
    closeToast = () => {this.setState({showToast: false})};
    delayToHide = () => {setTimeout(this.closeToast, 10000)};

    render() {
        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        CreateData : DATA
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        loo
                    </Card.Body>
                </Card>
                <Toasts showT={this.state.showToast} message={this.state.toastMessage} type={this.state.toastType}/>
            </div>
        )
    }
}
export default (CreateData);