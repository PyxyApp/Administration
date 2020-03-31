import React, { Component } from 'react';
import {Form, Button} from "react-bootstrap";
import {firebaseConfig} from '../../firebaseConfig'
import key from '../../privateKey';
import * as firebase from 'firebase/app';
import C from "../../tools/Constants";
const jwt = require('jsonwebtoken');
let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

firebase.initializeApp(firebaseConfig);

class login extends Component{

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            login: '',
            user: {},
            loading:true
        };
    }

    onChange = (e) => {
        e.preventDefault();
        if(e.target.id === 'formBasicEmail'){
            this.setState({login: e.target.value})
        }else{
            this.setState({password: e.target.value})
        }
    };

    onSubmit = (e) => {
      e.preventDefault();
        this.props.onLogin(this.state.login, this.state.password, this.state.tokenACP);
    };

    checkLogin = () => {
        if (this.props.statusLogin === C.FAIL_LOGIN) {
            console.error('FAIL')
        }
        if (this.props.statusLogin === C.SUCCESS_LOGIN) {
            console.log("login")
        }
    };

    render() {
        return (
            <main className={'page-login'}>
                <Form className={'form-login'} onSubmit={this.onSubmit}>
                    {this.checkLogin()}
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" onChange={this.onChange}/>
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" onChange={this.onChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </main>
        );
    }
}
export default (login);