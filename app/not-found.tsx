import { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description: "Page not found",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description: "Page not found",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        height: 1200,
        width: 630,
        alt: "NoteHub",
      },
    ],
    url: process.env.NEXT_PUBLIC_URL,
    type: "article",
  },
};

export default function NotFoundPage() {
  return (
    <>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </>
  );
}
