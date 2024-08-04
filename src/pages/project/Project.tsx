import React, { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useTitle } from "../../utils/useDocuments";
import bg1 from "../../assets/background1.jpg";
import bg2 from "../../assets/background2.jpg";
import ProjectItem from "./ProjectItem";
import { formatDate, generateId } from "../../utils/helpers";
import { useGlobal } from "../../context/GlobalContext";

const dummyProjects = [
  {
    id: generateId(),
    title: "E-Learning",
    description: "Lorem  ",
    background: "./src/assets/background2.jpg",
    date: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "E-Book",
    description: "Lorem ipsum,  sit amet consectetur adipisicing elit ",
    background: "./src/assets/background2.jpg",
    date: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "E-Commerce",
    description: "Lorem ipsum, dolor sit amet consectetur  elit ",
    background: "./src/assets/background2.jpg",
    date: new Date().toISOString(),
  },
  {
    id: generateId(),
    title: "Blog App",
    description: "Lorem ipsum, dolor sit  consectetur adipisicing elit ",
    background: "./src/assets/background2.jpg",
    date: new Date().toISOString(),
  },
];

export default function Project() {
  useTitle("Projects");
  const { reload } = useGlobal();

  useEffect(() => {}, [reload]);
  return (
    <Container className="pt-4 vh-100">
      <div className="d-flex justify-content-end mb-4">
        <Button variant="primary">
          <i className="fa fa-plus"></i> New Project
        </Button>
      </div>
      <Row className="g-3">
        {dummyProjects?.map((project, i) => {
          return (
            <Col lg={3} key={i} md={4} sm={6}>
              <ProjectItem
                id={project.id}
                title={project.title}
                description={project.description}
                background={project.background}
                date={formatDate(project.date)}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}
