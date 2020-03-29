import React, {Component} from 'react';
import Menu from "../containers/Menu";
import {Route} from "react-router-dom";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <div className="col-3">
                    <Menu />
                </div>
                <div className="col-8">
                    <Route exact path="/" component={""}/>
                </div>
            </div>
        )
    }
}
export default (Index);