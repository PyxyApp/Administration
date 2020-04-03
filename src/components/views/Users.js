import React, {Component} from 'react';
import {Button, ButtonGroup, Card, Modal, Spinner, Table} from "react-bootstrap";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import {faUserEdit, faTimes, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Gravatar from 'react-gravatar';
import Pagination from "react-pagination-bootstrap";
import Toasts from "./Toasts";
import {routeAPI} from "../../index";
import {Link} from "react-router-dom";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.location.pathname,
            tokenACP: "",
            isShown: false,
            isLoading: false,
            dataId: '',
            activePage: '1',
            startRange: '0',
            endRange: '10',
            showToast: false,
            toastMessage: '',
            toastType: ''
        };
    }

    getTotalUsers = (token) => {
        fetch(routeAPI + 'users/', {
            method: 'GET',
            headers: {'Authorization': token},
        })
            .then(response => response.json()
                .then(json => {
                    this.setState({
                        users: json,
                        load: true
                    })
                })
            )
            .catch(e => {
                console.error(e);
            })
    };

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
        if(!this.state.load){
            this.getTotalUsers(this.state.tokenACP);
        }
        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        Users
                        <div className={'card-header-right'}>
                            <Link to={'/create-user'}>
                                <Button size={"sm"} variant={"success"}>
                                    <FontAwesomeIcon icon={faUserPlus}/> Create data
                                </Button>
                            </Link>
                        </div>
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        {!this.state.load ?
                            (
                                <span>
                                    {this.getTotalUsers(this.state.tokenACP)}
                                    <Spinner animation="grow" />
                                    <Spinner animation="grow" />
                                    <Spinner animation="grow" />
                                </span>
                            )
                        :
                            (
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
                                        {this.state.load ?
                                            this.state.users.slice(this.state.startRange, this.state.endRange).map( (user, index) => {
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
                                            }) : ""}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                        totalItemsCount={this.state.users.length}
                                        activePage={this.state.activePage}
                                        itemsCountPerPage={10}
                                        pageRangeDisplayed={5}
                                        onChange={this.handlePageChange.bind(this)}
                                    />
                                </div>
                            )
                        }
                        <Modal show={this.state.isShown} onHide={this.handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Confirm</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                Are you sure to want delete {this.state.data ? this.state.data.user.email : ""} ?
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
                    </Card.Body>
                </Card>
                <Toasts showT={this.state.showToast} message={this.state.toastMessage} type={this.state.toastType}/>
            </div>
        )
    }
}
export default (Index);