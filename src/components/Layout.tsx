import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
const Layout: React.FC = () => {
  return (
    <div className="d-md-flex bg-light">
      <Sidebar />
      <main className="w-100 vh-100 overflow-auto d-flex flex-column">
        <Navbar />
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
