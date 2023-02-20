import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions'
import { tState } from '../reducer'

export type tSelectOption = {
    type: 'SELECT_OPTION'
    payload: { selectIndex: number; optionIndex: number }
}

export function SelectOption(action: tSelectOption, state: tState) {
    const { selectIndex, optionIndex } = action.payload

    const productSelect = state.productSelects[selectIndex]

    const selectedCount = productSelect.options.filter(
        (option) => option.selected
    ).length

    if (
        selectedCount < productSelect.max_selected_options &&
        !productSelect.options[optionIndex].selected
    ) {
        return returnExpectedData(
            state,
            selectIndex,
            optionIndex,
            productSelect
        )
    } else {
        return {
            ...state,
            productSelects: state.productSelects.map((select, index) => {
                if (index === selectIndex) {
                    return {
                        ...productSelect,
                        options: productSelect.options.map((option, index) => {
                            if (index === optionIndex) {
                                return {
                                    ...option,
                                    selected: false,
                                }
                            }
                            return option
                        }),
                    }
                }
                return select
            }),
        }
    }
}

function returnExpectedData(
    state: tState,
    selectIndex: number,
    optionIndex: number,
    productSelect: tSelectWithOptions
) {
    return {
        ...state,
        productSelects: state.productSelects.map((select, index) => {
            if (index === selectIndex) {
                return {
                    ...productSelect,
                    options: productSelect.options.map((option, index) => {
                        if (index === optionIndex) {
                            return {
                                ...option,
                                selected: true,
                            }
                        }
                        return option
                    }),
                }
            }
            return select
        }),
    }
}
