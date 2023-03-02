import { iAdditional } from '@/src/types/types';

export function selectNewAdditionalAction(additional: iAdditional['data']) {
    return {
        type: 'SELECTADDITIONALS',
        payload: { additional },
    } as const;
}
