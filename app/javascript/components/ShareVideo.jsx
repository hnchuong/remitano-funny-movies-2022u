import ReactDOM from 'react-dom'
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

function ShareVideo({ handleSubmitVideo}) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const [url, setUrl] = useState('');

  const handleChange = (e) => setUrl(e.target.value);

  return ReactDOM.createPortal(
    <>
      <Button variant="primary" onClick={handleShow}>
      Share a movie
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Share a Youtube movie</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form id="form-share-youtube" onSubmit={ handleSubmitVideo(url, handleClose) }>
            <Form.Group className="mb-3">
              <Form.Label>Youtube URL</Form.Label>
              <Form.Control
                type="url"
                onChange={handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" variant="primary" form="form-share-youtube">
            Share
          </Button>
        </Modal.Footer>
      </Modal>
    </>,
    document.getElementById('share-movie')
  );
}

export default ShareVideo;
