import React, { Fragment, useState } from 'react';
import './index.style.css';
import * as todoService from '../../services/todoService';

const InputTodo = () => {
  const [description, setDescription] = useState('');

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };

      todoService
        .addTodo(body)
        .then((res) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Fragment>
      <h1 className="text-center mt-5">Pern Todo List</h1>
      <form className="d-flex mt-5 form-center" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control form-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success button-input">Add</button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
