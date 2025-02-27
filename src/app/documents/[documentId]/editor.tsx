'use client';

import Code from '@tiptap/extension-code';
import { Color } from '@tiptap/extension-color';
import { useEditor, EditorContent } from '@tiptap/react';
import FontFamily from '@tiptap/extension-font-family';
import { FontSizeExtension } from '@/extensions/font-size';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import ImageResize from 'tiptap-extension-resize-image';
import { LineHeightExtension } from '@/extensions/line-height';
import Link from '@tiptap/extension-link';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TaskItem from '@tiptap/extension-task-item';
import TaskList from '@tiptap/extension-task-list';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import { useEditorStore } from '@/store/use-editor-store';
import { useLiveblocksExtension } from '@liveblocks/react-tiptap';
import { useStorage } from '@liveblocks/react/suspense';

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';
import { Ruler } from './ruler';
import { Threads } from './threads';

export const Editor = () => {
  const leftMargin =
    useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;
  const rightMargin =
    useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

  const { setEditor } = useEditorStore();

  const liveblocks = useLiveblocksExtension({
    offlineSupport_experimental: true
  });

  const editor = useEditor({
    autofocus: true,g
    immediatelyRender: false,
    onCreate({ editor }) {
      setEditor(editor);
    },
    onDestroy() {
      setEditor(null);
    },
    onUpdate({ editor }) {
      setEditor(editor);
    },
    onSelectionUpdate({ editor }) {
      setEditor(editor);
    },
    onTransaction({ editor }) {
      setEditor(editor);
    },
    onFocus({ editor }) {
      setEditor(editor);
    },
    onBlur({ editor }) {
      setEditor(editor);
    },
    onContentError({ editor }) {
      setEditor(editor);
    },
    editorProps: {
      attributes: {
        style: `padding-left: ${leftMargin}px; padding-right: ${rightMargin}px;`,
        class:
          'focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10 pr-14 pb-10 cursor-text'
      }
    },
    extensions: [
      Color,
      FontFamily,
      FontSizeExtension,
      Highlight.configure({
        multicolor: true
      }),
      Image,
      ImageResize,
      LineHeightExtension,
      Link.configure({
        openOnClick: true,
        autolink: true,
        defaultProtocol: 'https'
      }),
      liveblocks,
      StarterKit.configure({
        history: false
      }),
      Table.configure({
        resizable: true
      }),
      TableRow,
      TableHeader,
      TableCell,
      TaskList,
      TaskItem.configure({
        nested: true
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      TextStyle,
      Underline
    ]
  });

  return (
    <div className="size-full overflow-x-auto bg-editor-bg px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        <EditorContent editor={editor} />
        <Threads editor={editor} />
        {/* TODO: add floating toolbar editor from liveblocks. example in docs need to configure bold italic etc */}
        {/* <FloatingToolbar editor={editor} /> */}
      </div>
    </div>
  );
};
