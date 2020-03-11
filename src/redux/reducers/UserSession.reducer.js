import C from "../../tools/Constants";

export const UserSession = (userSession = C.DISCONNECT, action = {}) =>{
    switch (action.type){
        case C.SUCCESS_LOGIN:
            /* TODO SetState */
            return action.payload;
        case C.DISCONNECT:
            return userSession;
        case C.FAIL_LOGIN:
            return userSession;
        default:
            return userSession
    }
};