import axios from '../../axios'

export const authLogin = (data) => {
    return async dispatch => {
        try {
            let result = await axios.post('/users/login' , data)
            dispatch(setLogin(result.data))
            return {status: result.status}
        } catch (error) {
            console.log(error)
            return {
                status: error.response.status,
                message: error.response.data.message,
            }
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