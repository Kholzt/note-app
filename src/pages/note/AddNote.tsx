import React from "react";
import { Button } from "react-bootstrap";
import { generateId } from "../../utils/helpers";
import { postRequest } from "../../utils/services";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";

export default function AddNote() {
  const { reload, setReload } = useGlobal();
  const navigate = useNavigate();
  const addNew = async () => {
    const id = generateId();
    await postRequest("notes/" + id, {
      title: "Note title",
      content: "Detail title",
      date: new Date().toISOString(),
    });
    setReload(!reload);
    navigate(`/notes/${id}`);
  };
  return (
    <Button
      onClick={addNew}
      className="p-4 bg-white text-center border-dashed border-4 text-secondary border mb-3"
      style={{ width: "90%", marginInline: "auto" }}
    >
      Add New <i className="fa fa-plus"></i>
    </Button>
  );
}
