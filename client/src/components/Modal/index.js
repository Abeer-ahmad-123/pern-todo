import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './index.style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import * as todoService from '../../services/todoService';

const ModalBody = ({ todo, show, handleClose }) => {
  // eslint-disable-next-line
  const [description, setDescription] = useState(todo.description);

  //edit description function

  const updateDescription = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      todoService
        .updateTodo(todo.todo_id, body)
        .then((res) => {
          handleClose();
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
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button className="deleteBtn" onClick={handleClose}>
            Close
          </Button>
          <Button className="editBtn" onClick={updateDescription}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalBody;
