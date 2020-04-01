import React, {Component} from 'react';
import {Button, ButtonGroup, Card, Modal, Spinner, Table} from "react-bootstrap";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import {faUserEdit, faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Pagination from "react-pagination-bootstrap";
import Toasts from "./Toasts";
import {routeAPI} from "../../index";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.location.pathname,
            tokenACP: "",
            isShown: false,
            isLoading: false,
            load: false,
            loadLists: false,
            dataId: '',
            activePage: '1',
            startRange: '0',
            endRange: '10',
            showToast: false,
            toastMessage: '',
            toastType: ''
        };
    }

    getTotalLists = (token) => {
        fetch(routeAPI + 'lists/', {
            method: 'GET',
            headers: {'Authorization': token},
        })
            .then(response => response.json()
                .then(json => {
                    this.setState({
                        lists: json,
                        loadLists: true
                    })
                })
            )
            .catch(e => {
                console.error(e);
            })
    };

    getTotalTasks = (token) => {
        if(!this.state.load){
            fetch(routeAPI + 'tasks/', {
                headers: {'Authorization': token},
            })
                .then(response => response.json()
                    .then(json => {
                        this.setState({
                            tasks: json,
                            load: true
                        })
                    })
                )
                .catch(e => {
                    console.error(e.message);
                })
        }
    };

    handleClose = () => { this.setState({isShown: false})};
    showToasts = () => {this.setState({showToast: true})};
    closeToast = () => {this.setState({showToast: false})};
    delayToHide = () => {setTimeout(this.closeToast, 10000)};

    // deleteConfirm = (e) => {
    //     e.preventDefault();
    //     fetch('https://us-central1-pyxy-f84e8.cloudfunctions.net/api/lists/' + this.state.data.user.uid, {
    //         method: "DEL",
    //         headers: {'Authorization': this.state.tokenACP},
    //     })
    //         .then(response => response.json()
    //             .then(json => {
    //                 console.log(json)
    //             })
    //         )
    //         .catch(e => {
    //             console.error(e);
    //         });
    //     this.handleClose();
    //     this.showToasts();
    //     this.delayToHide();
    // };

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
            this.getTotalLists(this.state.tokenACP);
            this.getTotalTasks(this.state.tokenACP);
        }
        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        Tasks
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        {!this.state.load ?
                            (
                                <span>
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
                                            <th>Title</th>
                                            <th>List</th>
                                            <th>Private</th>
                                            <th>Done</th>
                                            <th>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {this.state.load ?
                                            this.state.tasks.slice(this.state.startRange, this.state.endRange).map( (task, index) => {
                                                return <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{task.uid}</td>
                                                    <td>{task.name}</td>
                                                    <td>
                                                        {!this.state.loadLists ?
                                                            (
                                                                <span>
                                                                        <Spinner animation="grow"/>
                                                                        <Spinner animation="grow"/>
                                                                        <Spinner animation="grow"/>
                                                                    </span>
                                                            )
                                                            :
                                                            this.state.lists.map((list, index) => {
                                                                if (list.uid === task.list) return (
                                                                    <span key={index}>
                                                                        {list.title}
                                                                        </span>
                                                                )
                                                            })
                                                        }</td>
                                                    <td>
                                                        {(task.is_private) ? (
                                                            <Button variant={"success"}><FontAwesomeIcon
                                                                icon={faCheck}/></Button>
                                                        ) : (
                                                            <Button variant={"danger"}><FontAwesomeIcon icon={faTimes}/></Button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {(task.is_done) ? (
                                                            <Button variant={"success"}><FontAwesomeIcon
                                                                icon={faCheck}/></Button>
                                                        ) : (
                                                            <Button variant={"danger"}><FontAwesomeIcon icon={faTimes}/></Button>
                                                        )}
                                                    </td>
                                                    <td>
                                                        <ButtonGroup aria-label="Basic example">
                                                            <Button variant={"warning"}><FontAwesomeIcon
                                                                icon={faUserEdit}/></Button>
                                                            <Button variant={"danger"}
                                                                    onClick={() => this.setState({
                                                                            isShown: true,
                                                                            data: {task}
                                                                        }
                                                                    )}><FontAwesomeIcon icon={faTimes}/></Button>
                                                        </ButtonGroup>
                                                    </td>
                                                </tr>
                                            }) : ""}
                                        </tbody>
                                    </Table>
                                    <Pagination
                                        totalItemsCount={this.state.tasks.length}
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
                                Are you sure to want delete {this.state.data ? this.state.data.task.name : ""} ?
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    No
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
export default (Tasks);