import React, { useState } from "react";
import { Button, Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteRequest } from "../../utils/services";
import { useGlobal } from "../../context/GlobalContext";

interface Props {
  id: string;
  background: string;
  title: string;
  description: string;
  date: string;
}

export default function ProjectItem({
  id,
  title,
  description,
  background,
  date,
}: Props) {
  const { reload, setReload } = useGlobal();
  const [showConfirm, setShowConfirm] = useState(false);

  const handleShowConfirm = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setShowConfirm(true);
  };
  const handleCloseConfirm = () => setShowConfirm(false);

  const handleDeleteProject = async () => {
    try {
      await deleteRequest("/projects", id);
      setReload(!reload);
      handleCloseConfirm(); // Close the modal after successful deletion
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  return (
    <>
      <Link to={`/projects/${id}`} className="text-decoration-none">
        <Card
          bg="white"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
          className="border-0 shadow-sm h-100"
        >
          <Card.Body className="d-flex flex-column">
            <Card.Title>{title}</Card.Title>
            <Card.Text
              className="truncate-two-lines"
              style={{ fontSize: "14px" }}
            >
              {description}
            </Card.Text>
            <div className="d-flex justify-content-between align-items-center mt-auto">
              <Card.Text className="mb-0" style={{ fontSize: "13px" }}>
                {date}
              </Card.Text>
              <Button
                onClick={handleShowConfirm}
                className="rounded-circle text-danger"
                variant="light"
              >
                <i className="fa fa-trash" style={{ fontSize: "14px" }}></i>
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Link>

      {/* Confirmation Modal */}
      <ConfirmDeleteModal
        show={showConfirm}
        onClose={handleCloseConfirm}
        onDelete={handleDeleteProject}
      />
    </>
  );
}

interface ConfirmDeleteModalProps {
  show: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  show,
  onClose,
  onDelete,
}) => (
  <Modal show={show} onHide={onClose} backdrop="static" keyboard={false}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this project?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={onClose}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);
