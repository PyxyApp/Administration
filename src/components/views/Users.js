import React, {Component} from 'react';
import {Button, ButtonGroup, Modal, Spinner, Table} from "react-bootstrap";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import {faUserEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Gravatar from 'react-gravatar';
import Pagination from "react-pagination-bootstrap";
import Toasts from "./Toasts";
import {routeAPI} from "../../index";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: "users",
            tokenACP: "",
            isShown: false,
            isLoading: false,
            data: this.props.data,
            dataId: '',
            activePage: '1',
            showToast: false,
            toastMessage: '',
            toastType: ''
        };
    }

    handleClose = () => { this.setState({isShown: false})};
    showToasts = () => {this.setState({showToast: true})};
    closeToast = () => {this.setState({showToast: false})};
    delayToHide = () => {setTimeout(this.closeToast, 10000)};

    Deactivate = (e) => {
        e.preventDefault();
        let user = this.state.data.user;
        fetch(routeAPI + 'users/' + user.uid, {
            method: "PUT",
            headers: {'Authorization': this.state.tokenACP},
            body: {
                email: user.email,
                phoneNumber: user.phone,
                password: user.password,
                displayName: user.displayName,
                photoURL: user.photoURL,
                disabled: true
            }
        })
            .then(r => {
                this.setState({
                    toastMessage: 'User update with success !',
                    toastType: 'success'
                })
            })
            .catch(e => {
                this.setState({
                    toastMessage: 'An error occurred while updating the user: ' + e.message,
                    toastType: 'error'
                });
            });
        this.handleClose();
        this.showToasts();
        this.delayToHide();
    };

    deleteConfirm = (e) => {
        e.preventDefault();
        fetch(routeAPI + 'users/' + this.state.data.user.uid, {
            method: "DEL",
            headers: {'Authorization': this.state.tokenACP},
        })
            .then(response => response.json()
                .then(json => {
                    console.log(json)
                })
            )
            .catch(e => {
                console.error(e);
            });
        this.handleClose();
        this.showToasts();
        this.delayToHide();
    };

    handlePageChange(pageNumber) {
        let endRange = 10*pageNumber;
        let startRange = endRange-10;

        this.setState({
            activePage: pageNumber,
            startRange: startRange,
            endRange: endRange
        });
    }

    render() {
        return (
            <div>
                <Table striped bordered hover variant="dark" >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Administrator</th>
                        <th>Display Name</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.slice(this.props.startRange, this.props.endRange).map( (user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index+1}</td>
                                <td>{user.uid}</td>
                                <td>{user.acp.admin ? "true" : 'false'}</td>
                                <td>
                                    <Gravatar email={user.email} size={35} className="rounded-circle"/>&nbsp;
                                    {user.name.firstname} {user.name.lastname}</td>
                                <td>{user.email}</td>
                                <td>{user.name.username}</td>
                                <td>
                                    <ButtonGroup aria-label="Basic example">
                                        <Button variant={"warning"}><FontAwesomeIcon icon={faUserEdit}/></Button>
                                        <Button variant={"danger"}
                                                onClick={() => this.setState({isShown: true, data: {user}}
                                                )}><FontAwesomeIcon icon={faTimes}/></Button>
                                    </ButtonGroup>
                                </td>
                            </tr>
                        )
                        })}
                    </tbody>
                </Table>
                <Modal show={this.state.isShown} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure to want delete {this.state.data ? this.state.data.email : ""} ?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            No
                        </Button>
                        <Button type={"submit"} variant="warning" onClick={this.Deactivate}>
                            Deactivate
                        </Button>
                        <Button type={"submit"} variant="danger" onClick={this.deleteConfirm}>
                            Yes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}
export default (Index);