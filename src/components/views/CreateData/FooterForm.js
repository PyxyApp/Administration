import React, {Component} from "react";
import {Button} from "react-bootstrap";
import Toasts from "../modules/Toasts";

export default class FooterForm extends Component {
    render() {
        console.log(this.props);
        return (
            <div>
                <Button variant="primary" type="submit">
                    Submit
                </Button>
                <Toasts showT={this.props.showT} message={this.props.toastMessage} type={this.props.toastType}/>
            </div>
        );
    }
}