
export const setIdDelete = (id , url) => {
    return {
        type: "SET_ID",
        payload: {id , url}
    }
}

export const toggleModalDel = () => {
    return {
        type: "TOGGE_MODAL_DELETE"
    }
} 

export const deleteCallback = (callback) => {
    return {
        type: "SET_MODAL_CALLBACK",
        payload: {
            callback,
        }
    }
}