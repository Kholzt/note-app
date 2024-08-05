import React, { useEffect, useState } from "react";
import NoteList from "./NoteList";
import EditorSection from "./EditorSection";
import { useTitle } from "../../utils/useDocuments";
import { useParams, useSearchParams } from "react-router-dom";
import { useGlobal } from "../../context/GlobalContext";
import NoteModel from "../../models/NoteModel";
import Model from "../../models/Model";
import { useAuth } from "../../context/AuthContext";
const Note: React.FC = () => {
  useTitle("Note");
  const [notes, setNotes] = useState<any[]>([]);
  const [note, setNote] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const { reload } = useGlobal();
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const isEdit = !!searchParams.get("edit");
  const [noteModel, setNoteModel] = useState<Model>(new NoteModel());
  const { user }: { user: any } = useAuth();
  useEffect(() => {
    setNoteModel(new NoteModel());
    setLoading(true);
    fetchAllNotes();
  }, [reload]);

  useEffect(() => {
    fetchNotes();
  }, [id]);

  const fetchAllNotes = async () => {
    let data = await noteModel.all();
    data = data.sort(
      (a: any, b: any) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    data = data.filter((d: any) => d.user_id == user.id);
    setNotes(data);
    setLoading(false);
  };

  const fetchNotes = async () => {
    if (!id) return;
    const data: any = await noteModel.find(id);
    setNote(data);
    document.title = data?.title + " | Note Me";
  };
  return (
    <>
      <div className="d-flex flex-grow-1">
        <NoteList loading={loading} idNote={id} notes={notes} />
        <EditorSection isEdit={isEdit} id={id} note={note} />
      </div>
    </>
  );
};

export default Note;
