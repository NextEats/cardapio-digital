import { TableContext } from '@/src/contexts/TableControlContext';
import useProductSelectsWithOptions from '@/src/hooks/useProductSelectsWithOptions';
import { addProductAction } from '@/src/reducers/tableReducer/action';
import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useContext } from 'react';
import { FiX } from 'react-icons/fi';
import SelectComponent from '../../home/ProductModal/components/SelectComponent';
import { CardapioDigitalButton } from '../cardapio-digital/CardapioDigitalButton';
import TableAdditionals from './TableAdditionals';

export default function ProductModal() {
    const { viewProduct, setViewProduct, tableState, tableDispatch, setIsOpenedProductTableModal, additionals, productAdditionals } =
        useContext(TableContext);
    const { productSelects, selectOption } = useProductSelectsWithOptions(
        viewProduct ? viewProduct?.id!.toString() : ''
    );

    const additionalByProductId = additionals.filter((a) => {
        return productAdditionals.some(
            (pa) => pa.id === a.id && pa.product_id === viewProduct?.id
        );
    });

    return (
        <div>
            <Dialog.Root open={viewProduct !== null}>
                <Dialog.Trigger></Dialog.Trigger>
                <Dialog.Portal>
                    <Dialog.Overlay
                        onClick={() => setViewProduct(null)}
                        className="w-screen h-screen flex items-center justify-center bg-black fixed inset-0 z-10 opacity-40 transition-all duration-300 ease-in-out"
                    />
                    <Dialog.Content className="fixed top-[14vh] right-1/2 z-20 translate-x-1/2 rounded-lg w-[350px] 2xs:w-[435px] sm:w-[600px] lg:w-[900px] max-h-[68vh] bg-white shadow-md p-6">
                        <Dialog.Title className="text-base w-full flex items-center text-center font-semibold mb-3">
                            {/* <input type='text' onChange={handleFilter} placeholder="pesquisar" className='mb-3 w-[50%]' /> */}
                        </Dialog.Title>
                        <div className=" max-h-[400px] xs:max-h-[452px] overflow-auto mb-3 scrollbar-custom pr-2 py-2">
                            <div className="flex flex-col sm:grid sm:grid-cols-2 gap-10">
                                <div className="flex flex-col gap-3">
                                    <Image
                                        className="rounded-md w-full"
                                        alt=""
                                        width={200}
                                        height={200}
                                        src={viewProduct?.picture_url!}
                                    />
                                    <h2 className=""> {viewProduct?.name} </h2>
                                    <p> {viewProduct?.description} </p>
                                    <span className="">
                                        {' '}
                                        R$ {viewProduct?.price}{' '}
                                    </span>
                                </div>

                                <div className="flex flex-col gap-3 ">
                                    <div>
                                        {productSelects.map(
                                            (select, selectIndex) => (
                                                <SelectComponent
                                                    select={select}
                                                    key={selectIndex}
                                                    index={selectIndex}
                                                    handleOptionClick={(
                                                        optionIndex: number
                                                    ) => {
                                                        selectOption(
                                                            selectIndex,
                                                            optionIndex
                                                        );
                                                    }}
                                                />
                                            )
                                        )}
                                    </div>

                                    {additionalByProductId.length !== 0 ? <h2> Adicionais </h2> : null}

                                    <TableAdditionals />
                                </div>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-end gap-3">
                            <span className="text-lg font-semibold text-green-500">
                                R$
                                {tableState.totalPrice.toLocaleString('pt-BR', {
                                    minimumFractionDigits: 2,
                                    maximumFractionDigits: 2,
                                })}
                            </span>
                            <CardapioDigitalButton
                                name="Confirmar"
                                h="h-9"
                                w="w-44"
                                onClick={() => {
                                    setViewProduct(null)
                                    setIsOpenedProductTableModal(false)
                                    tableDispatch(
                                        addProductAction(
                                            viewProduct!,
                                            productSelects
                                        )
                                    )
                                }
                                }
                            />
                        </div>
                        <Dialog.Close
                            className="fixed top-3 right-3 text-gray-600"
                            onClick={() => setViewProduct(null)}
                        >
                            <FiX size={22} />
                        </Dialog.Close>
                    </Dialog.Content>
                </Dialog.Portal>
            </Dialog.Root>
        </div>
    );
}
