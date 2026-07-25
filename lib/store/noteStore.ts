import { create } from "zustand";
import { initialDraft } from "@/types/noteStore";
import { persist } from "zustand/middleware";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: string;
}

interface NoteDraftStore {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
}

export const useNoteDraftStore = create<NoteDraftStore>()(
  persist(
    (set) => ({
      draft: initialDraft,
      setDraft: (note) => set(() => ({ draft: note })),
      clearDraft: () => set(() => ({ draft: initialDraft })),
    }),
    {
      name: "note-draft-store",
      partialize: (state) => ({ draft: state.draft }),
    },
  ),
);
