import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Input } from '../ui/input';
import { Link2Icon } from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';

const LinkButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [value, setValue] = useState('');

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
    setValue('');
  };
  return (
    <DropdownMenu
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          const currentHref = editor?.getAttributes('link').href || '';
          if (value === '') setValue(currentHref);
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
          title="Add Link"
        >
          <Link2Icon className="size-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button onClick={() => onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LinkButton;
