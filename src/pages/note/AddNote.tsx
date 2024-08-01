import { Button } from "react-bootstrap";
import { generateId } from "../../utils/helpers";
import { postRequest } from "../../utils/services";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";
import React = require("react");

const AddNote: React.FC = () => {
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
    navigate(`/notes/${id}?edit=true`);
  };
  return (
    <Button
      onClick={addNew}
      className="bg-white text-center text-secondary border-0"
    >
      <i className="fa fa-plus"></i>
    </Button>
  );
};

export default AddNote;
