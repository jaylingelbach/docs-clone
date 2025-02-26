'use server';

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function getUsers() {
  const { sessionClaims } = await auth();
  console.log({ sessionClaims }, 'sessionClaims');
  const clerk = await clerkClient();

  // Get users for specific organization
  const response = await clerk.users.getUserList({
    organizationId: [sessionClaims?.org_id as string]
  });

  const users = response.data.map((user) => ({
    id: user.id,
    name:
      user.fullName ?? user.primaryEmailAddress?.emailAddress ?? 'Anonymous',
    avatar: user.imageUrl
  }));
  return users;
}
