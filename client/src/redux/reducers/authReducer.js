
const initialState = {
    status: false,
    user: null,
    role: null,
    subRole: null,
    token: null,
}

const authReducer = (state = initialState , action) => {
    switch (action.type) {
        case "AUTH_LOGIN":
            const {user , role , subRole , token} = action.payload
            let newState = {
                status: true,
                user,role,subRole,token
            }
            localStorage.setItem('tivash-user' , JSON.stringify(newState))
            return newState
        case "AUTH_LOGOUT":
            localStorage.removeItem('tivash-user')
            return {
                status: false,
                user: null,
                role: null,
                subRole: null,
                token: null
            }
        default:    
            return state
    }
}

export default authReducer