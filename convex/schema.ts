import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  documents: defineTable({
    title: v.string(),
    initialContent: v.optional(v.string()), // if using a template
    ownerId: v.string(),
    roomId: v.optional(v.string()), // collaboration room
    organizationId: v.optional(v.string())
  })
    .index('by_owner_id', ['ownerId'])
    .index('by_organization_id', ['organizationId'])
    // search index for document
    .searchIndex('search_title', {
      searchField: 'title',
      filterFields: ['ownerId', 'organizationId'] // filter by owner or organization so it doesn't show other's documents.
    })
});
