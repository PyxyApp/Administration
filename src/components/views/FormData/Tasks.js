import React, {Component} from "react";
import {Form} from "react-bootstrap";
import routeAPI from "../../../tools/routeAPI";
import FieldText from "./FieldText";
import GenderRadioButton from "./GenderRadioButton";
import FooterForm from "./FooterForm";
import Switch from "./Switch";

export default class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: "",
            dataType: this.props.dataType,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(routeAPI + 'tasks/', {
            method: "POST",
            headers: {
                'Authorization': this.state.tokenACP,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                list: this.state.list,
                is_private: false,
                is_active: true,
            })
        })
            .then(r => {
                console.log(r);
                this.setState({
                    toastMessage: 'Tasks created with success !',
                    toastType: 'success'
                })
            })
            .catch(e => {
                this.setState({
                    toastMessage: 'An error occurred while creating the task: ' + e.message,
                    toastType: 'error'
                });
            });
        this.props.showToasts();
        this.props.delayToHide();
    };

    handleChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
    };

    render() {
        console.log(this.state);
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText title={"Name"} name={"name"} id={"name"} placeholder={"Visit the Taj Mahal"} type={'text'} handleChange={this.handleChange}/>
                <FieldText title={"list"} name={"list"} id={"list"} placeholder={"listId"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" as="textarea" rows="3" onChange={this.handleChange}/>
            </Form.Group>

            {/*<Form.Row>*/}
            {/*    <Switch label={"Is Active ?"} id={"isActive"} name={"is_active"} handleChange={this.handleChange}/>*/}
            {/*</Form.Row>S*/}

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}