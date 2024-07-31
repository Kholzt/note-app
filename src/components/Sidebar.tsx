import React from "react";
import SideMenu from "./SideMenu";

export default function Sidebar() {
  return (
    <aside
      className="pt-4 ps-4 bg-primary w-100 vh-100"
      style={{ maxWidth: "300px" }}
    >
      <h3 className="mb-3 ps-3 text-white">Note Me</h3>
      <hr className="border-secondary d-block mb-3 pb-2" />
      <SideMenu />
    </aside>
  );
}
