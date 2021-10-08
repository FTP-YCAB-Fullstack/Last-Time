import {createStore , combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(
    combineReducers({
        user: userReducer
    }),
    composedEnhancer
)

export default store