import { Routes, Route } from "react-router-dom";
import Login from "./../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Note from "./../pages/note/Note";
import Layout from "./../components/Layout";
import React from "react";
import Project from "./../pages/project/Project";

const Router: React.FC = () => {
  return (
    <Routes>
      {/* Rute publik */}
      <Route path="/login" element={<Login />} />
      {/* Route Private */}
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/notes" element={<Note />} />
          <Route path="/notes/:id" element={<Note />} />
          <Route path="/projects" element={<Project />} />
          <Route path="/projects/:id" element={<Note />} />
        </Route>
      </Route>
    </Routes>
  );
};
export default Router;
