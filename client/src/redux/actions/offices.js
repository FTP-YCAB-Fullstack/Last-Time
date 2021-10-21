import axios from '../../axios'
import store from '../store/store'

let token = null
store.subscribe(() => {
    const auth = store.getState().auth
    token = auth.token
})

export const fetchListOffices = () => {
    return async dispatch => {
        try {
            let res = await axios.get('/offices', {headers: {token}})
            return dispatch(setListOffices(res.data))
        } catch (error) {
            console.log(error)
        }
    }
}

export const setListOffices = (payload) => {
    return {
        type: "OFFICE_FETCH_LIST",
        payload
    }
}