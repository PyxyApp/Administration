import React, {Component} from "react";
import {Form} from "react-bootstrap";
import {routeAPI} from "../../../index";
import FieldText from "./FieldText";
import FooterForm from "./FooterForm";
import Switch from "./Switch";

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
        fetch(routeAPI + 'lists/', {
            method: "POST",
            headers: {
                'Authorization': this.state.tokenACP,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: this.state.title,
                user: this.state.userId,
                category: this.state.categoryId,
                is_private: this.state.is_private,
                is_active: this.state.is_active,
            })
        })
            .then(r => {
                if(r.ok){
                    this.setState({
                        toastMessage: 'List created with success !',
                        toastType: 'success'
                    })
                }else{
                    this.setState({
                        toastMessage: 'An error occurred while creating the list: ' + e.message,
                        toastType: 'error'
                    });
                }
            })
            .catch(e => {
                this.setState({
                    toastMessage: 'An error occurred while creating the list: ' + e.message,
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
        });
        console.log(this.state);
    };

    render() {
        console.log(this.state);
        return <Form onSubmit={this.handleSubmit}>
            <Form.Row>
                <FieldText title={"Title"} name={"title"} id={"title"} placeholder={"My first list"} type={'text'} handleChange={this.handleChange}/>
                <FieldText title={"User"} name={"userId"} id={"userId"} placeholder={"user"} type={'text'} handleChange={this.handleChange}/>
                <FieldText title={"Category"} name={"categoryId"} id={"categoryId"} placeholder={"category"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Row>
                <Switch label={"Is Active ?"} id={"isActive"} name={"is_active"} handleChange={this.handleChange}/>
                <Switch label={"Is Private ?"} id={"isPrivate"} name={"is_private"} handleChange={this.handleChange}/>
            </Form.Row>

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}