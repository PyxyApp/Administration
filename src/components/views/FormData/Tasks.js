import React, {Component} from "react";
import {Form} from "react-bootstrap";
import routeAPI from "../../../tools/routeAPI";
import FieldText from "./FieldText";
import FooterForm from "./FooterForm";
import getToken from "../../../functions/getToken";
const token = getToken();

export default class Tasks extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: token,
            dataType: this.props.dataType,
            create: "POST",
            edit: "PUT",
            data: {"name": "", "description": "", "list": ""}
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
                            list: json.list,
                            name: json.name,
                            description: json.description
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
        let route = routeAPI + 'tasks/';
        if(id){
            route = routeAPI + 'tasks/' + id
        }
        fetch( route, {
            method: this.state[this.props.action],
            headers: {
                'Authorization': this.state.tokenACP,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: this.state.name,
                description: this.state.description,
                list: this.state.list
            })
        })
            .then(r => {
                console.log(r);
                this.setState({
                    toastMessage: 'The action was successfully completed',
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
                <FieldText defaultValue={this.state.data.name} title={"Name"} name={"name"} id={"name"} placeholder={"Visit the Taj Mahal"} type={'text'} handleChange={this.handleChange}/>
                <FieldText defaultValue={this.state.data.list} title={"list"} name={"list"} id={"list"} placeholder={"listId"} type={'text'} handleChange={this.handleChange}/>
            </Form.Row>

            <Form.Group controlId="exampleForm.ControlTextarea1">
                <Form.Label>Description</Form.Label>
                <Form.Control name="description" as="textarea" rows="3" onChange={this.handleChange} defaultValue={this.state.data.description}/>
            </Form.Group>

            {/*<Form.Row>*/}
            {/*    <Switch label={"Is Active ?"} id={"isActive"} name={"is_active"} handleChange={this.handleChange}/>*/}
            {/*</Form.Row>S*/}

            <FooterForm showT={this.props.showT} toastMessage={this.state.toastMessage} toastType={this.state.toastType}/>
        </Form>;
    }
}