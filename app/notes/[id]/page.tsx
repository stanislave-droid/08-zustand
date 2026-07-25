import { fetchNoteById } from "@/lib/api";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import NoteDetailsClient from "./NoteDetails.client";
import { Metadata } from "next";

interface NoteProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: NoteProps): Promise<Metadata> {
  const { id } = await params;
  const note = await fetchNoteById(id);

  return {
    title: `NoteHub | ${note.title}`,
    description: `${note.content.slice(0, 30)}`,
    openGraph: {
      title: `NoteHub | ${note.title}`,
      description: `${note.content.slice(0, 30)}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
          height: 1200,
          width: 630,
          alt: "NoteHub",
        },
      ],
      url: `${process.env.NEXT_PUBLIC_URL}/notes/${id}`,
      type: "article",
    },
  };
}

export default async function NoteDetails({ params }: NoteProps) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient />
    </HydrationBoundary>
  );
}
