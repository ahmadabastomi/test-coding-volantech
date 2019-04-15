const initialState = {
    data: [],
    value: {},
    isLoading: false,
    isError: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case 'GET_TODOS_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_TODOS_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_TODOS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                data: action.payload.data
            }
        case 'POST_TODO_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'POST_TODO_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'POST_TODO_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'DELETE_TODO_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'DELETE_TODO_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'DELETE_TODO_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        case 'GET_TODO_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'GET_TODO_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'GET_TODO_FULFILLED':
            return {
                ...state,
                isLoading: false,
                value: action.payload.data
            }
        case 'PUT_TODO_PENDING':
            return {
                ...state,
                isLoading: true
            }
        case 'PUT_TODO_REJECTED':
            return {
                ...state,
                isLoading: false
            }
        case 'PUT_TODO_FULFILLED':
            return {
                ...state,
                isLoading: false,
            }
        default:
            return state
    }

}
