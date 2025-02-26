'use client';

import { ReactNode } from 'react';
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense';
import { useParams } from 'next/navigation';

export function Room({ children }: { children: ReactNode }) {
  const params = useParams();
  console.log('params: ', params);

  return (
    <LiveblocksProvider
      publicApiKey={
        'pk_dev_IGPy5kqNmqaH-Uj6akL8OgV_cvBwH8Zj7qk_XVzGoRqzDcC-sclTQsKH2XFzu4Di'
      }
    >
      <RoomProvider id={params.documentId as string}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
