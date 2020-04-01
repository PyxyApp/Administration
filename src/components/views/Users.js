import React, {Component} from 'react';
import {Button, ButtonGroup, Card, Spinner, Table} from "react-bootstrap";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import {faUserEdit, faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Gravatar from 'react-gravatar';
import Pagination from "react-pagination-bootstrap";

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
            activePage: '1',
            startRange: '0',
            endRange: '10'
        };
    }

    getTotalUsers = (token) => {
        fetch('https://us-central1-pyxy-f84e8.cloudfunctions.net/api/users/', {
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

    handleClose = () => {
        this.setState({isShown: false})
    };

    handlePageChange(pageNumber) {
        console.log(`active page is ${pageNumber}`);
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
        console.log(this.state);
        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        Users
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
                                                                <Button variant={"danger"}><FontAwesomeIcon icon={faTimes}/></Button>
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
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default (Index);