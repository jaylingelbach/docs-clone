import { useState } from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const letterSpacingOptions = [
  '-1px',
  '-0.5px',
  '0px',
  '1px',
  '2px',
  '3px',
  '4px',
  '5px'
];

const LetterSpacingButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const currentLetterSpacing =
    editor?.getAttributes('textStyle').letterSpacing || '0 px';

  const [letterSpacing, setLetterSpacing] = useState(currentLetterSpacing);

  // Update the letter spacing in the editor
  const updateLetterSpacing = (newSpacing: string) => {
    editor
      ?.chain()
      .focus()
      .setMark('textStyle', { letterSpacing: newSpacing })
      .run();
    setLetterSpacing(newSpacing);
  };

  return (
    <div className="flex items-center gap-1 pr-1 pl-1">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className="h-7 min-w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-md"
        >
          <Button
            className="h-7 w-16 flex justify-between items-center bg-transparent text-md"
            title="Letter Spacing"
            variant="outline"
          >
            {letterSpacing}
            <ChevronDownIcon className="size-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
          {letterSpacingOptions.map((spacing) => (
            <DropdownMenuItem
              key={spacing}
              onClick={() => updateLetterSpacing(spacing)}
              className="flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80"
            >
              {spacing}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default LetterSpacingButton;
