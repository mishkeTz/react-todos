import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import classes from './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import SearchTodo from './SearchTodo';

import axios from '../../axios-todo';

import errorHandler from '../../hoc/errorHandler';

class Todos extends Component {

    state = {
        todos: [],
        todo: '',
        loading: true,
    }

    componentDidMount () {
        axios
            .get('https://todo-9b963.firebaseio.com/todos.json')
            .then(res => {

                const todos = [];
                
                if (res.data) {
                    for (let x in res.data) {
                        todos.push({
                            ...res.data[x],
                            key: x
                        });
                    }
                }
                
                this.setState({
                    ...this.state,
                    todos: todos,
                    loading: false,
                })

            })
            .catch(err => {
                console.log(err);
                this.setState({
                    ...this.state,
                    loading: false,
                })
            })
    }

    removeTodoHandler = (todoKey) => {

        axios
            .delete('https://todo-9b963.firebaseio.com/todos/' + todoKey + '.json')
            .then(res => {
                const todos = this.state.todos.filter(todo => {
                    if (todo.key !== todoKey) {
                        return {
                            ...todo
                        };
                    }
        
                    return false;
                });
        
                this.setState({
                    todos: todos
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    onChangeTodoHandler = (e) => {

        console.log("E", e);

        this.setState({
            ...this.state,
            todo: e.target.value
        })
    }

    addTodoHandler = () => {
        const todo = this.state.todo;
        console.log('TODO:', todo);

        if (!todo || todo.trim() == '') {
            // warning
            return false;
        }

        const todos = this.state.todos.map(todo => {
            return {
                ...todo
            };
        });

        const lastTodo = todos[todos.length - 1];
        const todoId = lastTodo ? lastTodo.id + 1 : 1;

        const newTodo = {
            id: todoId,
            todo: todo,
            completed: false
        };

        axios
            .post('https://todo-9b963.firebaseio.com/todos.json', newTodo)
            .then(res =>  {
                todos.push({
                    ...newTodo,
                    key: res.data.name,
                });

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

  render() {

    console.log(this.state.todos);

    let todos = <p>Loading...</p>;

    if (!this.state.loading) {

        if (this.state.todos.length > 0) {
            todos = this.state.todos.map(todo => {
                return <ListGroup.Item 
                            className={classes.ListGroupItem}
                            key={todo.id}>
                                <span>{todo.todo}</span>
                                <span onClick={() => this.removeTodoHandler(todo.key)}>x</span>
                        </ListGroup.Item>
            })
        } else {
            todos = <p>There are currently no added todos.</p>;
        }
    }

    return (
      <div className={classes.Todo}>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <ListGroup className={classes.ListGroup}>
                        <ListGroup.Item className={classes.ListGroupItemSearch}>
                            <InputGroup className="mb-3">
                                <SearchTodo 
                                    onChangeTodoHandler={this.onChangeTodoHandler}
                                    todo={this.state.todo}/>
                                <InputGroup.Append>
                                    <InputGroup.Text onClick={this.addTodoHandler} id="basic-addon1" className={classes.ListGroupItemSearchIcon}><FontAwesomeIcon icon="plus" /></InputGroup.Text>
                                </InputGroup.Append>
                            </InputGroup> 
                        </ListGroup.Item>
                        {todos}
                    </ListGroup>
                </Col>
            </Row>
      </div>
    )
  }
}

export default errorHandler(Todos, axios);