import React, { Fragment, useState } from 'react';
import ModalBody from '../Modal';
import './index.style.css';

const EditTodo = ({ todo }) => {
  // eslint-disable-next-line

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <Fragment>
      <button className="editBtn" onClick={handleShow}>
        Edit
      </button>
      <ModalBody show={show} handleClose={handleClose} todo={todo} />
    </Fragment>
  );
};

export default EditTodo;
