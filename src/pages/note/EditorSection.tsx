import React, { useCallback, useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import EditorComponent from "./../../components/Editor";
import { postRequest } from "../../utils/services";
import { extractTextFromHTML } from "../../utils/helpers";
import { useNavigate } from "react-router-dom";

interface EditorSectionProps {
  note: any;
  id: string | undefined;
}

const EditorSection: React.FC<EditorSectionProps> = ({ note, id }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [firstLoad, setFirstLoad] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(note.title);
    setContent(note.content);
    document.querySelector(".ck-content")?.classList?.add("custom-scroll");
  }, [note]);

  const autoFocus = useCallback(
    (el: HTMLInputElement) => (el ? el.focus() : null),
    [title]
  );
  useEffect(() => {
    if (!id || firstLoad) {
      setFirstLoad(!firstLoad);
      return;
    }
    const updateNote = async () => {
      await postRequest("notes/" + id, {
        title,
        content,
        date: note.date,
      });
      // update the latest record to note list
      let titleNoteList = document.querySelector(`#note${id} .note-title`);
      let contentNoteList = document.querySelector(`#note${id} .note-content`);
      if (titleNoteList) titleNoteList.textContent = title;
      if (contentNoteList)
        contentNoteList.textContent = extractTextFromHTML(content);
    };
    updateNote();
  }, [title, content]);

  const closeNote = () => {
    navigate("/notes");
  };

  //if have no records selected
  if (!id) {
    return (
      <div
        className={`${
          !id && "d-md-flex d-none"
        } editor p-4 d-flex align-items-center flex-column justify-content-center w-100`}
      >
        <i className="fa fa-folder-open mb-2 display-1 text-secondary"></i>
        <span className="text-secondary fs-5">choose or make new note</span>
      </div>
    );
  }
  return (
    <div className={`editor p-4 w-100 overflow-auto `}>
      <div className="d-flex justify-content-between align-items-center">
        <Form.Control
          ref={autoFocus}
          className="py-2 mb-2 border-0 fs-2"
          type="text"
          placeholder="Note title"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button onClick={closeNote}>
          <i className="fa fa-close"></i>
        </Button>
      </div>
      <EditorComponent
        onChange={(e: string) => setContent(e)}
        initialValue={content}
      />
    </div>
  );
};

export default EditorSection;
