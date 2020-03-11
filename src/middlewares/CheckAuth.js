import C from "../tools/Constants";

const checkAuth = (history) => store => next => action => {

    const result = next(action);
    let state = store.getState();
    console.log(history.location.pathname)
    if(history.location.pathname !== "/login"){
        if(state.StatusLogin === C.DISCONNECT){
            history.push('/login')
        }
    }
    return result;
};

export default checkAuth;