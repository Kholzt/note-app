import React from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useGlobal } from "../context/GlobalContext";

export default function Navbar() {
  const { user } = useAuth();
  const { setShowNavbar, showNavbar } = useGlobal();
  const handleToggle = () => {
    setShowNavbar(!showNavbar);
  };
  return (
    <div className="border-bottom py-2 px-2 d-flex justify-content-between align-items-center">
      <Button
        onClick={handleToggle}
        className="bg-transparent border-0 text-dark"
      >
        <i className="fa fa-bars"></i>
      </Button>
      <span>{user?.displayName}</span>
    </div>
  );
}
