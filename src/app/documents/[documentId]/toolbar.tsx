'use client';
import {
  BoldIcon,
  Code2Icon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlusIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormattingIcon,
  SpellCheckIcon,
  UnderlineIcon,
  Undo2Icon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

import { useEditorStore } from '@/store/use-editor-store';
import FontFamilyButton from '@/components/toobar-components/fontFamilyButton';
import HeadingLevelButton from '@/components/toobar-components/headingLevelButton';
import TextColorButton from '@/components/toobar-components/textColorButton';
import HighlightColorButton from '@/components/toobar-components/highlightColorButton';
import ImageButton from '@/components/toobar-components/imageButton';
import LinkButton from '@/components/toobar-components/linkButton';
import AlignButton from '@/components/toobar-components/alignButton';
import ListButton from '@/components/toobar-components/listButton';
import FontSizeButton from '@/components/toobar-components/fontSizeButton';
import LineHeightButton from '@/components/toobar-components/lineHeightButton';
import LetterSpacingButton from '@/components/toobar-components/letterSpacingButton';

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label
}: ToolbarButtonProps & { label: string }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/80'
      )}
      title={label}
    >
      <Icon className="size-6" />
    </button>
  );
};

export const Toolbar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: 'Undo',
        icon: Undo2Icon,
        onClick: () => {
          editor?.chain().focus().undo().run();
        }
      },
      {
        label: 'Redo',
        icon: Redo2Icon,
        onClick: () => {
          editor?.chain().focus().redo().run();
        }
      },
      {
        label: 'Print',
        icon: PrinterIcon,
        onClick: () => {
          window.print();
        }
      },
      //   TODO: Add third party spellcheck. This sucks lol. Maybe use a package that gives suggestions like Grammarly???
      {
        label: 'Spellcheck',
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute('spellcheck');
          editor?.view.dom.setAttribute(
            'spellcheck',
            current === 'false' ? 'true' : 'false'
          );
        }
      }
    ],
    [
      {
        label: 'Bold',
        icon: BoldIcon,
        isActive: editor?.isActive('bold'),
        onClick: () => {
          editor?.chain().focus().toggleBold().run();
        }
      },
      {
        label: 'Italic',
        icon: ItalicIcon,
        isActive: editor?.isActive('italic'),
        onClick: () => {
          editor?.chain().focus().toggleItalic().run();
        }
      },
      {
        label: 'Underline',
        icon: UnderlineIcon,
        isActive: editor?.isActive('underline'),
        onClick: () => {
          editor?.chain().focus().toggleUnderline().run();
        }
      }
    ],
    [
      {
        label: 'Comment',
        icon: MessageSquarePlusIcon,
        onClick: () => editor?.chain().focus().addPendingComment().run(),
        isActive: editor?.isActive('liveblocksCommentMark')
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive('taskList') //TODO: Implement.
      },
      {
        label: 'Code',
        icon: Code2Icon,
        isActive: editor?.isActive('codeBlock'),
        onClick: () => editor?.chain().focus().toggleCode().run()
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run()
      }
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center justify-between gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} label={item.label} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      <HeadingLevelButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      <FontFamilyButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      <FontSizeButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} label={item.label} />
      ))}
      <TextColorButton />
      <HighlightColorButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      <LinkButton />
      <ImageButton />

      <AlignButton />
      <LineHeightButton />
      <ListButton />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} label={item.label} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      <LetterSpacingButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
    </div>
  );
};
