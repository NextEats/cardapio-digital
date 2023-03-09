import SelectComponent from './SelectComponent';

interface iProductOptions {
    product_id: string;
    productSelects: any;
    selectOption: any;
}

export default function ProductOptions({
    product_id,
    productSelects,
    selectOption,
}: iProductOptions) {
    return (
        <div>
            {productSelects.map((select: any, selectIndex: any) => (
                <SelectComponent
                    select={select}
                    key={selectIndex}
                    index={selectIndex}
                    handleOptionClick={(optionIndex: number) => {
                        selectOption(selectIndex, optionIndex);
                    }}
                />
            ))}
        </div>
    );
}
