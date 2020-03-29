import {connect} from "react-redux";
import Content from "../views/Content.js";
import {pushRoute} from "../../redux/actions/PushRoute.action";

const mapDispatchToProps = {
        pushRoute
    };

const mapStateToProps = state =>
    ({
        fetchLogin: state.fetchLogin,
        statusLogin: state.statusLogin,
        userSession: state.userSession,
    });


const Container = connect(mapStateToProps, mapDispatchToProps)(Content);
export default Container;