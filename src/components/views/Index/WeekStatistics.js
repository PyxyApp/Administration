import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import SmallGraph from "./SmallGraph";
import ComparisonTasksWeek from './ComparisonTasksWeek';
import {firebaseConfig} from "../../../firebaseConfig";
import key from "../../../privateKey";
import * as jwt from "jsonwebtoken";
import {routeAPI} from "../../../index";
import Loading from "../Loading";
import GenderStatistics from "./GenderStatistics";

let privateKey = firebaseConfig.projectId+key.author+key.privateKey;

jwt.sign({ AdminControlPanel: true }, privateKey, function(err, token) {
    this.setState({tokenACP: token}).catch(err)(console.error(err.message));
});

class WeekStatistics extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            apiLoaded: false,
            tokenACP: "",
            nbUsers: "",
            nbMale: "",
            weekStats: [{"name": "Monday"}, {"name": "Tuesday"}, {"name": "Wednesday"}, {"name": "Thursday"}, {"name": "Friday"}, {"name": "Saturday"}, {"name": "Sunday"}],
            weekTimestamp: "",
            users: [],
            tasks: [],
            lists: [],
        };
    }

    async componentDidMount() {
        await fetch(routeAPI + 'users/', {
            headers: {
                'Authorization': this.state.tokenACP
            },
        })
        .then(response => response.json())
            .then(json => {
                if(json){
                    this.setState({
                        nbUsers: json.length,
                        users: json
                    });
                }
            })
            .catch(e =>{
                console.log(e)
            });
        await fetch(routeAPI + 'tasks/', {
            headers: {
                'Authorization': this.state.tokenACP
            },
        })
            .then(response => response.json())
            .then(json => {
                if(json){
                    this.setState({
                        tasks: json
                    });
                }
            })
            .catch(e =>{
                console.log(e)
            });
        await fetch(routeAPI + 'lists/', {
            headers: {
                'Authorization': this.state.tokenACP
            },
        })
            .then(response => response.json())
            .then(json => {
                if(json){
                    this.setState({
                        lists: json,
                        apiLoaded: true
                    });
                }
            })
            .catch(e =>{
                console.log(e)
            })
    }

    getStats = () =>{
        let curr = new Date();
        let week = [];

        for (let i = 1; i <= 7; i++) {
            let first = curr.getDate() - curr.getDay() + i;
            let day = new Date(curr.setDate(first));
            let timestamp = Date.parse(day);
            timestamp -= (curr.getMilliseconds() + (curr.getSeconds() * 1000) - 1000 + (curr.getMinutes() * 60 * 1000) + (curr.getHours() * 3600 * 1000) );
            timestamp /= 1000;
            let endTimestamp = timestamp + 24 * 3600 - 1;
            week.push({start: timestamp, end: endTimestamp});
        }
        for(let i=0; i<=6; i++){
            const activeUsersByDay = this.state.users.filter(user => (user.date.last_login._seconds <= week[i].end))
                .filter(user => (user.date.last_login._seconds >= week[i].start));
            const newUsersByDay = this.state.users.filter(user => (user.date.date_created._seconds <= week[i].end))
                .filter(user => (user.date.date_created._seconds >= week[i].start));
            const tasksDoneByDay = this.state.tasks.filter(task => task.date.date_done ? (task.date.date_done._seconds <= week[i].end)
                .filter(task => (task.date.date_done._seconds >= week[i].start)) : 0);
            const newTasksByDay = this.state.tasks.filter(task => (task.date.date_created._seconds <= week[i].end))
                .filter(task => (task.date.date_created._seconds >= week[i].start));
            const newListsByDay = this.state.lists.filter(list => (list.date.date_created._seconds <= week[i].end))
                .filter(list => (list.date.date_created._seconds >= week[i].start));
            this.state.weekStats[i].activeUsers = activeUsersByDay.length;
            this.state.weekStats[i].newUsers = newUsersByDay.length;
            this.state.weekStats[i].newTasks = newTasksByDay.length;
            this.state.weekStats[i].newLists = newListsByDay.length;
            this.state.weekStats[i].tasksDone = tasksDoneByDay.length;
        }

        console.log(this.state);
        const resultGender = this.state.users.filter(user => user.gender === 'm');
        this.setState({
            nbUsers: this.state.users.length,
            nbMale: resultGender.length,
            isLoaded: true
        })
    };

    render(){
        if(this.state.apiLoaded){
            if(!this.state.isLoaded){
                this.getStats();
                console.log("here");
            }
        }
        return(
            <Card className={"mt-3"}>
                <Card.Header>Trafic this week</Card.Header>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">Current week</Card.Subtitle>
                        {this.state.weekStats[0].activeUsers ? (
                            <div className="d-flex flex-row justify-content-between">
                                <SmallGraph title={'New users'} type={'newUsers'} stats={this.state.weekStats}/>
                                <SmallGraph title={'Active users'} type={'activeUsers'} stats={this.state.weekStats}/>
                                <SmallGraph title={'List created'} type={'newLists'} stats={this.state.weekStats}/>
                                <SmallGraph title={'Task created'} type={'newTasks'} stats={this.state.weekStats}/>
                            </div>
                        ) : (<Loading />)}
                    <hr/>
                    <div className="d-flex flex-row">
                        <div className="d-flex flex-column w-50">
                            <ComparisonTasksWeek stats={this.state.weekStats} statsGlobalUsers={this.state.users} statsGlobalTasks={this.state.tasks}/>
                        </div>
                        {this.state.nbUsers ? ( <GenderStatistics nbUsers={this.state.nbUsers} nbMale={this.state.nbMale}/>)
                            : (<Loading />)}
                    </div>
                </Card.Body>
            </Card>
        )
    }
}
export default (WeekStatistics);