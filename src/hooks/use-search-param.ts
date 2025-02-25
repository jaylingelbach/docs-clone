import { parseAsString, useQueryState } from 'nuqs';
import { use } from 'react';

export function useSearchParam() {
  return useQueryState(
    'search',
    parseAsString.withDefault('').withOptions({ clearOnDefault: true })
  );
}
