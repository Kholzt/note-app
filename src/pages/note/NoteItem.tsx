import React from "react";
import { Link } from "react-router-dom";
import { deleteRequest } from "../../utils/services";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useGlobal } from "../../context/GlobalContext";

interface NoteItesmType {
  index: number;
  id: number;
  title: string;
  content: string;
  date: string;
  isActive: boolean;
}

const NoteItem: React.FC<NoteItesmType> = ({
  index,
  id,
  title,
  content,
  date,
  isActive,
}) => {
  const { reload, setReload } = useGlobal();
  const deleteNote = async () => {
    await deleteRequest("/notes/" + id);
    setReload(!reload);
  };

  const handleDropdown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  };
  return (
    <li id={"note" + id}>
      <Link
        to={`/notes/${id}`}
        className={` ${index > 0 && "border-top-0"} ${
          isActive && "bg-white"
        } py-3 pe-3 ps-4 border-bottom border-top text-decoration-none d-block`}
      >
        <div className="row align-items-end text-dark justify-content-between">
          <div className="col-8">
            <h6 className="note-title">{title}</h6>
            <p
              style={{ fontSize: "14px" }}
              className="mb-0 text-secondary text-truncate note-content"
            >
              {content}
            </p>
          </div>
          <div className="col-4 text-end">
            <Dropdown onClick={handleDropdown}>
              <DropdownButton
                className="bg-transparent py-0 border-0 dropdown-toggle"
                variant="link"
                id={`dropdown-${id}`}
                title={<i className="fa-solid fa-ellipsis text-dark"></i>}
              >
                <Dropdown.Item onClick={deleteNote} className="text-danger">
                  <i className="fa fa-trash"></i> Delete
                </Dropdown.Item>
              </DropdownButton>
            </Dropdown>

            <small
              className="text-secondary d-block note-date"
              style={{ fontSize: "12px" }}
            >
              {date}
            </small>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default NoteItem;
