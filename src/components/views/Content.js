import React, {Component} from 'react';
import ProfileSettings from '../containers/Content/ProfileSettings';

class Index extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: this.props.page
        };
    }

    switchComponent = (page) => {
      switch (page) {
          case "dashboard":
              return (<ProfileSettings />);
          case "/profile/settings":
              return (<ProfileSettings />);
          default:
              return (<ProfileSettings />);
      }
    };

    render() {
        return (
            <div>
                {this.switchComponent(this.state.page)}
            </div>
        )
    }
}
export default (Index);