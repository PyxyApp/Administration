import * as firebase from "firebase";
import {history} from '../store/defaultStore';
import C from "../../tools/Constants";
import routeAPI from "../../tools/routeAPI";

export const onLogin = (login, password, token) => dispatch => {
    dispatch({type: C.FETCH_LOGIN});
    firebase.auth().signInWithEmailAndPassword(login, password)
        .then(r =>{
                fetch(routeAPI+r.user.uid, {
                    headers: {'Authorization': token},
                })
                    .then(response => response.json()).then(json => {
                        if(json){
                            if(json.acp.admin){
                                dispatch({ payload: json, type: C.SUCCESS_LOGIN });
                                history.push('/')
                            }else{
                                dispatch({type: C.FAIL_LOGIN});
                            }
                        }
                    })
            }
        ).catch(e => { dispatch({ type: C.FAIL_LOGIN, payload: e.message })})
};