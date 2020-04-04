import React, {Component} from 'react';
import {Table} from "react-bootstrap";
import {firebaseConfig} from "../../../firebaseConfig";
import key from "../../../privateKey";
import * as jwt from "jsonwebtoken";
import ButtonGroupAction from "./ButtonGroupAction";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

export default class Categories extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: "categories",
            tokenACP: "",
            isLoading: false,
            data: this.props.data,
            activePage: '1'
        };
    }

    render() {
        return <Table striped bordered hover variant="dark" >
                <thead>
                <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {this.state.data.slice(this.props.startRange, this.props.endRange).map( (categories, index) => {
                        return <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{categories.uid}</td>
                                    <td>{categories.title}</td>
                                    <td>{categories.description}</td>
                                    <td>
                                        <ButtonGroupAction data={this.props.data} id={categories.uid}/>
                                    </td>
                                </tr>
                    })}
                </tbody>
            </Table>
    }
}