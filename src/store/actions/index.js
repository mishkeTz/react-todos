import axios from '../../axios-todo';

export const ADD = 'ADD';
export const REMOVE = 'REMOVE';

export const add = (payload) => {
    return {
        type: ADD,
        payload: payload,
    }
}

export const remove = (payload) => {
    return {
        type: REMOVE,
        payload: payload,
    }
}

export const storeTodo = (payload) => {
    return (dispatch, getState) => {

        if (!payload.todo || payload.todo.trim() == '') {
            // warning
            return false;
        }

        const todos = payload.todos.map(todo => {
            return {
                ...todo
            };
        });

        const lastTodo = todos[todos.length - 1];
        const todoId = lastTodo ? lastTodo.id + 1 : 1;

        const newTodo = {
            id: todoId,
            todo: payload.todo,
            completed: false,
        };

        axios
            .post('https://todo-9b963.firebaseio.com/todos.json', newTodo)
            .then(res =>  {
                todos.push({
                    ...newTodo,
                    key: res.data.name,
                });

                dispatch(add(todos))

                this.setState({
                    ...this.state,
                    todos: todos,
                    todo: '',
                })
            })
            .catch(err => {
                console.log(err);
            })
    }
};