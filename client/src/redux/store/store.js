import {createStore , combineReducers, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import adminCountReducer from '../reducers/adminCountReducer';
import authReducer from '../reducers/authReducer';
import officesReducer from '../reducers/officesReducer';
import storeDeleteReducer from '../reducers/storeDelete';
import paginationReducer from '../reducers/paginationReducer'
import fromHomeReducer from '../reducers/fromHomeReducer';

const composedEnhancer = composeWithDevTools(applyMiddleware(thunk))

const store = createStore(
    combineReducers({
        auth: authReducer,
        adminCount:adminCountReducer,
        offices: officesReducer,
        delete: storeDeleteReducer,
        pagination: paginationReducer,
        fromHome: fromHomeReducer,
    }),
    composedEnhancer
)

export default store