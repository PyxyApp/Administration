import React, {Component} from 'react';
import {Button, Table} from "react-bootstrap";
import {firebaseConfig} from "../../../firebaseConfig";
import key from "../../../privateKey";
import * as jwt from "jsonwebtoken";
import {faTimes, faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Gravatar from 'react-gravatar';
import Loading from "../modules/Loading";
import ButtonGroupAction from "./ButtonGroupAction";
import {routeAPI} from "../../../index";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class Lists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 'lists',
            tokenACP: "",
            isLoading: false,
            data: this.props.data,
            activePage: '1'
        };
    }

    async componentDidMount() {
        await fetch(routeAPI + 'users/', {
            headers: { 'Authorization': this.state.tokenACP },
        }).then(response => response.json())
            .then(json => {
                if(json){
                    this.setState({ users: json, apiLoaded: true });
                }
            });
    }

    render() {
        return  <Table striped bordered hover variant="dark" >
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>id</th>
                        <th>Title</th>
                        <th>User</th>
                        <th>Private</th>
                        <th>Active</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.data.slice(this.state.startRange, this.state.endRange).map( (lists, index) => {
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{lists.id}</td>
                                <td>{lists.title}</td>
                                <td>
                                    {!this.state.apiLoaded ?
                                        (
                                            <Loading/>
                                        )
                                        :
                                        this.state.users.map((user, index) => {
                                            if (user.uid === lists.user) return (
                                                <span key={index}>
                                                       <Gravatar email={user.email}
                                                                 title={user.name.firstname + ' ' + user.name.lastname + ' ' + "(" + user.name.username + ")"}
                                                                 size={35}
                                                                 className="rounded-circle"
                                                       />&nbsp;
                                                    {user.name.firstname + ' ' + user.name.lastname + ' ' + "(" + user.name.username + ")"}
                                                    </span>
                                            )
                                        })
                                    }</td>
                                <td>
                                    {(lists.is_private) ? (
                                        <Button variant={"success"}><FontAwesomeIcon
                                            icon={faCheck}/></Button>
                                    ) : (
                                        <Button variant={"danger"}><FontAwesomeIcon icon={faTimes}/></Button>
                                    )}
                                </td>
                                <td>
                                    {(lists.is_active) ? (
                                        <Button variant={"success"}><FontAwesomeIcon
                                            icon={faCheck}/></Button>
                                    ) : (
                                        <Button variant={"danger"}><FontAwesomeIcon icon={faTimes}/></Button>
                                    )}
                                </td>
                                <td>
                                    <ButtonGroupAction data={this.props.data} id={lists.uid}/>
                                </td>
                            </tr>
                        })}
                    </tbody>
                </Table>
    }
}
export default (Lists);