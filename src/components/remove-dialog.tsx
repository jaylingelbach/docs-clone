'use client';

import { useState } from 'react';

import { api } from '../../convex/_generated/api';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog';
import { Id } from '../../convex/_generated/dataModel';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';

interface RemoveDialogProps {
  documentId: Id<'documents'>;
  children: React.ReactNode;
}

export const RemoveDialog = ({ documentId, children }: RemoveDialogProps) => {
  const [isRemoving, setIsRemoving] = useState(false);
  const remove = useMutation(api.documents.removeById);

  const handleRemoveClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRemoving(true);
    remove({ id: documentId })
      .catch(() => toast.error('Something went wrong'))
      .then(() => {
        toast.success('Document successfully deleted');
        // TODO: use loading screen. router push is not working due to catch firing faster than then.
        window.location.href = '/';
      })
      .finally(() => {
        setIsRemoving(false);
      });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent onClick={(e) => e.stopPropagation()}>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            document.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction disabled={isRemoving} onClick={handleRemoveClick}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
