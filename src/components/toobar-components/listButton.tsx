import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useEditorStore } from '@/store/use-editor-store';
import { ListIcon, ListOrderedIcon } from 'lucide-react';

const ListButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const lists = [
    {
      label: 'Bullet List',
      icon: ListIcon,
      isActive: () => editor?.isActive('bulletList'),
      onClick: () => editor?.chain().focus().toggleBulletList().run()
    },
    {
      label: 'Ordered List',
      icon: ListOrderedIcon,
      isActive: () => editor?.isActive('orderedList'),
      onClick: () => editor?.chain().focus().toggleOrderedList().run()
    }
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-md"
          title="List"
        >
          <ListIcon className="size-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {lists.map(({ label, onClick, isActive, icon: Icon }) => (
          <button
            key={label}
            onClick={onClick}
            className={cn(
              'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
              isActive() && 'bg-neutral-200/800'
            )}
          >
            <Icon className="size-6" />
            <span className="text-md">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ListButton;
