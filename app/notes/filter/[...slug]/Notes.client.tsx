"use client";
import { useState } from "react";
import css from "./Notes.client.module.css";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import { useRouter } from "next/navigation";
import PaginationClient from "@/components/Pagination/Pagination";
import { Category } from "@/lib/categories";

interface NotesClientProps {
  tag: Category | undefined;
}

export default function NotesClient({ tag }: NotesClientProps) {
  const [query, setQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["notes", query, currentPage, tag],
    queryFn: () => fetchNotes(currentPage, query, 12, tag),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const onPageChange = (nextPage: number) => {
    setCurrentPage(nextPage);
  };
  const handleOpenModal = () => {
    router.push("/notes/action/create");
  };

  const onChange = useDebouncedCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value.trim());
      setCurrentPage(1);
    },
    1000,
  );

  return (
    <main className={css.app}>
      <header className={css.toolbar}>
        {<SearchBox handleChange={onChange} />}
        {data && data.totalPages > 1 && (
          <PaginationClient
            totalPages={data.totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        )}
        {
          <button className={css.button} onClick={handleOpenModal}>
            Create note +
          </button>
        }
      </header>
      {data && data.notes.length != 0 && <NoteList notes={data.notes} />}
    </main>
  );
}
