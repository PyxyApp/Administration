import React, {Component} from "react";
import {Button, Col, Form, InputGroup, Row} from "react-bootstrap";
import NationalitySelect from "./NationalitySelect";
import {routeAPI} from "../../../index";

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
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <Form.Group as={Col} controlId="Email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        onChange={this.handleChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}/>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} md="4" controlId="validationFormik01">
                    <Form.Label>First name</Form.Label>
                    <Form.Control
                        type="text"
                        name="firstname"
                        onChange={this.handleChange}
                    />
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormik02">
                    <Form.Label>Last name</Form.Label>
                    <Form.Control
                        type="text"
                        name="lastname"
                        onChange={this.handleChange}
                    />

                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="4" controlId="validationFormikUsername">
                    <Form.Label>Username</Form.Label>
                    <InputGroup>
                        <InputGroup.Prepend>
                            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                        </InputGroup.Prepend>
                        <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            name="username"
                            onChange={this.handleChange}
                        />
                        <Form.Control.Feedback type="invalid">
                            {"errors.username"}
                        </Form.Control.Feedback>
                    </InputGroup>
                </Form.Group>
            </Form.Row>

            <Form.Row>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Nationality</Form.Label>
                    <NationalitySelect handleChange={this.handleChange}/>
                </Form.Group>

                <Form.Group as={Col} controlId="Phone">
                    <Form.Label>PhoneNumber</Form.Label>
                    <Form.Control
                        name="phone"
                        type="phoneNumber"
                        placeholder="Enter phone number"
                        onChange={this.handleChange}/>
                </Form.Group>
            </Form.Row>

            <Form.Group as={Row}>
                <Form.Label as="legend" column sm={2}>
                    Gender
                </Form.Label>
                <Col sm={10} onChange={this.handleChange}>
                    <Form.Check
                        type="radio"
                        label="Male"
                        value="m"
                        name="gender"
                        id="genderMale"
                    />
                    <Form.Check
                        type="radio"
                        label="Female"
                        value="f"
                        name="gender"
                        id="genderFemale"
                    />
                </Col>
            </Form.Group>

            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>;
    }
}