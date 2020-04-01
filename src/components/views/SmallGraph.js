import React, { Component } from 'react';
import {Card} from "react-bootstrap";
import {Line, LineChart, Tooltip, XAxis} from "recharts";

const data = [
    {name: 'Monday', "New user": 1},
    {name: 'Tuesday', "New user": 3},
    {name: 'Wednesday', "New user": 2},
    {name: 'Thursday', "New user": 4},
    {name: 'Friday', "New user": 2},
    {name: 'Saturday', "New user": 2},
    {name: 'Sunday', "New user": 1},
];

class SmallGraph extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    totalData = () => {
        let result = 0;
        for(let i=0; i<data.length; i++){
            result += data[i]["New user"];
        }
        return result;
    };

    switchColor = (type) =>{
      switch (type) {
          case "newUsers":
              return "#63c2de";
          case "activeUsers":
              return "#f86c6b";
          case "listCreated":
              return "#ffc107";
          case "taskCreated":
              return "#4dbd74";
          default:
              return "#63c2de"
      }
    };

    render(){
        return(
            <Card className={'d-flex flex-row smallGraph' + " "+this.props.type}>
                <div className={'flex-column'}>
                    <Card.Subtitle>{this.props.title}</Card.Subtitle>
                    <h5>{this.totalData()}</h5>
                </div>
                <LineChart width={150} height={50} data={data}>
                    <XAxis hide dataKey="name" />
                    <Tooltip />
                    <Line type="monotone" dataKey="New user" stroke={this.switchColor(this.props.type)} strokeWidth={2} dot={false}/>
                </LineChart>
            </Card>
        )
    }
}
export default (SmallGraph);