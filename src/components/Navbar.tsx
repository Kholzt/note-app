import React, { useEffect } from "react";
import {
  Button,
  Dropdown,
  DropdownButton,
  DropdownItemText,
} from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useGlobal } from "../context/GlobalContext";
import { useLocation, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";

export default function Navbar() {
  const { user, setUser }: { user: any; setUser: any } = useAuth();
  const { setShowNavbar, showNavbar } = useGlobal();
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setShowNavbar(false);
  }, [location.pathname]);

  const handleToggle = () => {
    setShowNavbar(!showNavbar);
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    navigate("/login");
  };
  return (
    <div className="border-bottom position-sticky top-0 bg-white z-3 py-2 px-2 d-flex justify-content-between align-items-center">
      <Button
        onClick={handleToggle}
        className="bg-transparent border-0 text-dark"
      >
        <i className="fa fa-bars"></i>
      </Button>
      <Dropdown align={"end"}>
        <Dropdown.Toggle
          variant="primary"
          className="bg-transparent border-0 text-dark"
          id="dropdown-basic"
        >
          {user.name} <i className="fa fa-caret-down"></i>
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.ItemText className="d-flex gap-2">
            <img
              src={user.photo}
              alt=""
              style={{ width: "50px", height: "50px" }}
              className="rounded-circle"
            />
            <div className="">
              <span>{user.name}</span>
              <p className="m-0" style={{ fontSize: "13px" }}>
                {user.email}
              </p>
            </div>
          </Dropdown.ItemText>
          <Dropdown.Divider></Dropdown.Divider>
          <Dropdown.Item onClick={logout} as="button">
            <i className="fa fa-right-from-bracket"></i> Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
