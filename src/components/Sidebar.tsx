import React from "react";
import SideMenu from "./SideMenu";
import { useGlobal } from "../context/GlobalContext";
import { Button } from "react-bootstrap";

const Sidebar: React.FC = () => {
  const { setShowNavbar, showNavbar } = useGlobal();
  const handleToggle = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <aside
      className={`pt-4 ps-md-4 bg-primary   w-100 sidebar-parent vh-100 ${
        showNavbar && "active"
      }`}
    >
      <div className="d-flex  mb-3 justify-content-between">
        <h3 className=" ps-3  text-white ">Note Me</h3>
        <Button
          onClick={handleToggle}
          className="bg-transparent border-0 d-md-none text-white me-3"
        >
          <i className="fa fa-bars"></i>
        </Button>
      </div>
      <hr className="border-secondary d-block mb-3 pb-2" />
      <SideMenu />
    </aside>
  );
};
export default Sidebar;
