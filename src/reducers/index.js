import userReducer from './userReducer';
import {combineReducers} from 'redux';

const rootReducer = combineReducers({
    dataUser: userReducer,
})

export default rootReducer;
