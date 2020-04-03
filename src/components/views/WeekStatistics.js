import React, { Component } from 'react';
import {Card, ProgressBar} from "react-bootstrap";
import SmallGraph from "./SmallGraph";
import ComparisonTasksWeek from './ComparisonTasksWeek';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMars, faVenus} from "@fortawesome/free-solid-svg-icons";
import {firebaseConfig} from "../../firebaseConfig";
import key from "../../privateKey";
import * as jwt from "jsonwebtoken";
import {routeAPI} from "../../index";

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
            nbRegisterThisWeek: "",
            nbMale: "",
            nbMalePercent: "",
            weekStats: [],
            weekTimestamp: ""
        };
        this.getWeekTimestamp();
    }

    getWeekTimestamp = () =>{
        let curr = new Date();
        let week = [];

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i;
            let day = new Date(curr.setDate(first));
            let timestamp = Date.parse(day);
            timestamp -= (curr.getMilliseconds() + (curr.getSeconds() * 1000) - 1000 + (curr.getMinutes() * 60 * 1000) + (curr.getHours() * 3600 * 1000) );
            // 601199
            timestamp /= 1000;
            // let newDay = new Date(timestamp);
            week.push({timestamp})
        }
        this.setState({
          weekTimestamp: {start: week[0], end: week[0]+601199}
        })
    };

    getStats = () => {
        fetch(routeAPI + 'users/', {
            headers: {
                'Authorization': this.state.tokenACP
            },
        })
        .then(response => response.json())
            .then(json => {
                if(json){
                    const registerByWeek = json.filter(user => (user.date.date_created._seconds <= this.state.weekTimeStamp.end))
                        .filter(user => (user.date.date_created._seconds >= this.state.weekTimeStamp.start));
                    const ActiveByWeek = json.filter(user => (user.date.last_login._seconds <= this.state.weekTimeStamp.end))
                        .filter(user => (user.date.last_login._seconds >= this.state.weekTimeStamp.start));
                    const resultGender = json.filter(user => user.gender === 'm');
                    this.setState({
                        nbUsers: json.length,
                        nbMale: resultGender.length,
                        nbRegisterThisWeek: registerByWeek.length,
                        nbActiveThisWeek: ActiveByWeek.length,
                        load: true,
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
                                    <span className="font-weight-bold">{100 -((this.state.nbMale * 100) / this.state.nbUsers)}%</span>
                                </Card.Subtitle>
                                <ProgressBar now={100 -((this.state.nbMale * 100) / this.state.nbUsers)} variant="warning" label="taskCreated" srOnly />
                            </div>
                            <div className="p-1">
                                <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                                        <span>
                                            <FontAwesomeIcon icon={faMars} /> Male</span>
                                    <span className="font-weight-bold">{(this.state.nbMale * 100) / this.state.nbUsers}%</span>
                                </Card.Subtitle>
                                <ProgressBar now={(this.state.nbMale * 100) / this.state.nbUsers} variant="warning" label="taskCreated" srOnly />
                            </div>
                        </div>
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default (WeekStatistics);