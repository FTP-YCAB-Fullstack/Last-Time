const initialState = {
    totalPages: 1,
    page: 1,
}

const paginationReducer = (state=initialState , action) => {
    switch (action.type) {
        case "RESET_PAGINATION":
            return {totalPages: 1, page: 1}
        case "SET_PAGINATION":
            return {...state , totalPages: action.payload.totalPages}
        case "INCREASE_PAGE":
            let currentPage = state.page < state.totalPages ? state.page + 1 : state.page
            return {...state , page: currentPage}
        default:
            return state
    }
}

export default paginationReducer