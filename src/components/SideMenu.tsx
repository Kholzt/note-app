import React from "react";
import { Link, useLocation } from "react-router-dom";

const SideMenu: React.FC = () => {
  const { pathname } = useLocation();
  const sideMenu = [
    {
      path: "/",
      name: "Home",
      icon: "fa-home",
      isActive: pathname == "/",
    },
    {
      path: "/notes",
      name: "Notes",
      icon: "fa-note-sticky",
      isActive: pathname.includes("/notes"),
    },
    {
      path: "/setting",
      name: "Setting",
      icon: "fa-sliders",
      isActive: pathname.includes("/setting"),
    },
  ];
  return (
    <ul className="list-unstyled sidebar">
      {sideMenu.map((menu, i) => {
        return (
          <li key={i}>
            <Link
              to={menu.path}
              className={`${
                menu.isActive && "active"
              } py-2 d-block text-decoration-none ps-3 sidemenu`}
            >
              <i
                style={{ width: "20px", height: "20px" }}
                className={`fa ${menu.icon} me-2`}
              ></i>
              <span>{menu.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SideMenu;
