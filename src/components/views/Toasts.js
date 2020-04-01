import React from "react";
import {Toast} from 'react-bootstrap'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheckSquare, faTimesCircle} from "@fortawesome/free-solid-svg-icons";

export default class Toasts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showToast: this.props.showT,
            type: this.props.type,
            message: this.props.message
        };
    }

    returnTitle = (type) => {
        switch (type) {
            case "success":
                return (
                    <span>
                        <FontAwesomeIcon icon={faCheckSquare}/>
                        <strong className="mr-auto">Success !</strong>
                    </span>
                );
            case "error":
                return (
                    <span>
                        <FontAwesomeIcon icon={faTimesCircle}/>
                            <strong className="mr-auto">Error !</strong>
                        </span>
                );
            case "info":
                break;
            default:
                break;
        }
    };

    closeToast = () => {this.setState({showToast: false})};

    render(){
        return (
            <Toast show={this.props.showT}>
                <Toast.Header>
                    {this.returnTitle(this.props.type)}
                    {/*<small>{this.state.startTime - this.state.curTime}s ago</small>*/}
                </Toast.Header>
                <Toast.Body>
                    {this.props.message}
                </Toast.Body>
            </Toast>
        )
    }
}