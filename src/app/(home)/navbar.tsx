import { Suspense } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { UserButton, OrganizationSwitcher } from '@clerk/nextjs';

import { SearchInput } from './search-input';

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-full w-full">
      <div className="flex gap-3 items-center shrink-0 pr-6">
        <Link href="/">
          <Image src="/logo.svg" alt="Logo" width={36} height={36} />
        </Link>
        <h3 className="text-xl">Brown Bear Docs</h3>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchInput />
      </Suspense>
      <div className="flex gap-3 items-center pl-6">
        <OrganizationSwitcher
          afterCreateOrganizationUrl="/"
          afterLeaveOrganizationUrl="/"
          afterSelectOrganizationUrl=""
          afterSelectPersonalUrl=""
        />
        <UserButton />
      </div>
    </nav>
  );
};
export default Navbar;
