import { fetchNotes } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NotesClient from "./Notes.client";
import { Category } from "@/lib/categories";
import { Metadata } from "next";

interface NotesParams {
  params: Promise<{ slug: string[] }>;
}

export async function generateMetadata({
  params,
}: NotesParams): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] == "all" ? "all" : (slug[0] as Category);

  return {
    title: `NoteHub | ${tag}`,
    description: `NoteHub | ${tag}`,
    openGraph: {
      title: `NoteHub | ${tag}`,
      description: `NoteHub | ${tag}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          height: 1200,
          width: 630,
          alt: "NoteHub",
        },
      ],
      url: `${process.env.NEXT_PUBLIC_URL}/notes/filter/${tag}`,
      type: "article",
    },
  };
}

export default async function Notes({ params }: NotesParams) {
  const { slug } = await params;
  const tag = slug[0] == "all" ? undefined : (slug[0] as Category);
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", "", 1, tag],
    queryFn: () => fetchNotes(1, "", 12, tag),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient category={tag} />
      </HydrationBoundary>
    </>
  );
}
