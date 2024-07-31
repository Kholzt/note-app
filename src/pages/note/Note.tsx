import React, { useEffect, useState } from "react";
import NoteList from "./NoteList";
import EditorSection from "./EditorSection";
import { useTitle } from "../../utils/useDocuments";
import { getRequest } from "../../utils/services";
import { useParams } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";

const Note: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [note, setNote] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { reload } = useGlobal();
  useTitle("Note");
  const { id } = useParams();
  useEffect(() => {
    setLoading(true);
    const fetchAllNotes = async () => {
      let data = await getRequest("/notes");
      data = data.sort(
        (a: any, b: any) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      setNotes(data);
      setLoading(false);
    };
    fetchAllNotes();
  }, [reload]);

  useEffect(() => {
    const fetchNotes = async () => {
      const data: any = await getRequest("/notes/" + id);
      setNote(data);
      document.title = data?.title + " | Note Me";
    };
    fetchNotes();
  }, [id]);

  return (
    <>
      <div className="d-flex ">
        <NoteList loading={loading} idNote={id} notes={notes} />
        <EditorSection id={id} note={note} />
      </div>
    </>
  );
};

export default Note;
