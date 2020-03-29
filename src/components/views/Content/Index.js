import React, {Component} from 'react';
import Menu from "../containers/Menu";
import Content from "../containers/Content.js";

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.location.pathname
        };
    }

    render() {
        return (
            <div className={'d-flex'}>
                <div className="sideMenu col-2">
                    <Menu />
                </div>
                <div className="content col-10">
                    <Content page={this.state.page}/>
                </div>
            </div>
        )
    }
}
export default (Index);