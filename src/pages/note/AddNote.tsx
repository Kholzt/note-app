import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";
import React = require("react");
import NoteModel from "../../models/NoteModel";

const AddNote: React.FC = () => {
  const { reload, setReload } = useGlobal();
  const navigate = useNavigate();
  const addNew = async () => {
    const noteModel = new NoteModel();
    const data = {
      title: "Note title",
      content: "Detail title",
    };
    const result: any = await noteModel.addNote(data);

    setReload(!reload);
    navigate(`/notes/${result.id}?edit=true`);
  };
  return (
    <Button
      onClick={addNew}
      className="bg-primary  text-center text-white border-0"
    >
      <i className="fa fa-plus"></i>
    </Button>
  );
};

export default AddNote;
