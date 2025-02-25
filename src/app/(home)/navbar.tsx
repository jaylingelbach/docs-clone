import Link from 'next/link';
import Image from 'next/image';
import { SearchInput } from './search-input';
import { Suspense } from 'react';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Brown Bear Docs</h3>
      </div>
      <Suspense>
        <SearchInput />
      </Suspense>
      {/* <div/> later will be login logout.... */}
      <div />
    </nav>
  );
};

export default Navbar;
