import React, {Component} from "react";
import {Col, Form} from "react-bootstrap";
import {country} from '../../../tools/Nationalities';

export default class FieldText extends Component {

    render () {

        return <Form.Group as={Col} controlId={this.props.id}>
                    <Form.Label>{this.props.title}</Form.Label>
                    <Form.Control
                        name={this.props.name}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        onChange={this.handleChange}/>
                </Form.Group>
    }
}