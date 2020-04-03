import React, {Component} from 'react';
import {Button, Card, Col, Form, InputGroup, Row} from "react-bootstrap";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import Toasts from "./Toasts";
import {routeAPI} from "../../index";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class CreateUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tokenACP: "",
            showToast: false,
            toastMessage: '',
            toastType: ''
        };
    }

    handleClose = () => { this.setState({isShown: false})};
    showToasts = () => {this.setState({showToast: true})};
    closeToast = () => {this.setState({showToast: false})};
    delayToHide = () => {setTimeout(this.closeToast, 10000)};

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
        console.log(this.state);
        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Header>
                        CreateData : DATA
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        <Form onSubmit={this.handleSubmit}>
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
                                    <Form.Control as="select" defaultValue="Choose..." name={'nat'} onChange={this.handleChange}>
                                        <option value="AF">Afghanistan</option>
                                        <option value="AX">Åland Islands</option>
                                        <option value="AL">Albania</option>
                                        <option value="DZ">Algeria</option>
                                        <option value="AS">American Samoa</option>
                                        <option value="AD">Andorra</option>
                                        <option value="AO">Angola</option>
                                        <option value="AI">Anguilla</option>
                                        <option value="AQ">Antarctica</option>
                                        <option value="AG">Antigua and Barbuda</option>
                                        <option value="AR">Argentina</option>
                                        <option value="AM">Armenia</option>
                                        <option value="AW">Aruba</option>
                                        <option value="AU">Australia</option>
                                        <option value="AT">Austria</option>
                                        <option value="AZ">Azerbaijan</option>
                                        <option value="BS">Bahamas</option>
                                        <option value="BH">Bahrain</option>
                                        <option value="BD">Bangladesh</option>
                                        <option value="BB">Barbados</option>
                                        <option value="BY">Belarus</option>
                                        <option value="BE">Belgium</option>
                                        <option value="BZ">Belize</option>
                                        <option value="BJ">Benin</option>
                                        <option value="BM">Bermuda</option>
                                        <option value="BT">Bhutan</option>
                                        <option value="BO">Bolivia, Plurinational State of</option>
                                        <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                        <option value="BA">Bosnia and Herzegovina</option>
                                        <option value="BW">Botswana</option>
                                        <option value="BV">Bouvet Island</option>
                                        <option value="BR">Brazil</option>
                                        <option value="IO">British Indian Ocean Territory</option>
                                        <option value="BN">Brunei Darussalam</option>
                                        <option value="BG">Bulgaria</option>
                                        <option value="BF">Burkina Faso</option>
                                        <option value="BI">Burundi</option>
                                        <option value="KH">Cambodia</option>
                                        <option value="CM">Cameroon</option>
                                        <option value="CA">Canada</option>
                                        <option value="CV">Cape Verde</option>
                                        <option value="KY">Cayman Islands</option>
                                        <option value="CF">Central African Republic</option>
                                        <option value="TD">Chad</option>
                                        <option value="CL">Chile</option>
                                        <option value="CN">China</option>
                                        <option value="CX">Christmas Island</option>
                                        <option value="CC">Cocos (Keeling) Islands</option>
                                        <option value="CO">Colombia</option>
                                        <option value="KM">Comoros</option>
                                        <option value="CG">Congo</option>
                                        <option value="CD">Congo, the Democratic Republic of the</option>
                                        <option value="CK">Cook Islands</option>
                                        <option value="CR">Costa Rica</option>
                                        <option value="CI">Côte d'Ivoire</option>
                                        <option value="HR">Croatia</option>
                                        <option value="CU">Cuba</option>
                                        <option value="CW">Curaçao</option>
                                        <option value="CY">Cyprus</option>
                                        <option value="CZ">Czech Republic</option>
                                        <option value="DK">Denmark</option>
                                        <option value="DJ">Djibouti</option>
                                        <option value="DM">Dominica</option>
                                        <option value="DO">Dominican Republic</option>
                                        <option value="EC">Ecuador</option>
                                        <option value="EG">Egypt</option>
                                        <option value="SV">El Salvador</option>
                                        <option value="GQ">Equatorial Guinea</option>
                                        <option value="ER">Eritrea</option>
                                        <option value="EE">Estonia</option>
                                        <option value="ET">Ethiopia</option>
                                        <option value="FK">Falkland Islands (Malvinas)</option>
                                        <option value="FO">Faroe Islands</option>
                                        <option value="FJ">Fiji</option>
                                        <option value="FI">Finland</option>
                                        <option value="FR">France</option>
                                        <option value="GF">French Guiana</option>
                                        <option value="PF">French Polynesia</option>
                                        <option value="TF">French Southern Territories</option>
                                        <option value="GA">Gabon</option>
                                        <option value="GM">Gambia</option>
                                        <option value="GE">Georgia</option>
                                        <option value="DE">Germany</option>
                                        <option value="GH">Ghana</option>
                                        <option value="GI">Gibraltar</option>
                                        <option value="GR">Greece</option>
                                        <option value="GL">Greenland</option>
                                        <option value="GD">Grenada</option>
                                        <option value="GP">Guadeloupe</option>
                                        <option value="GU">Guam</option>
                                        <option value="GT">Guatemala</option>
                                        <option value="GG">Guernsey</option>
                                        <option value="GN">Guinea</option>
                                        <option value="GW">Guinea-Bissau</option>
                                        <option value="GY">Guyana</option>
                                        <option value="HT">Haiti</option>
                                        <option value="HM">Heard Island and McDonald Islands</option>
                                        <option value="VA">Holy See (Vatican City State)</option>
                                        <option value="HN">Honduras</option>
                                        <option value="HK">Hong Kong</option>
                                        <option value="HU">Hungary</option>
                                        <option value="IS">Iceland</option>
                                        <option value="IN">India</option>
                                        <option value="ID">Indonesia</option>
                                        <option value="IR">Iran, Islamic Republic of</option>
                                        <option value="IQ">Iraq</option>
                                        <option value="IE">Ireland</option>
                                        <option value="IM">Isle of Man</option>
                                        <option value="IL">Israel</option>
                                        <option value="IT">Italy</option>
                                        <option value="JM">Jamaica</option>
                                        <option value="JP">Japan</option>
                                        <option value="JE">Jersey</option>
                                        <option value="JO">Jordan</option>
                                        <option value="KZ">Kazakhstan</option>
                                        <option value="KE">Kenya</option>
                                        <option value="KI">Kiribati</option>
                                        <option value="KP">Korea, Democratic People's Republic of</option>
                                        <option value="KR">Korea, Republic of</option>
                                        <option value="KW">Kuwait</option>
                                        <option value="KG">Kyrgyzstan</option>
                                        <option value="LA">Lao People's Democratic Republic</option>
                                        <option value="LV">Latvia</option>
                                        <option value="LB">Lebanon</option>
                                        <option value="LS">Lesotho</option>
                                        <option value="LR">Liberia</option>
                                        <option value="LY">Libya</option>
                                        <option value="LI">Liechtenstein</option>
                                        <option value="LT">Lithuania</option>
                                        <option value="LU">Luxembourg</option>
                                        <option value="MO">Macao</option>
                                        <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                        <option value="MG">Madagascar</option>
                                        <option value="MW">Malawi</option>
                                        <option value="MY">Malaysia</option>
                                        <option value="MV">Maldives</option>
                                        <option value="ML">Mali</option>
                                        <option value="MT">Malta</option>
                                        <option value="MH">Marshall Islands</option>
                                        <option value="MQ">Martinique</option>
                                        <option value="MR">Mauritania</option>
                                        <option value="MU">Mauritius</option>
                                        <option value="YT">Mayotte</option>
                                        <option value="MX">Mexico</option>
                                        <option value="FM">Micronesia, Federated States of</option>
                                        <option value="MD">Moldova, Republic of</option>
                                        <option value="MC">Monaco</option>
                                        <option value="MN">Mongolia</option>
                                        <option value="ME">Montenegro</option>
                                        <option value="MS">Montserrat</option>
                                        <option value="MA">Morocco</option>
                                        <option value="MZ">Mozambique</option>
                                        <option value="MM">Myanmar</option>
                                        <option value="NA">Namibia</option>
                                        <option value="NR">Nauru</option>
                                        <option value="NP">Nepal</option>
                                        <option value="NL">Netherlands</option>
                                        <option value="NC">New Caledonia</option>
                                        <option value="NZ">New Zealand</option>
                                        <option value="NI">Nicaragua</option>
                                        <option value="NE">Niger</option>
                                        <option value="NG">Nigeria</option>
                                        <option value="NU">Niue</option>
                                        <option value="NF">Norfolk Island</option>
                                        <option value="MP">Northern Mariana Islands</option>
                                        <option value="NO">Norway</option>
                                        <option value="OM">Oman</option>
                                        <option value="PK">Pakistan</option>
                                        <option value="PW">Palau</option>
                                        <option value="PS">Palestinian Territory, Occupied</option>
                                        <option value="PA">Panama</option>
                                        <option value="PG">Papua New Guinea</option>
                                        <option value="PY">Paraguay</option>
                                        <option value="PE">Peru</option>
                                        <option value="PH">Philippines</option>
                                        <option value="PN">Pitcairn</option>
                                        <option value="PL">Poland</option>
                                        <option value="PT">Portugal</option>
                                        <option value="PR">Puerto Rico</option>
                                        <option value="QA">Qatar</option>
                                        <option value="RE">Réunion</option>
                                        <option value="RO">Romania</option>
                                        <option value="RU">Russian Federation</option>
                                        <option value="RW">Rwanda</option>
                                        <option value="BL">Saint Barthélemy</option>
                                        <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                        <option value="KN">Saint Kitts and Nevis</option>
                                        <option value="LC">Saint Lucia</option>
                                        <option value="MF">Saint Martin (French part)</option>
                                        <option value="PM">Saint Pierre and Miquelon</option>
                                        <option value="VC">Saint Vincent and the Grenadines</option>
                                        <option value="WS">Samoa</option>
                                        <option value="SM">San Marino</option>
                                        <option value="ST">Sao Tome and Principe</option>
                                        <option value="SA">Saudi Arabia</option>
                                        <option value="SN">Senegal</option>
                                        <option value="RS">Serbia</option>
                                        <option value="SC">Seychelles</option>
                                        <option value="SL">Sierra Leone</option>
                                        <option value="SG">Singapore</option>
                                        <option value="SX">Sint Maarten (Dutch part)</option>
                                        <option value="SK">Slovakia</option>
                                        <option value="SI">Slovenia</option>
                                        <option value="SB">Solomon Islands</option>
                                        <option value="SO">Somalia</option>
                                        <option value="ZA">South Africa</option>
                                        <option value="GS">South Georgia and the South Sandwich Islands</option>
                                        <option value="SS">South Sudan</option>
                                        <option value="ES">Spain</option>
                                        <option value="LK">Sri Lanka</option>
                                        <option value="SD">Sudan</option>
                                        <option value="SR">Suriname</option>
                                        <option value="SJ">Svalbard and Jan Mayen</option>
                                        <option value="SZ">Swaziland</option>
                                        <option value="SE">Sweden</option>
                                        <option value="CH">Switzerland</option>
                                        <option value="SY">Syrian Arab Republic</option>
                                        <option value="TW">Taiwan, Province of China</option>
                                        <option value="TJ">Tajikistan</option>
                                        <option value="TZ">Tanzania, United Republic of</option>
                                        <option value="TH">Thailand</option>
                                        <option value="TL">Timor-Leste</option>
                                        <option value="TG">Togo</option>
                                        <option value="TK">Tokelau</option>
                                        <option value="TO">Tonga</option>
                                        <option value="TT">Trinidad and Tobago</option>
                                        <option value="TN">Tunisia</option>
                                        <option value="TR">Turkey</option>
                                        <option value="TM">Turkmenistan</option>
                                        <option value="TC">Turks and Caicos Islands</option>
                                        <option value="TV">Tuvalu</option>
                                        <option value="UG">Uganda</option>
                                        <option value="UA">Ukraine</option>
                                        <option value="AE">United Arab Emirates</option>
                                        <option value="GB">United Kingdom</option>
                                        <option value="US">United States</option>
                                        <option value="UM">United States Minor Outlying Islands</option>
                                        <option value="UY">Uruguay</option>
                                        <option value="UZ">Uzbekistan</option>
                                        <option value="VU">Vanuatu</option>
                                        <option value="VE">Venezuela, Bolivarian Republic of</option>
                                        <option value="VN">Viet Nam</option>
                                        <option value="VG">Virgin Islands, British</option>
                                        <option value="VI">Virgin Islands, U.S.</option>
                                        <option value="WF">Wallis and Futuna</option>
                                        <option value="EH">Western Sahara</option>
                                        <option value="YE">Yemen</option>
                                        <option value="ZM">Zambia</option>
                                        <option value="ZW">Zimbabwe</option>
                                    </Form.Control>
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
                        </Form>
                    </Card.Body>
                </Card>
                <Toasts showT={this.state.showToast} message={this.state.toastMessage} type={this.state.toastType}/>
            </div>
        )
    }
}
export default (CreateUser);