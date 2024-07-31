import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="d-md-flex">
      <Sidebar />
      <main className="w-100">
        <Outlet />
      </main>
    </div>
  );
}
