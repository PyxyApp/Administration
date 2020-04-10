import React, {Component} from "react";
import {Form} from "react-bootstrap";
import routeAPI from "../../../tools/routeAPI";
import FieldText from "./FieldText";
import NationalitySelect from "./NationalitySelect";
import GenderRadioButton from "./GenderRadioButton";
import FooterForm from "./FooterForm";
import getToken from "../../../functions/getToken";
import Switch from "./Switch";
const token = getToken();

export default class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: token,
            dataType: this.props.dataType,
            create: "POST",
            edit: "PUT",
            data: {"nat": "", "name": {"firstname": "", "lastname": "", "username": ""}, "email": "", "gender": "", "deactivate": false, "password": "", "phone": ""},
            deactivate: true,
            admin: false,
        };
    }

    async componentDidMount() {
        if(this.props.action === 'edit'){
            await fetch(routeAPI + this.state.dataType + "/" + this.props.id, {
                headers: { 'Authorization': this.state.tokenACP },
            }).then(response => response.json())
                .then(json => {
                    if(json){
                        this.setState({
                            data: json,
                            apiLoaded: true,
                            email: json.email,
                            firstname: json.name.firstname,
                            lastname: json.name.lastname,
                            username: json.name.username,
                            deactivate: json.is_deactivate,
                            admin: json.admin,
                            gender: json.gender,
                            nat: json.nat,
                        });
                    }
                }).catch(e => {
                    console.log(e.code)
                    console.log(e.message)
                })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.id;
        let route = routeAPI + 'users/';
        if(id){
            route = routeAPI + 'users/' + id
        }
        fetch( route, {
            method: this.state[this.props.action],
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
                is_deactivate: this.state.deactivate,
                admin: this.state.admin,
                gender: this.state.gender,
                phone: this.state.phone,
            })
        })
            .then(r => {
                if(r.ok){
                    this.setState({
                        toastMessage: 'The action was successfully completed',
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
        if(e.target.type === "checkbox"){
            this.setState({
                [e.target.name]: e.target.checked
            });
        }else{
            this.setState({
                [e.target.name]: e.target.value
            });
        }
    };

    render() {
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText defaultValue={this.state.data.email} title={"Email"} name={"email"} id={"email"} placeholder={"john.doe@example.com"} type={'email'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.password} title={"Password"} name={"password"} id={"password"} placeholder={"*******"} type={'password'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Row>
                <FieldText defaultValue={this.state.data.name.firstname} title={"First name"} name={"firstname"} id={"firstname"} placeholder={"John"} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.name.lastname} title={"Last name"} name={"lastname"} id={"lastname"} placeholder={"Doe"} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.name.username} title={"Username"} name={"username"} id={"username"} placeholder={"JohnDoe"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Row>
                <NationalitySelect defaultValue={this.state.data.nat} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.phone} title={"Phone number"} name={"phone"} id={"phone"} placeholder={"3630"} type={'number'} handleChange={this.handleChange}/>
            </Form.Row>


            <Form.Row>
                <GenderRadioButton handleChange={this.handleChange}/>
                <Switch label={"Is Deactivate ?"} id={"isDeactivate"} name={"deactivate"} handleChange={this.handleChange} checked={this.state.deactivate}/>
                <Switch label={"Is Admin ?"} id={"admin"} name={"admin"} handleChange={this.handleChange} checked={this.state.admin}/>
            </Form.Row>

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}