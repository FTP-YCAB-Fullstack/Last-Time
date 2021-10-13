const initialState = {
    lists: []
}

const officesReducer = (state = initialState , action) => {
    switch (action.type) {
        case "OFFICE_FETCH_LIST":
            return {...state , lists: action.payload}
        default:
            return state
    }
}

export default officesReducer