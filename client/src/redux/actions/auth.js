import axios from '../../axios'

export const authLogin = (data) => {
    return async dispatch => {
        try {
            let result = await axios.post('/users/login' , data)
            dispatch(setLogin(result.data))
            return result.status
            /* return axios.post('/users/login' , data)
                .then(result => {
                    dispatch(setLogin(result.data))
                    return result.status
                })
                .catch(err => console.log(err)) */
        } catch (error) {
            console.log(error)
        }
    }
}

export const setLogin = (data) => {
    const {user , role , subRole, token} = data
    return {
        type: "AUTH_LOGIN",
        payload: {user,role,subRole,token}
    }
}

export const setLogout = () => {
    return {
        type: "AUTH_LOGOUT",
    }
}