import React from "react";
import { Button } from "react-bootstrap";
import { extractTextFromHTML, getRelativeTime } from "../../utils/helpers";
import LoadingData from "./../../components/LoadingData";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import FilterNote from "./FilterNote";

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

const NoteList: React.FC<NoteListProps> = React.memo(
  ({ notes, loading, idNote = 0 }) => {
    const hasIdNote = idNote != 0;

    return (
      <div
        className={`note-list bg-light h-100 position-relative border-end d-flex flex-column justify-content-between ${
          hasIdNote ? "d-md-flex d-none" : ""
        }`}
        style={{ minWidth: "450px", width: "450px", maxWidth: "450px" }}
      >
        <div className="position-absolute h-100 w-100 top-0 left-0 right-0 bottom-0">
          <div className="note-lists position-sticky h-100 d-flex flex-column w-100 overflow-hidden">
            {/* Head Note */}
            <div className="d-flex pt-4 ps-4 mb-0 pe-3 justify-content-between align-items-center">
              <h4 className="mb-0">All Note</h4>
              <AddNote />
            </div>
            <hr />
            <FilterNote />
            {/* List Note */}
            <ol className="list-unstyled overflow-auto flex-grow-1 custom-scroll w-100 h-100">
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
              {!loading && notes.length === 0 && (
                <li className="text-center border-top pt-3">
                  Data note tidak ada
                </li>
              )}
            </ol>
          </div>
        </div>
      </div>
    );
  }
);

export default NoteList;
