import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteRequest } from "../../utils/services";
import { useGlobal } from "../../context/GlobalContext";

interface props {
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
}: props) {
  const { reload, setReload } = useGlobal();
  const deteleProject = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      //   await deleteRequest("/projects", id);
      setReload(!reload);
    } catch (error) {}
  };
  return (
    <Link to={`/projects/${id}`} className="text-decoration-none ">
      <Card
        bg="white"
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
        className="border-0  shadow-sm h-100"
      >
        <Card.Body className="d-flex flex-column">
          <Card.Title>{title}</Card.Title>
          <Card.Text style={{ fontSize: "14px" }}>{description}</Card.Text>
          <div className="d-flex justify-content-between align-items-center mt-auto">
            <Card.Text className="mb-0" style={{ fontSize: "13px" }}>
              {date}
            </Card.Text>
            <Button
              onClick={deteleProject}
              className="rounded-circle"
              variant="danger"
            >
              <i className="fa fa-trash" style={{ fontSize: "14px" }}></i>
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
