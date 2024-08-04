import React, { useEffect, useState } from "react";
import NoteList from "./NoteList";
import EditorSection from "./EditorSection";
import { useTitle } from "../../utils/useDocuments";
import { getRequest, getSingleRequest } from "../../utils/services";
import { useParams, useSearchParams } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";

const Note: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [note, setNote] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { reload } = useGlobal();
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const isEdit = !!searchParams.get("edit");
  useTitle("Note");
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
    if (!id) return;
    const fetchNotes = async () => {
      const data: any = await getSingleRequest("/notes/" + id);
      setNote(data);
      document.title = data?.title + " | Note Me";
    };
    fetchNotes();
  }, [id]);

  return (
    <>
      <div className="d-flex ">
        <NoteList loading={loading} idNote={id} notes={notes} />
        <EditorSection isEdit={isEdit} id={id} note={note} />
      </div>
    </>
  );
};

export default Note;
