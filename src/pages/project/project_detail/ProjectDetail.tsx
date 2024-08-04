import React, { useEffect, useState } from "react";
import { getSingleRequest } from "../../../utils/services";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";

export default function ProjectDetail() {
  const [project, setProject] = useState<any>({});
  const { id } = useParams();
  useEffect(() => {
    getProject();
  }, []);
  const getProject = async () => {
    const data = await getSingleRequest("/projects/" + id);
    setProject(data);
  };
  return (
    <Container
      fluid
      style={{
        height: "calc(100vh - 55px)",
        backgroundImage: `url(${project?.background})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
    ></Container>
  );
}
