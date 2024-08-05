import React, { useCallback } from "react";
import { FormControl, InputGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

export default function FilterNote() {
  const location = useLocation();
  const navigate = useNavigate();
  const autoFocus = useCallback(
    (el: HTMLInputElement | HTMLTextAreaElement | null) =>
      el ? el.focus() : null,
    [location.pathname, location.search]
  );
  const handleSearch = (e: any) => {
    const value = e.target.value;
    const params = new URLSearchParams();
    if (value) params.set("search", value);
    navigate(`/notes?${params.toString()}`);
  };
  return (
    <div className=" ps-4 mb-3 pe-3">
      <InputGroup>
        <FormControl
          onChange={handleSearch}
          ref={autoFocus}
          autoFocus
          type="text"
          placeholder="Search note"
        />
        <InputGroup.Text>
          <i className="fa fa-search"></i>
        </InputGroup.Text>
      </InputGroup>
    </div>
  );
}
