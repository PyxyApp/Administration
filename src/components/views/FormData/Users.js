import React, {Component} from "react";
import {Form} from "react-bootstrap";
import routeAPI from "../../../tools/routeAPI";
import FieldText from "./FieldText";
import NationalitySelect from "./NationalitySelect";
import GenderRadioButton from "./GenderRadioButton";
import FooterForm from "./FooterForm";

export default class Users extends Component {

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
                if(r.ok){
                    this.setState({
                        toastMessage: 'User created with success !',
                        toastType: 'success'
                    })
                }else{
                    this.setState({
                        toastMessage: 'An error occurred while creating the user: ' + e.message,
                        toastType: 'error'
                    });
                }
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
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText title={"Email"} name={"email"} id={"email"} placeholder={"john.doe@example.com"} type={'text'} handleChange={this.handleChange}/>
                <FieldText title={"Password"} name={"password"} id={"password"} placeholder={"*******"} type={'password'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Row>
                <FieldText title={"First name"} name={"firstname"} id={"firstname"} placeholder={"John"} type={'text'} handleChange={this.handleChange}/>
                <FieldText title={"Last name"} name={"lastname"} id={"lastname"} placeholder={"Doe"} type={'text'} handleChange={this.handleChange}/>
                <FieldText title={"Username"} name={"username"} id={"username"} placeholder={"JohnDoe"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Row>
                <NationalitySelect handleChange={this.handleChange}/>
                <FieldText title={"Phone number"} name={"phone"} id={"phone"} placeholder={"3630"} type={'number'} handleChange={this.handleChange}/>
            </Form.Row>


            <Form.Row>
                <GenderRadioButton handleChange={this.handleChange}/>
            </Form.Row>

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}