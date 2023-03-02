export function changeAdditionalQuantityAction(
    isIncrement: boolean,
    additionalId: number
) {
    return {
        type: 'CHANGEADDITIONALQUANTITY',
        payload: { isIncrement, additionalId },
    } as const;
}
