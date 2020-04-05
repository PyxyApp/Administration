import React, {Component} from "react";
import {Col, Form} from "react-bootstrap";

export default class Switch extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render () {

        return (
            <Form.Group as={Col}>
                {/* Le checkbox bug */}
                <Form.Label sm={2}>
                    {this.props.label}
                </Form.Label>
                <Col onChange={this.handleChange}>
                    <Form.Check
                        type="radio"
                        label="True"
                        value="true"
                        name={this.props.name}
                        id={this.props.id + "true"}
                    />
                    <Form.Check
                        type="radio"
                        label="False"
                        value="false"
                        name={this.props.name}
                        id={this.props.id + "false"}
                    />
                </Col>
            </Form.Group>
        )
    }
}