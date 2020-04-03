import React, {Component} from "react";
import {Card, ProgressBar} from "react-bootstrap";

const week = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const data = [
    {activeUsers: 2, taskFinished: 1},
    {activeUsers: 5, taskFinished: 3},
    {activeUsers: 4, taskFinished: 2},
    {activeUsers: 3, taskFinished: 4},
    {activeUsers: 4, taskFinished: 2},
    {activeUsers: 7, taskFinished: 2},
    {activeUsers: 6, taskFinished: 1},
];



class ComparisonTasksWeek extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return <div>
            {week.map((day, index) =>
                <div className={"mt-3"} key={index}>
                    <Card.Subtitle className="mb-2 text-muted d-flex justify-content-between">
                        <span>{day}</span>
                    </Card.Subtitle>
                    <ProgressBar now={data[index].activeUsers}  variant="primary" srOnly/>
                    <ProgressBar now={data[index].taskFinished} variant="danger" srOnly/>
                </div>)}
        </div>
    }
}
export default (ComparisonTasksWeek);