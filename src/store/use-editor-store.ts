import { create } from 'zustand';
import type { Editor } from '@tiptap/react';

interface EditorState {
  editor: Editor | null;
  setEditor: (editor: Editor | null) => void; // Allow null for cleanup
}

export const useEditorStore = create<EditorState>((set) => ({
  editor: null,
  setEditor: (editor) => set({ editor })
}));
