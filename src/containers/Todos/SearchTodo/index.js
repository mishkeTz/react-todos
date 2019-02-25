import React from 'react';

import FormControl from 'react-bootstrap/FormControl';

import classes from '../index.css';

const searchTodo = (props) => (<FormControl
        placeholder="Todo"
        aria-label="Todo"
        aria-describedby="basic-addon1"
        onChange={props.onChangeTodoHandler}
        value={props.todo}
        className={classes.ListGroupItemSearchInput}
    />
);

export default searchTodo;