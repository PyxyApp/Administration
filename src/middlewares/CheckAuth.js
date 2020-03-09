const checkAuth = (history) => store => next => action => {

    let result;

    result = next(action);
    let state = store.getState();
    if(history.location.pathname !== "/login"){
        if(state.statusLogin === "DISCONNECT"){
            history.push('/login')
        }
    }
    return result;

};

export default checkAuth;