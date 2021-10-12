import axios from '../../axios'
import store from '../store/store'

let token = null
store.subscribe(() => {
    const auth = store.getState().auth
    token = auth.token
})

export const fetchUsersCount = () => {
    return async dispatch => {
        try {
            let res = await axios.get('/users/roles/count', {headers: {token}})
            return dispatch(setUsersCount(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const setUsersCount = (payload) => {
    return {
        type: "ADMIN_COUNT_USERS",
        payload: payload
    }
}

export const fetchTransactionCount = () => {
    return async dispatch => {
        try {
            let res = await axios.get('/transactions/status/count', {headers: {token}})
            return dispatch(setTransactionsCount(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}


export const setTransactionsCount = (payload) => {
    return {
        type: "ADMIN_COUNT_TRANSACTIONS",
        payload: payload
    }
}