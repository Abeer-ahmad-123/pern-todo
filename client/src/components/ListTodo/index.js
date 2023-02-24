import React, { useEffect, useState } from 'react';
import * as todoService from '../../services/todoService';
import EditTodo from '../EditTodo';
import './index.style.css';

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function

  const deleteTodo = async (id) => {
    todoService
      .deleteTodo(id)
      .then((res) => {
        console.log(res);
        setTodos(todos.filter((todo) => todo.todo_id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getTodos = async () => {
    try {
      todoService
        .getAllTodos()
        .then((res) => {
          setTodos(res.data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  console.log({ todos });

  return (
    <div className="table-center">
      {' '}
      <table className="table mt-5 text-center form-table" id="customers">
        <thead>
          <tr>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="deleteBtn"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListTodos;
