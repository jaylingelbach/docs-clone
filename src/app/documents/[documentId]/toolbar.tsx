'use client';
import {
  BoldIcon,
  ItalicIcon,
  ListTodoIcon,
  LucideIcon,
  MessageSquarePlus,
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
import FontFamilyButton from '@/components/fontFamilyButton';
import HeadingLevelButton from '@/components/headingLevelButton';

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon
}: ToolbarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        'text-small h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80',
        isActive && 'bg-neutral-200/800'
      )}
    >
      <Icon className="size-4" />
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
        icon: MessageSquarePlus,
        onClick: () => {
          console.log('Todo Comment');
        },
        isActive: false //TODO: Implement.
      },
      {
        label: 'List Todo',
        icon: ListTodoIcon,
        onClick: () => {
          editor?.chain().focus().toggleTaskList().run();
        },
        isActive: editor?.isActive('taskList') //TODO: Implement.
      },
      {
        label: 'Remove Formatting',
        icon: RemoveFormattingIcon,
        onClick: () => {
          editor?.chain().focus().unsetAllMarks().run();
        }
      }
    ]
  ];
  return (
    <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      {sections[1].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-400" />
      {sections[2].map((item) => (
        <ToolbarButton key={item.label} {...item} />
      ))}
      {/* TODO: Font family */}
      <FontFamilyButton />
      {/* TODO: Heading */}
      <HeadingLevelButton />
      {/* TODO: Font size */}
      {/* TODO: Text Color */}
      {/* TODO: HIGHLIGHT COLOR */}
      {/* TODO: Link */}
      {/* TODO: Image */}
      {/* TODO: Align */}
      {/* TODO: line height */}
      {/* TODO: List*/}
    </div>
  );
};
