export function clearAdditionals() {
    return {
        type: 'CLEAR_ADDITIONALS',
        payload: {},
    } as const;
}
