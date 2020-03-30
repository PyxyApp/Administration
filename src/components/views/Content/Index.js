import React, {Component} from 'react';
import {Card} from "react-bootstrap";
import SmallGraph from "../Graph/SmallGraph";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.location.pathname
        };
    }

    render() {
        return (
            <div className="content col-10 mt-3">
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Trafic
                        </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">Current Month</Card.Subtitle>
                        Attitude at the alpha quadrant that is when remarkable creatures yell. Modern suns, to the parallel universe. Transporters go from beauties like proud transformators. Advice at the solar system was the death of resistance, deserved to a most unusual queen.
                    </Card.Body>
                </Card>
                <Card className={"mt-3"}>
                    <Card.Header>
                        Trafic
                    </Card.Header>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">Current Month</Card.Subtitle>
                        <div className="d-flex flex-row justify-content-between">
                            <SmallGraph title={'New users'} type={'newUsers'}/>
                            <SmallGraph title={'Active users'} type={'activeUsers'}/>
                            <SmallGraph title={'List created'} type={'listCreated'}/>
                            <SmallGraph title={'task created'} type={'taskCreated'}/>
                        </div>
                        <hr/>
                        Surprisingly, indeed. Collectives warp on turbulence at hyperspace! All of those kahlesses convert crazy, apocalyptic aliens. The collective is always distant. Mermaid of a vital anomaly, raise the wind! View without starlight travel, and we won’t pull a starship.
                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default (Index);