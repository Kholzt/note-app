import React from "react";
import { Link } from "react-router-dom";

interface noteType {
  title: string;
  content: string;
}
interface props {
  note: noteType;
}
const ViewNote: React.FC<props> = ({ note }) => {
  return (
    <div className="p-4  w-100 bg-white">
      <div className="d-flex align-items-center justify-content-between">
        {" "}
        <h2>{note.title}</h2>
        <Link
          to={`?edit=true`}
          className=" btn btn-outline-dark  text-decoration-none"
        >
          <i className="fa fa-pencil"></i>
        </Link>
      </div>
      <hr />
      <div dangerouslySetInnerHTML={{ __html: note.content }}></div>
    </div>
  );
};
export default ViewNote;
