import React, {Component} from "react";
import {Form} from "react-bootstrap";
import {country} from '../../../tools/Nationalities';

export default class NationalitySelect extends Component {

    render () {

        return (
            <Form.Control as="select" defaultValue="Choose..." name={'nat'} onChange={this.props.handleChange}>
                    {country.map((country, index) => {
                            return <option value={country.value} key={index}>{country.name}</option>
                    })}
            </Form.Control>
        )
    }
}