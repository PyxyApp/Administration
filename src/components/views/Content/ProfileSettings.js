import React, {Component} from 'react';
import {Button, Card, Form} from "react-bootstrap";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: [e.target.value]})
    };

    render() {
        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>My settings</Card.Header>
                    <Card.Body>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>My current email address</Form.Label>
                                <Form.Control name="email" type="email" placeholder="Enter email" onChange={this.handleChange}/>
                            </Form.Group>
                            <Form.Group controlId="formDisplayName">
                                <Form.Label>Display Name</Form.Label>
                                <Form.Control type="displayName" placeholder="Display Name" onChange={this.handleChange} />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default (Index);