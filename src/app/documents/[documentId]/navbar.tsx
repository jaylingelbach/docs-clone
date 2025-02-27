'use client';

import { memo, useCallback, useMemo } from 'react';
import { BsFilePdf } from 'react-icons/bs';
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger
} from '@/components/ui/menubar';

import { Avatars } from './avatars';
import DocumentInput from './document-input';
import { OrganizationSwitcher, UserButton } from '@clerk/nextjs';
import { useEditorStore } from '@/store/use-editor-store';
import { Inbox } from './inbox';

export const Navbar = memo(() => {
  const { editor } = useEditorStore();

  const insertTable = useCallback(
    ({ rows, cols }: { rows: number; cols: number }) => {
      editor
        ?.chain()
        .focus()
        .insertTable({ rows, cols, withHeaderRow: false })
        .run();
    },
    [editor]
  );

  const handleRedo = useCallback(() => {
    editor?.chain().focus().undo().run();
  }, [editor]);

  const handleUndo = useCallback(() => {
    editor?.chain().focus().redo().run();
  }, [editor]);

  const handleBold = useCallback(() => {
    editor?.chain().focus().toggleBold().run();
  }, [editor]);

  const handleItalic = useCallback(() => {
    editor?.chain().focus().toggleItalic().run();
  }, [editor]);

  const handleUnderline = useCallback(() => {
    editor?.chain().focus().toggleUnderline().run();
  }, [editor]);

  const handleStrikeThrough = useCallback(() => {
    editor?.chain().focus().toggleStrike().run();
  }, [editor]);

  const handleClearFormatting = useCallback(() => {
    editor?.chain().focus().unsetAllMarks().run();
  }, [editor]);

  const tableOptions = useMemo(
    () => [
      { label: '1 x 1', value: 1 },
      { label: '2 x 2', value: 2 },
      { label: '3 x 3', value: 3 },
      { label: '4 x 4', value: 4 }
    ],
    []
  );
  const onDownload = (blob: Blob, filename: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
  };

  const onSaveJSON = () => {
    if (!editor) return;
    const content = editor.getJSON();
    const blob = new Blob([JSON.stringify(content)], {
      type: 'application/json'
    });
    onDownload(blob, 'document.json'); // TODO: use document name
  };

  const onSaveHTML = () => {
    if (!editor) return;
    const content = editor.getHTML();
    const blob = new Blob([content], {
      type: 'text/html'
    });
    onDownload(blob, 'document.html');
  };

  const onSaveText = () => {
    if (!editor) return;
    const content = editor.getText();
    const blob = new Blob([content], {
      type: 'text/plain'
    });
    onDownload(blob, 'document.txt');
  };

  return (
    <nav className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36}></Image>
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          {/* MenuBar */}
          <div className="flex">
            <Menubar className="border-noe bg-transparent shadow-none h-auto p-0">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  File
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="size-4 mr-2" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJSON}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHTML}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={() => window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                    <MenubarItem>
                      <FilePlusIcon className="size-4 mr-2" />
                      New Document
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>
                      <FilePenIcon className="size-4 mr-2" />
                      Rename
                    </MenubarItem>
                    <MenubarItem>
                      <TrashIcon className="size-4 mr-2" />
                      Remove
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem onClick={() => window.print()}>
                      <PrinterIcon className="size-4 mr-2" />
                      Print <MenubarShortcut>⌘ + P</MenubarShortcut>
                    </MenubarItem>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                  <MenubarContent>
                    <MenubarItem onClick={handleUndo}>
                      <Undo2Icon className="size-4 mr-2" />
                      Undo <MenubarShortcut>⌘ + Z</MenubarShortcut>
                    </MenubarItem>
                    <MenubarItem onClick={handleRedo}>
                      <Redo2Icon className="size-4 mr-2" />
                      Redo <MenubarShortcut>⌘ + Y</MenubarShortcut>
                    </MenubarItem>
                    <MenubarSeparator />
                  </MenubarContent>
                </MenubarTrigger>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>Table</MenubarSubTrigger>
                    <MenubarSubContent>
                      {/* dynamically render via table options */}
                      {tableOptions.map(({ label, value }, index) => (
                        <MenubarItem
                          key={index}
                          onClick={() =>
                            insertTable({ rows: value, cols: value })
                          }
                        >
                          {label}
                        </MenubarItem>
                      ))}
                    </MenubarSubContent>
                  </MenubarSub>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="size-4 mr-2" />
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={handleBold}>
                        <BoldIcon className="size-4 mr-2" />
                        Bold <MenubarShortcut>⌘ + B</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={handleUnderline}>
                        <ItalicIcon className="size-4 mr-2" />
                        Italic <MenubarShortcut>⌘ + I</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={handleUnderline}>
                        <UnderlineIcon className="size-4 mr-2" />
                        Underline <MenubarShortcut>⌘ + U</MenubarShortcut>
                      </MenubarItem>
                      <MenubarItem onClick={handleStrikeThrough}>
                        <StrikethroughIcon className="size-4 mr-2" />
                        Strikethrough &nbsp;&nbsp;
                        <MenubarShortcut>⌘ + S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={handleClearFormatting}>
                    <RemoveFormattingIcon className="size-4 mr-2" />
                    Clear Formatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
      <div className="flex gap-3 items-center pl-6">
        <Avatars />
        <Inbox />
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl=""
          afterSelectPersonalUrl=""
        />
        <UserButton />
      </div>
    </nav>
  );
});
export default Navbar;
