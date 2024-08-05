import React, { Dispatch, useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal, FormGroup } from "react-bootstrap";
import { generateId } from "../../utils/helpers";
import { postRequest } from "../../utils/services";
import { useGlobal } from "../../context/GlobalContext";

interface AddModalProps {
  show: boolean;
  setShow: Dispatch<React.SetStateAction<boolean>>;
}

interface BgFormProps {
  setBackground: Dispatch<React.SetStateAction<string>>;
}

const bgArray = [
  "./assets/background3.jpg",
  "./assets/background1.jpg",
  "./assets/background2.jpg",
  "./assets/background4.jpg",
  "./assets/background5.jpg",
  "./assets/background6.jpg",
];

const BgForm: React.FC<BgFormProps> = ({ setBackground }) => {
  const [bgActive, setBgActive] = useState<number>(0);

  const handleBackgroundChange = (index: number, bgPath: string) => {
    setBgActive(index);
    setBackground(bgPath);
  };

  return (
    <FormGroup>
      <Form.Label className="d-block">Background</Form.Label>
      {bgArray.map((bg, i) => (
        <Form.Label key={i}>
          <img
            src={bg}
            alt={`Background ${i}`}
            className={`rounded-circle me-2 ${
              i === bgActive ? "border border-3 border-secondary" : ""
            }`}
            style={{ width: "50px", height: "50px", cursor: "pointer" }}
          />
          <Form.Check
            name="background"
            checked={i === bgActive}
            value={bg}
            onChange={() => handleBackgroundChange(i, bg)}
            hidden
          />
        </Form.Label>
      ))}
    </FormGroup>
  );
};

const AddModal: React.FC<AddModalProps> = ({ show, setShow }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [background, setBackground] = useState<string>(bgArray[0]);
  const [validated, setValidated] = useState<boolean>(false);
  const { reload, setReload } = useGlobal();
  useEffect(() => {
    setTitle("");
    setDescription("");
    setBackground(bgArray[0]);
    setValidated(false);
  }, [show]);

  const handleClose = async () => setShow(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity()) {
      const id = generateId();
      const data = {
        title,
        description,
        background,
        date: new Date().toISOString(),
      };
      await postRequest(`/projects/${id}`, data);
      setReload(!reload);
      setShow(false); // Close modal on successful submit
    } else {
      setValidated(true);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add New Project</Modal.Title>
      </Modal.Header>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Modal.Body>
          <BgForm setBackground={setBackground} />
          <FormGroup controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                isInvalid={validated && !title}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a project title.
              </Form.Control.Feedback>
            </InputGroup>
          </FormGroup>
          <FormGroup controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                as="textarea"
                placeholder="Enter project description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                isInvalid={validated && !description}
              />
              <Form.Control.Feedback type="invalid">
                Please provide a project description.
              </Form.Control.Feedback>
            </InputGroup>
          </FormGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default function AddProject() {
  const [show, setShow] = useState<boolean>(false);

  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        <i className="fa fa-plus"></i> New Project
      </Button>
      <AddModal show={show} setShow={setShow} />
    </>
  );
}
