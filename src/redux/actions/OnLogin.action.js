import * as firebase from "firebase";
import {history} from '../store/defaultStore';
import C from "../../tools/Constants";
require("firebase/auth");
require("firebase/firestore");

export const onLogin = (login, password, token) => dispatch => {
    dispatch({
        type: C.FETCH_LOGIN,
    });
    firebase.auth().signInWithEmailAndPassword(login, password)
        .then(r =>{
                fetch('https://us-central1-pyxy-f84e8.cloudfunctions.net/api/users/'+r.user.uid, {
                    headers: {
                        'Authorization': token
                    },
                })
                    .then(response => response.json())
                    .then(json => {
                        if(json){
                            if(json.acp.admin){
                                dispatch({
                                    payload: json,
                                    type: C.SUCCESS_LOGIN,
                                });
                                history.push('/')
                            }else{
                                dispatch({
                                    type: C.FAIL_LOGIN,
                                });
                            }
                        }
                    })
            }
        );
};