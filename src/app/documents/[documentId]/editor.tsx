'use client';

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
import { ClientSideSuspense, useStorage } from '@liveblocks/react/suspense';
import {
  AnchoredThreads,
  FloatingToolbar,
  FloatingComposer,
  FloatingThreads
} from '@liveblocks/react-tiptap';
import { useThreads } from '@liveblocks/react/suspense';

import { LEFT_MARGIN_DEFAULT, RIGHT_MARGIN_DEFAULT } from '@/constants/margins';
import { letterSpacingExtension } from '@/extensions/letter-spacing';
import { PAPER_WIDTH_DEFAULT } from '@/constants/paper';
import { Ruler } from './ruler';
import { Threads } from './threads';

interface EditorProps {
  initialContent?: string | undefined;
}

export const Editor = ({ initialContent }: EditorProps) => {
  const leftMargin =
    useStorage((root) => root.leftMargin) ?? LEFT_MARGIN_DEFAULT;

  const rightMargin =
    useStorage((root) => root.rightMargin) ?? RIGHT_MARGIN_DEFAULT;

  const { setEditor } = useEditorStore();

  const liveblocks = useLiveblocksExtension({
    initialContent,
    offlineSupport_experimental: true
  });

  const { threads } = useThreads({ query: { resolved: false } });

  const editor = useEditor({
    autofocus: true,
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
        class: `focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[${PAPER_WIDTH_DEFAULT}px] pt-10 pr-14 pb-10 cursor-text`
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
      letterSpacingExtension,
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
      TextStyle.extend({
        addAttributes() {
          return {
            letterSpacing: {
              default: null,
              parseHTML: (element) => element.style.letterSpacing || null,
              renderHTML: (attributes) => {
                if (!attributes.letterSpacing) return {};
                return { style: `letter-spacing: ${attributes.letterSpacing}` };
              }
            }
          };
        }
      }),
      Underline
    ]
  });

  return (
    <div className="size-full overflow-x-auto bg-editor-bg px-4 print:p-0 print:bg-white print:overflow-visible">
      <Ruler />
      <div
        className={`min-w-max flex justify-center w-[${PAPER_WIDTH_DEFAULT}px] py-4 print:py-0 mx-auto print:w-full print:min-w-0`}
      >
        <EditorContent editor={editor} />
        <Threads editor={editor} />
        <ClientSideSuspense fallback={<div>Loading...</div>}>
          <FloatingToolbar editor={editor} />
          <FloatingComposer editor={editor} style={{ width: '350px' }} />
          <FloatingThreads
            editor={editor}
            threads={threads}
            className="w-[350px] block md:hidden"
          />
          <AnchoredThreads
            editor={editor}
            threads={threads}
            className="w-[350px] hidden sm:block md:hidden lg:hidden xl:hidden"
          />
        </ClientSideSuspense>
      </div>
    </div>
  );
};
