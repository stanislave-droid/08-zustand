import { Metadata } from "next";
import CreateNoteFormClient from "./CreateNoteForm.client";
import css from "./CreateNoteForm.module.css";

export const metadata: Metadata = {
  title: "NoteHub | Create New Note",
  description: "Creating New Note Form",
  openGraph: {
    title: "NoteHub | Create New Note",
    description: "Creating New Note Form",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        height: 1200,
        width: 630,
        alt: "NoteHub",
      },
    ],
    url: "https://08-zustand-drab-xi.vercel.app/notes/action/create",
    type: "article",
  },
};

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {<CreateNoteFormClient />}
      </div>
    </main>
  );
}
