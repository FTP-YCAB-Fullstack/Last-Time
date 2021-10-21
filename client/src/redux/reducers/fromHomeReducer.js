const initialState = {
    status: true,
    path: null
}

const fromHomeReducer = (state = initialState, action) => {
    switch (action.type) {
        case "FROM_HOME_TRUE":
            localStorage.setItem('status-from-home' , true)
            return {...state , status: true}
        case "FROM_HOME_FALSE":
            localStorage.setItem('status-from-home' , false)
            return {...state , status: false}
        case "SET_PATH":
            localStorage.setItem('pathname' , action.payload.path)
            return {...state , path: action.payload.path}
        default:
            return state
    }
}

export default fromHomeReducer
