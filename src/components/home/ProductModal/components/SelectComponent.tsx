import { tSelectWithOptions } from '@/src/fetch/productSelects/getProductSelectWithOptions';
import Image from 'next/image';
import stringToNormalForm from '../../../../helpers/stringToNormalForm';

interface iSelectComponentProps {
    select: tSelectWithOptions;
    index: number;
    handleOptionClick: Function;
}

export default function SelectComponent({
    select,
    index,
    handleOptionClick,
}: iSelectComponentProps) {
    return (
        <fieldset className="mb-10" key={index}>
            <span className="font-bold text-lg text-[#3a3a3a]">
                {select.name}
            </span>

            {select.max_selected_options > 1 && (
                <span className="text-sm text-[#3a3a3a] pl-3">
                    Selecione até {select.max_selected_options} opções
                </span>
            )}
            {select.max_selected_options === 1 && (
                <span className="text-sm text-[#3a3a3a] pl-3">
                    Selecione uma opção
                </span>
            )}

            <div className="flex mt-8 flex-wrap gap-2">
                {select.options?.map((option: any, optionIndex) => {
                    if (!option.active) {
                        return null;
                    }

                    return (
                        <div
                            key={option.id}
                            onClick={() => {
                                handleOptionClick(optionIndex);
                            }}
                        >
                            <label
                                className=""
                                htmlFor={
                                    stringToNormalForm(select.name) + option.id
                                }
                            >
                                <div
                                    className={`w-[130px] h-[130px] rounded-lg relative cursor-pointer ${
                                        option.selected
                                            ? 'selected'
                                            : 'unselected'
                                    }`}
                                >
                                    <div className="w-full h-full absolute rounded-lg z-10 bg-gradient-to-t from-[#000000ff] via-[#00000063] to-[#00000000]"></div>
                                    <span className="absolute bottom-1 left-1 z-20 text-white-300 text-sm font-medium">
                                        {option.name}
                                    </span>
                                    {option.picture_url && (
                                        <Image
                                            src={option.picture_url}
                                            alt={option.name}
                                            className={
                                                'wi-full h-full relative rounded-lg object-cover'
                                            }
                                            width={326}
                                            height={358}
                                        />
                                    )}
                                </div>
                            </label>
                            <input
                                type="radio"
                                name={stringToNormalForm(select.name)}
                                value={
                                    stringToNormalForm(select.name) + option.id
                                }
                                defaultChecked={option.is_default_value}
                                style={{ display: 'none' }}
                            />
                        </div>
                    );
                })}
            </div>
        </fieldset>
    );
}
