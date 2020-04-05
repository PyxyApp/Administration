import React, {Component} from "react";
import {Button, Form} from "react-bootstrap";
import {routeAPI} from "../../../index";
import FieldText from "./FieldText";
import NationalitySelect from "./NationalitySelect";
import GenderRadioButton from "./GenderRadioButton";

export default class Lists extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: "",
            dataType: this.props.dataType,
        };
    }

    handleSubmit = (e) => {
        e.preventDefault();
        fetch(routeAPI + 'users/', {
            method: "POST",
            headers: {
                'Authorization': this.state.tokenACP,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                username: this.state.username,
                nat: this.state.nat,
                gender: this.state.gender,
            })
        })
            .then(r => {
                console.log(r);
                this.setState({
                    toastMessage: 'User created with success !',
                    toastType: 'success'
                })
            })
            .catch(e => {
                this.setState({
                    toastMessage: 'An error occurred while creating the user: ' + e.message,
                    toastType: 'error'
                });
            });
        this.handleClose();
        this.showToasts();
        this.delayToHide();
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
                <FieldText title={"Email"} name={"email"} id={"email"} placeholder={"john.doe@example.com"} type={'text'}/>
                <FieldText title={"Password"} name={"password"} id={"password"} placeholder={"*******"} type={'password'}/>
            </Form.Row>

            <Form.Row>
                <FieldText title={"First name"} name={"firstname"} id={"firstname"} placeholder={"John"} type={'text'}/>
                <FieldText title={"Last name"} name={"lastname"} id={"lastname"} placeholder={"Doe"} type={'text'}/>
                <FieldText title={"Username"} name={"username"} id={"username"} placeholder={"JohnDoe"} type={'text'}/>
            </Form.Row>

            <Form.Row>
                <NationalitySelect handleChange={this.handleChange}/>
                <FieldText title={"Phone number"} name={"phone"} id={"phone"} placeholder={"3630"} type={'number'}/>
            </Form.Row>


            <Form.Row>
                <GenderRadioButton />
            </Form.Row>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>;
    }
}