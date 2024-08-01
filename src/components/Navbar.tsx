import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { useGlobal } from "../context/GlobalContext";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const { user }: { user: any } = useAuth();
  const { setShowNavbar, showNavbar } = useGlobal();
  const location = useLocation();

  useEffect(() => {
    setShowNavbar(false);
  }, [location.pathname]);

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
