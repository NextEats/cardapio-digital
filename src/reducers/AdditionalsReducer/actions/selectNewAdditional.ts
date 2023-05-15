import { iAdditional } from '@/src/types/iAdditional';

export function selectNewAdditionalAction(additional: iAdditional['data']) {
  return {
    type: 'SELECTADDITIONALS',
    payload: { additional },
  } as const;
}
