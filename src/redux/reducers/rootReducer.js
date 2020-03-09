import {combineReducers} from 'redux'
import { connectRouter } from 'connected-react-router'
import { FetchLogin } from './FetchLogin.reducer'
import { StatusLogin } from './StatusLogin.reducer'
import { UserSession } from './UserSession.reducer'
import { Push } from './Push.reducer'

export default (history) => combineReducers({
    FetchLogin,
    StatusLogin,
    UserSession,
    router: connectRouter(history),
    Push,
})