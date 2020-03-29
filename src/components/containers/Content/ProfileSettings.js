import {connect} from "react-redux";
import ProfileSettings from "../../views/Content/ProfileSettings";
import {pushRoute} from "../../../redux/actions/PushRoute.action";

const mapDispatchToProps = {
    pushRoute
};

const mapStateToProps = state =>
    ({
        fetchLogin: state.fetchLogin,
        statusLogin: state.statusLogin,
        userSession: state.userSession
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(ProfileSettings);
export default Container;