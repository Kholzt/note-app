import React, { useEffect, useState } from "react";
import { Alert, Col, Container, Row } from "react-bootstrap";
import { useTitle } from "../../utils/useDocuments";
import ProjectItem from "./ProjectItem";
import { formatDate, generateId } from "../../utils/helpers";
import { useGlobal } from "../../context/GlobalContext";
import ProjectFilter from "./ProjectFilter";
import AddProject from "./AddProject";
import { getRequest } from "../../utils/services";

interface Filter {
  startDate: string;
  endDate: string;
}
export default function Project() {
  useTitle("Projects");
  const { reload } = useGlobal();
  const [filter, setFilter] = useState<Filter>({
    startDate: "",
    endDate: "",
  });
  const [projects, setProjects] = useState<any[]>([]);
  useEffect(() => {
    getProjects();
  }, [filter, reload]);

  const getProjects = async () => {
    const { startDate, endDate } = filter;
    let data = await getRequest("/projects");
    data = data.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    data = data.filter((project: any) => {
      const projectDate = new Date(project.date);
      const isAfterStart = startDate
        ? projectDate >= new Date(startDate)
        : true;
      const isBeforeEnd = endDate ? projectDate <= new Date(endDate) : true;
      return isAfterStart && isBeforeEnd;
    });
    setProjects(data);
  };
  return (
    <Container className="pt-4 vh-100">
      <div className="d-flex justify-content-end mb-4">
        <div className="d-flex gap-2">
          <ProjectFilter setFilter={setFilter} />
          <AddProject />
        </div>
      </div>
      {projects.length === 0 ? (
        <Alert variant="info">
          No projects available. Add a new project to get started!
        </Alert>
      ) : (
        <Row className="g-3">
          {projects.map((project, i) => (
            <Col lg={3} key={i} md={4} sm={6}>
              <ProjectItem
                id={project.id}
                title={project.title}
                description={project.description}
                background={project.background}
                date={formatDate(project.date)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}
