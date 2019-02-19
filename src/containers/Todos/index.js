import React, { Component } from 'react';


import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import classes from './index.css';

import axios from '../../axios-todo';

import errorHandler from '../../hoc/errorHandler';

class Todos extends Component {

    state = {
        todos: [
            {
                id: 1,
                todo: 'Todo something 1',
                completed: true,
            },
            {
                id: 2,
                todo: 'Todo something 2',
                completed: false,
            },
            {
                id: 3,
                todo: 'Todo something 3',
                completed: false,
            },
        ]
    }

    onClickHandler = (todoId) => {
        const todos = this.state.todos.filter(todo => {
            if (todo.id !== todoId) {
                return {
                    ...todo
                };
            }

            return false;
        });

        this.setState({
            todos: todos
        })
    }

  render() {

    console.log(this.state.todos);


    const todos = this.state.todos.map(todo => {
        return <ListGroup.Item 
                    className={classes.ListGroupItem}
                    key={todo.id}>
                        <span>{todo.todo}</span>
                        <span onClick={() => this.onClickHandler(todo.id)}>x</span>
                </ListGroup.Item>
    })

    return (
      <div>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>
                    <ListGroup>
                        <ListGroup.Item className={classes.ListGroupItemSearch}>
                            <InputGroup className="mb-3">
                                <FormControl
                                    placeholder="Username"
                                    aria-label="Username"
                                    aria-describedby="basic-addon1"
                                />
                                <InputGroup.Append>
                                    <InputGroup.Text id="basic-addon1">+</InputGroup.Text>
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