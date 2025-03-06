import React, { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Input } from '../ui/input';
import { ImageIcon, SearchIcon, UploadIcon } from 'lucide-react';
import { useEditorStore } from '@/store/use-editor-store';

const ImageButton = () => {
  const editor = useEditorStore((state) => state.editor);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
    setImageUrl('');
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl('');
      setIsDialogOpen(false);
    }
  };

  const onUpload = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };
    input.click();
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="h-7 min-w-7 shrink-0 flex flex-col items-center justify-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm"
            title="Insert Image"
          >
            <ImageIcon className="size-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              onUpload();
            }}
          >
            <UploadIcon className="size-4 mr-2" />
            Upload
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsDialogOpen(true);
            }}
          >
            <SearchIcon className="size-4 mr-2" />
            Paste Image URL
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle> Insert Image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="https://example.com/image.jpg"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageButton;
