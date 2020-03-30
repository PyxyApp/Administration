import React, { Component } from 'react';
import {Card, ProgressBar} from "react-bootstrap";
import SmallGraph from "../modules/Graph/SmallGraph";
import ComparisonTasksWeek from '../modules/ComparisonTasksWeek';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMars, faVenus} from "@fortawesome/free-solid-svg-icons";
import {firebaseConfig} from "../../../firebaseConfig";
import key from "../../../privateKey";
import * as jwt from "jsonwebtoken";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class WeekStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            load: false,
            tokenACP: "",
            nbUsers: "",
            nbMale: "",
            weekStats: []
        };
    }

    getStats = () => {
        fetch('https://us-central1-pyxy-f84e8.cloudfunctions.net/api/users/', {
            headers: {
                'Authorization': this.state.tokenACP
            },
        })
        .then(response => response.json())
            .then(json => {
                if(json){
                    const resultGender = json.filter(user => user.gender === 'm');
                    this.setState({
                        nbUsers: json.length,
                        nbMale: resultGender.length,
                        load: true
                    });
                }
            });
    };

    render(){
        if(!this.state.load){
            this.getStats();
        }
        return(
            <Card className={"mt-3"}>
                <Card.Header>
                    Trafic
                </Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Current week</Card.Subtitle>
                    <div className="d-flex flex-row justify-content-between">
                        <SmallGraph title={'New users'} type={'newUsers'}/>
                        <SmallGraph title={'Active users'} type={'activeUsers'}/>
                        <SmallGraph title={'List created'} type={'listCreated'}/>
                        <SmallGraph title={'Task created'} type={'taskCreated'}/>
                    </div>
                    <hr/>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column w-50">
                            <ComparisonTasksWeek/>
                        </div>
                        <div className="d-flex flex-column w-50 p-3">
                            <div className="p-1">
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                        <span>
                                            <FontAwesomeIcon icon={faVenus} /> Female</span>
                                    <span className="font-weight-bold">59%</span>
                                </Card.Subtitle>
                                <ProgressBar now="59" variant="warning" label="taskCreated" srOnly />
                            </div>
                            <div className="p-1">
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                        <span>
                                            <FontAwesomeIcon icon={faMars} /> Male</span>
                                    <span className="font-weight-bold">41%</span>
                                </Card.Subtitle>
                                <ProgressBar now="41" variant="warning" label="taskCreated" srOnly />
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default (WeekStatistics);