import React, { useState } from 'react';
import { useEditorStore } from '@/store/use-editor-store';
import { MinusIcon, PlusIcon } from 'lucide-react';

const FontSizeButton = () => {
  const editor = useEditorStore((state) => state.editor);
  // Get the current font size from the editor replace 'px' with an empty string
  const currentFontSize =
    editor?.getAttributes('textStyle').fontSize?.replace('px', '') || '16';

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(currentFontSize);
  const [isEditing, setIsEditing] = useState(false);

  // Update the font size in the editor using currentFontSize
  const updateFontSize = (newSize: string) => {
    // size optimized for .chain()
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };

  return (
    <div className="flex items-center gap-0.5">
      <button
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={decrement}
      >
        <MinusIcon className="size-4" />
      </button>
      {isEditing ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChanges}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-10 text-sm text-center border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0"
        />
      ) : (
        <button
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm text-center border-neutral-400 rounded-sm bg-transparent cursor-text"
        >
          {currentFontSize}
        </button>
      )}
      <button
        className="h-7 w-7 shrink-0 flex items-center justify-center rounded-sm hover:bg-neutral-200/80"
        onClick={increment}
      >
        <PlusIcon className="size-4" />
      </button>
    </div>
  );
};

export default FontSizeButton;

// Attempt at updating so that the font size is updated globally and immediately in the editor.
// import React, { useState, useEffect } from 'react';
// import { useEditorStore } from '@/store/use-editor-store';
// import { MinusIcon, PlusIcon } from 'lucide-react';

// const FontSizeButton = () => {
//   const editor = useEditorStore((state) => state.editor);

//   // Get the current font size or use a default
//   const currentFontSize =
//     editor?.getAttributes('textStyle').fontSize?.replace('px', '') || '16';

//   const [fontSize, setFontSize] = useState(currentFontSize);
//   const [inputValue, setInputValue] = useState(currentFontSize);
//   const [isEditing, setIsEditing] = useState(false);

//   // Ensure the editor always applies the selected font size, even if empty
//   useEffect(() => {
//     if (editor && editor.isEditable) {
//       editor
//         .chain()
//         .setMark('textStyle', { fontSize: `${fontSize}px` })
//         .run();

//       // Force immediate update to reflect change
//       editor.view.dispatch(editor.state.tr);
//     }
//   }, [fontSize, editor]);

//   const updateFontSize = (newSize: string) => {
//     const size = parseInt(newSize);
//     if (!isNaN(size) && size > 0) {
//       setFontSize(newSize);
//       setInputValue(newSize);
//       setIsEditing(false);

//       // Apply the new font size globally
//       editor
//         ?.chain()
//         .focus()
//         .setMark('textStyle', { fontSize: `${size}px` })
//         .run();

//       // Force immediate update
//       editor.view.dispatch(editor.state.tr);
//     }
//   };

//   const handleInputChanges = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(e.target.value);
//   };

//   const handleInputBlur = () => {
//     updateFontSize(inputValue);
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === 'Enter') {
//       updateFontSize(inputValue);
//       editor?.commands.focus();
//     }
//   };

//   const increment = () => {
//     const newSize = parseInt(fontSize) + 1;
//     updateFontSize(newSize.toString());
//   };

//   const decrement = () => {
//     const newSize = parseInt(fontSize) - 1;
//     if (newSize > 0) {
//       updateFontSize(newSize.toString());
//     }
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
//             setFontSize(currentFontSize);
//           }}
//           className="h-7 w-10 text-sm text-center border-neutral-400 rounded-sm bg-transparent cursor-text"
//         >
//           {currentFontSize}
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

// export default FontSizeButton;
