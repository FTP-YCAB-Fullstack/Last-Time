const initialState = {
    users: {
        admins: 0,
        members: 0,
        pickupers: 0,
    },
    transactions: {
        waiting: 0,
        process: 0,
        done: 0,
        reject: 0,
    }
}
const adminCountReducer = (state= initialState, action) => {
    switch (action.type) {
        case "ADMIN_COUNT_USERS":
            return {...state , users: action.payload}
        case "ADMIN_COUNT_TRANSACTIONS":
            return {...state , transactions: action.payload}
        default:
            return state
    }
}

export default adminCountReducer