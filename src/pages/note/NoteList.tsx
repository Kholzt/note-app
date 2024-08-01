import React from "react";
import { Button } from "react-bootstrap";
import { extractTextFromHTML, getRelativeTime } from "../../utils/helpers";
import LoadingData from "./../../components/LoadingData";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  note: string;
}

interface NoteListProps {
  notes: Note[];
  loading: boolean;
  idNote: string | undefined;
}

const NoteList: React.FC<NoteListProps> = ({ notes, loading, idNote = 0 }) => {
  const hasIdNote = idNote != 0;
  return (
    <div
      className={`note-list bg-light  position-relative border-end d-flex flex-column justify-content-between ${
        hasIdNote && "d-md-flex d-none"
      }`}
      style={{ minWidth: "450px", width: "450px", maxWidth: "450px" }}
    >
      <div
        className="note-lists    w-100  overflow-hidden"
        style={{ height: "calc(100vh - 60px)" }}
      >
        {/* Head Note */}
        <div className="d-flex pt-4 ps-4 mb-4 pe-3 justify-content-between align-items-center">
          <h4 className="mb-0">All Note</h4>
          <AddNote />
        </div>
        {/* List Note */}
        <ul className="list-unstyled overflow-auto  custom-scroll w-100 h-100">
          {!loading ? (
            notes.map((note: any, index: number) => {
              const id = note.id;
              const isActive = idNote == id;
              const date = getRelativeTime(note.date);
              const content = extractTextFromHTML(note.content);
              const title = note.title;
              return (
                <NoteItem
                  index={index}
                  key={id}
                  id={id}
                  isActive={isActive}
                  content={content}
                  date={date}
                  title={title}
                />
              );
            })
          ) : (
            <LoadingData />
          )}
        </ul>
      </div>
    </div>
  );
};

export default NoteList;
