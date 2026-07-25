import { create } from "zustand";
import { NoteFormValues } from "@/types/noteStore";
import { persist } from "zustand/middleware";

interface NoteDraftStore {
  draft: NoteFormValues;
  setDraft: (note: NoteFormValues) => void;
  clearDraft: () => void;
}

const initialDraft: NoteFormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

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
