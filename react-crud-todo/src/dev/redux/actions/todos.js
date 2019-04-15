import axios from 'axios'

export const getTodos = () => {
    return {
        type: 'GET_TODOS',
        payload: axios.get(`http://127.0.0.1:3030/todos`)
    }
}

export const postTodo = (data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'POST_TODO',
            payload: axios.post(`http://127.0.0.1:3030/todo`, data)
        })
        await dispatch(getTodos())
    }
}

export const deleteTodo = (id) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'DELETE_TODO',
            payload: axios.delete(`http://127.0.0.1:3030/delete_todo/${id}`)
        })
        await dispatch(getTodos())
    }
}

export const getTodo = (id) => {
    return {
        type: 'GET_TODO',
        payload: axios.get(`http://127.0.0.1:3030/todo/${id}`)
    }
}

export const putTodo = (id, data) => {
    return async (dispatch) => {
        const res = await dispatch({
            type: 'PUT_TODO',
            payload: axios.put(`http://127.0.0.1:3030/edit_todo/${id}`, data)
        })
        await dispatch(getTodos())
    }
}







