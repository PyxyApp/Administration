import React, {Component} from 'react';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.location.pathname
        };
    }

    render() {
        return (
            <div className="content col-10">
                Dashboard
            </div>
        )
    }
}
export default (Index);