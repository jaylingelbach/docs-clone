// import { useState } from 'react';

// import { MinusIcon, PlusIcon } from 'lucide-react';
// import { useEditorStore } from '@/store/use-editor-store';

// const LetterSpacingButton = () => {
//   const LETTER_SPACING_OPTIONS = [
//     '0px',
//     '1px',
//     '2px',
//     '3px',
//     '4px',
//     '5px',
//     '10px',
//     '15px'
//   ];
//   const editor = useEditorStore((state) => state.editor);

//   const currentLetterSpacing =
//     editor?.getAttributes('textStyle').letterSpacing?.replace('px', '') || '0';

//   const [letterSpacing, setLetterSpacing] = useState(currentLetterSpacing);
//   const [inputValue, setInputValue] = useState(currentLetterSpacing);
//   const [isEditing, setIsEditing] = useState(false);

//   // Update the letter spacing in the editor
//   const updateLetterSpacing = (newSpacing: string) => {
//     const spacing = parseInt(newSpacing);
//     if (!isNaN(spacing)) {
//       editor
//         ?.chain()
//         .focus()
//         .setMark('textStyle', { letterSpacing: `${spacing}px` })
//         .run();
//       setLetterSpacing(newSpacing);
//       setInputValue(newSpacing);
//       setIsEditing(false);
//     }
//   };

//   const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
//     console.log('handle input change');
//     setInputValue(e.target.value);
//   };

//   const handleInputBlur = () => {
//     updateLetterSpacing(inputValue);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       updateLetterSpacing(inputValue);
//       editor?.commands.focus();
//     }
//   };

//   const increment = () => {
//     console.log('increment');
//     const newSpacing = parseInt(letterSpacing) + 1;
//     updateLetterSpacing(newSpacing.toString());
//   };

//   const decrement = () => {
//     console.log('decrement');
//     const newSpacing = parseInt(letterSpacing) - 1;
//     updateLetterSpacing(newSpacing.toString());
//   };

//   return (
//     <div className="flex items-center gap-0.5">
//       <button
//         className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
//         onClick={decrement}
//       >
//         <MinusIcon className="size-4" />
//       </button>
//       {isEditing ? (
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChanges}
//           onBlur={handleInputBlur}
//           onKeyDown={handleKeyDown}
//           className="h-7 w-10 text-sm text-center border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
//         />
//       ) : (
//         <button
//           onClick={() => {
//             setIsEditing(true);
//             setLetterSpacing(currentLetterSpacing);
//           }}
//           className="h-7 w-10 text-sm text-center border-neutral-400 rounded-sm bg-transparent cursor-text"
//         >
//           {currentLetterSpacing}
//         </button>
//       )}
//       <button
//         className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
//         onClick={increment}
//       >
//         <PlusIcon className="size-4" />
//       </button>
//     </div>
//   );
// };

// export default LetterSpacingButton;
import { useState } from 'react';
import { MinusIcon, PlusIcon, ChevronDownIcon } from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

const letterSpacingOptions = ['-1px', '0px', '1px', '2px', '3px', '4px', '5px'];

const LetterSpacingButton = () => {
  const editor = useEditorStore((state) => state.editor);

  const currentLetterSpacing =
    editor?.getAttributes('textStyle').letterSpacing || '0px';

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
    <div className="flex items-center gap-1">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            className="h-7 w-16 flex justify-between items-center bg-transparent"
            title="Letter Spacing"
            variant="outline"
          >
            {letterSpacing}
            <ChevronDownIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {letterSpacingOptions.map((spacing) => (
            <DropdownMenuItem
              key={spacing}
              onClick={() => updateLetterSpacing(spacing)}
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
