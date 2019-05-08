import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';
import Auth from './Auth';
import RandomImage from './RandomImage';

const reducers = combineReducers({
    routing: routerReducer,
    auth: Auth,
    randomImage: RandomImage
});

export default reducers;