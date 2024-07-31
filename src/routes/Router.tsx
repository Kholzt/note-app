import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Note from "./../pages/note/Note";
import Layout from "./../components/Layout";

export default function Router() {
  return (
    <Routes>
      {/* Rute publik */}
      <Route path="/login" element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Layout />}>
          <Route path="/notes" element={<Note />} />
          <Route path="/notes/:id" element={<Note />} />
        </Route>
      </Route>
    </Routes>
  );
}
