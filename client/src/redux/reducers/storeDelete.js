const initialState = {
    id: null,
    response: null,
    url: null,
    modal: false,
    cb: null,
}

const storeDeleteReducer = (state = initialState , action) => {
    switch (action.type) {
        case "SET_ID":
            return {...state, id: action.payload.id , modal: true , url: action.payload.url}
        case "TOGGE_MODAL_DELETE":
            return {...state , modal: !state.modal}
        case "SET_MODAL_CALLBACK":
            return {...state , cb: action.payload.callback}
        default:
            return state
    }
} 

export default storeDeleteReducer
