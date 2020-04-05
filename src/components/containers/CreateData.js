import {connect} from "react-redux";
import CreateData from "../views/CreateData/CreateData";
import {pushRoute} from "../../redux/actions/PushRoute.action";

const mapDispatchToProps = {
    pushRoute
};

const mapStateToProps = state =>
    ({
        fetchLogin: state.fetchLogin,
        statusLogin: state.statusLogin,
        userSession: state.userSession
    });

const Container = connect(mapStateToProps, mapDispatchToProps)(CreateData);
export default Container;