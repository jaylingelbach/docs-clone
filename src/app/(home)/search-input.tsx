'use client';

import { useRef, useState } from 'react';

import { SearchIcon, XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSearchParam } from '@/hooks/use-search-param';

export const SearchInput = () => {
  const [search, setSearch] = useSearchParam();
  const [value, setValue] = useState(search);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearch(value);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setValue('');
    setSearch('');
    inputRef.current?.blur();
  };

  return (
    <div className="flex-1 flex items-center justify-center">
      <form className="relative max-w-[720px] w-full" onSubmit={handleSubmit}>
        <Input
          className="md:text-base placeholder:text-neutral-800 px-14 w-full border-none 
          focus-visible:shadow-[0_1px_1px_0_rgba(65,69,73,.3),0_1px_3px_1px_rgba(65,69,73,.15)] bg-[#F0F4F8] 
          rounded-full h-[48px] focus-visible:ring-0 focus-visible:bg-white"
          onChange={handleChange}
          placeholder="Search"
          ref={inputRef}
          value={value}
        />
        <Button
          className="absolute left-4 top-1/2 transform -translate-y-1/2 [&_svg]:size-5 rounded-full"
          type="submit"
          size="icon"
          variant="ghost"
        >
          <SearchIcon />
        </Button>
        {value && (
          <Button
            className="absolute right-3 top-1/2 transform -translate-y-1/2 [&_svg]:size-5 rounded-full"
            onClick={handleClear}
            type="button"
            size="icon"
            variant="ghost"
          >
            <XIcon />
          </Button>
        )}
      </form>
    </div>
  );
};
export default SearchInput;
