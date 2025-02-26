'use client';

import { useState } from 'react';
import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

import { templates } from '@/constants/templates';
import { api } from '../../../convex/_generated/api';
export const TemplatesGallery = () => {
  const [isCreating, setIsCreating] = useState(false);

  const router = useRouter();
  // Mutation objects can be called like functions to request execution of the corresponding Convex function, or further configured with optimistic updates.
  // The value returned by this hook is stable across renders, so it can be used by React dependency arrays and memoization logic relying on object identity without causing rerenders.
  const create = useMutation(api.documents.create);

  const onTemplateClick = async (title: string, initialContent: string) => {
    setIsCreating(true);
    create({ title, initialContent })
      .then((documentId) => {
        router.push(`/documents/${documentId}`);
        toast.success('Document successfully created');
      })
      .catch(() => {
        toast.error('Something went wrong');
      })
      .finally(() => {
        setIsCreating(false);
      });
  };

  return (
    <div className="bg-[#F1F3F4]">
      <div className="max-w-screen-xl mx-auto px-16 py-6 flex flex-col gap-y-4">
        <h3 className="font-medium">Start a new document</h3>
        <Carousel>
          <CarouselContent className="-ml-4">
            {templates.map((template) => (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.285714%] pl-4"
              >
                <div
                  className={cn(
                    'aspect-[3/4] flex flex-col gap-y-2.5',
                    isCreating && 'pointer-events-none opacity-50'
                  )}
                >
                  <button
                    disabled={isCreating}
                    // TODO: Add initial content
                    onClick={() => onTemplateClick(template.label, '')}
                    style={{
                      backgroundImage: `url(${template.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat'
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border hover:bg-blue-50 transition flex flex-col items-center justify-center gap-y-4 bg-white"
                  />
                  <p className="text-sm font-medium truncate">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default TemplatesGallery;
