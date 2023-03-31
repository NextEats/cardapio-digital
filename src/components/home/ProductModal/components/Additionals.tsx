import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { tState } from '@/src/reducers/AdditionalsReducer/reducer';
import { supabase } from '@/src/server/api';
import { iAdditional, iAdditionals } from '@/src/types/types';
import Image from 'next/image';
import { Dispatch, useContext, useEffect, useState } from 'react';
import { BsPlusCircleFill } from 'react-icons/bs';
import { FaMinus, FaPlus } from 'react-icons/fa';
import { changeAdditionalQuantityAction } from '../../../../reducers/AdditionalsReducer/actions/changeQuantityAction';
import { selectNewAdditionalAction } from '../../../../reducers/AdditionalsReducer/actions/selectNewAdditional';
interface iAdditionalsProps {
    product_id: string;
    state: tState;
    dispatch: Dispatch<any>;
}

export default function Additionals({
    product_id,
    state,
    dispatch,
}: iAdditionalsProps) {
    const [additionalsGrupedCategory, setAdditionalsGroupedCategory] = useState<
        | {
              categoryName: string;
              categoryOrder: number;
              additionals: iAdditionals['data'];
          }[]
        | null
    >([]);

    const restaurant = useContext(DigitalMenuContext).restaurant;

    useEffect(() => {
        async function getAdditionalsCategories() {
            const getAddCat = await supabase
                .from('additional_categories')
                .select()
                .eq('restaurant_id', restaurant?.id);

            console.log('getAddCat', getAddCat);

            if (getAddCat.data === null) return;
            for (let i = 0; i < getAddCat.data?.length!; i++) {
                const additionalsFiltered = state.additionals.filter(
                    (add) => add.additional_category_id === getAddCat.data[i].id
                );
                if (
                    additionalsGrupedCategory?.some(
                        (addC) => addC.categoryName === getAddCat.data[i].name!
                    )
                )
                    return;
                setAdditionalsGroupedCategory((state) => [
                    ...state!,
                    {
                        categoryName: getAddCat.data[i].name!,
                        categoryOrder: getAddCat.data[i].category_order!,
                        additionals: additionalsFiltered,
                    },
                ]);
            }
            setAdditionalsGroupedCategory((state) => {
                const sortedCategories = [...state!].sort(
                    (a, b) => a.categoryOrder - b.categoryOrder
                );
                return sortedCategories;
            });
        }
        getAdditionalsCategories();
    }, [restaurant, state.additionals, additionalsGrupedCategory]);

    function handleSelectAdditional(additional: iAdditional['data']) {
        dispatch(selectNewAdditionalAction(additional));
    }

    return (
        <div>
            <p className="text-xl font-semibold"> Adicionais </p>

            {additionalsGrupedCategory
                ? additionalsGrupedCategory.map(
                      (additionalByCategory, index) => {
                          if (additionalByCategory.additionals.length === 0)
                              return;
                          return (
                              <div key={index} className='grid sm:grid-col-2 lg:grid-cols-2'>
                                  <p className="text-lg mt-4 lg:col-span-2">
                                      {additionalByCategory.categoryName}
                                  </p>
                                  {additionalByCategory.additionals.map(
                                      (additional) => {
                                          const additionalHasAlreadyBeenSelected =
                                              state.quantityAdditionals.some(
                                                  (aq) =>
                                                      aq.additionalId ===
                                                      additional.id
                                              );
                                          const additionalQuantity =
                                              state.quantityAdditionals.find(
                                                  (aq) =>
                                                      aq.additionalId ===
                                                      additional.id
                                              );
                                          return (
                                                <div
                                                    key={additional.id}
                                                    className=" pr-4 h-[60px] shadow-md rounded-md relative bg-white-300 mt-3 mr-3"
                                                    >
                                                    <div className="flex flex-1 h-full items-center gap-2">
                                                        <Image
                                                            src={
                                                                additional.picture_url
                                                            }
                                                            className="rounded-tl-md rounded-bl-md h-full"
                                                            alt={additional?.name}
                                                            width={91}
                                                            height={200}
                                                        />
                                                        <div className=" flex flex-1 flex-col">
                                                            <p className="font-bold text-black text-sm ">
                                                                {additional?.name}
                                                            </p>
                                                            <p className="font-medium text-xs text-black ">
                                                                R$
                                                                {
                                                                    additional?.price
                                                                }
                                                            </p>
                                                        </div>
                                                        <div>
                                                            {!additionalHasAlreadyBeenSelected ? (
                                                                <BsPlusCircleFill
                                                                    size={24}
                                                                    className="text-gray-500 cursor-pointer"
                                                                    onClick={() =>
                                                                        handleSelectAdditional(
                                                                            additional
                                                                        )
                                                                    }
                                                                />
                                                            ) : (
                                                                <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                                                                    <button
                                                                        className="w-6 text-md flex items-center justify-center"
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                changeAdditionalQuantityAction(
                                                                                    false,
                                                                                    additional.id
                                                                                )
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaMinus />
                                                                    </button>
                                                                    <span className="">
                                                                        {additionalQuantity
                                                                            ? additionalQuantity.quantity
                                                                            : ''}
                                                                    </span>
                                                                    <button
                                                                        className="w-6 text-md flex items-center justify-center"
                                                                        onClick={() =>
                                                                            dispatch(
                                                                                changeAdditionalQuantityAction(
                                                                                    true,
                                                                                    additional.id
                                                                                )
                                                                            )
                                                                        }
                                                                    >
                                                                        <FaPlus />
                                                                    </button>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                          );
                                      }
                                  )}
                              </div>
                          );
                      }
                  )
                : null}
        </div>
    );
}
//  if (data) {
//      return (
//          <div className="mb-12">
//              <h2 className="mb-5 font-bold  text-lg text-[#3a3a3a]">
//                  Adicionais
//              </h2>
//              {data.map((additional: any, index: number) => {
//                  return (
//                      <div key={additional.id} className="flex flex-col mb-3">
//                          <div className="flex flex-1 items-center justify-between pr-4 rounded-md bg-white-300">
//                              <div className="flex items-center gap-3">
//                                  <Image
//                                      src={additional.picture_url}
//                                      alt="backgfroundheader"
//                                      width={91}
//                                      height={200}
//                                  />
//                                  <div className="">
//                                      <p className="font-semibold text-black text-sm ">
//                                          {additional.name}
//                                      </p>
//                                      <p className="font-semibold text-xs text-black">
//                                          R$ {additional.price}
//                                      </p>
//                                  </div>
//                              </div>

//                              {additional.quantity === 0 ? (
//                                  <div className="flex justify-center items-center">
//                                      <button
//                                          type="button"
//                                          className={`text-[30px] rounded-full text-[#00000090]`}
//                                          onClick={(e) => {
//                                              e.preventDefault();

//                                              setProductData((prev: any) => {
//                                                  prev.additionals[
//                                                      index
//                                                  ].quantity += 1;

//                                                  return prev;
//                                              });
//                                          }}
//                                      >
//                                          <IoMdAddCircle />
//                                      </button>
//                                  </div>
//                              ) : (
//                                  <QuantitySelector
//                                      value={0}
//                                      addValue={() => {}}
//                                      subtractValue={() => {}}
//                                      deleteValue={() => {}}
//                                  />
//                              )}

// {
/* {selectedAdditionals.find(
                                    (add) => add.id == additionals.id
                                ) ? (
                                    <div className="bg-slate-900 text-white w-24 flex flex-row justify-between p-1">
                                        <button
                                            className="w-6 text-md flex items-center justify-center"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setPrice(
                                                    (prev: any) =>
                                                        (prev -=
                                                            additionals.price)
                                                );

                                                let varSelectedAdditionals =
                                                    selectedAdditionals;

                                                let x =
                                                    varSelectedAdditionals.findIndex(
                                                        (add) =>
                                                            add.id ==
                                                            additionals.id
                                                    );

                                                if (
                                                    varSelectedAdditionals[x].quantity - 1 === 0
                                                ) {
                                                    setSelectedAdditionals([
                                                        ...varSelectedAdditionals.filter(
                                                            (elem, index) =>
                                                                index !== x
                                                        ),
                                                    ]);
                                                } else {
                                                    varSelectedAdditionals[
                                                        x
                                                    ].quantity -= 1;
                                                    setSelectedAdditionals([
                                                        ...varSelectedAdditionals,
                                                    ]);
                                                }
                                            }}
                                        >
                                            <FaMinus />
                                        </button>
                                        <span className="">
                                            {
                                                selectedAdditionals.find(
                                                    (add) =>
                                                        add.id == additionals.id
                                                ).quantity
                                            }
                                        </span>
                                        <button
                                            className="w-6 text-md flex items-center justify-center"
                                            onClick={(e) => {
                                                e.preventDefault();

                                                setPrice(
                                                    (prev: any) =>
                                                        (prev +=
                                                            additionals.price)
                                                );

                                                let varSelectedAdditionals =
                                                    selectedAdditionals;

                                                let x =
                                                    varSelectedAdditionals.findIndex(
                                                        (add) =>
                                                            add.id ==
                                                            additionals.id
                                                    );

                                                varSelectedAdditionals[
                                                    x
                                                ].quantity += 1;

                                                setSelectedAdditionals([
                                                    ...varSelectedAdditionals,
                                                ]);
                                            }}
                                        >
                                            <FaPlus />
                                        </button>
                                    </div>
                                ) : (
                                    <BsFillPlusCircleFill
                                        className="cursor-pointer"
                                        color="3A3A3A"
                                        size={25}
                                        onClick={() => {
                                            setPrice(
                                                (prev: any) =>
                                                    (prev += additionals.price)
                                            );
                                            setSelectedAdditionals(
                                                (prev: any) => {
                                                    return [
                                                        ...prev,
                                                        {
                                                            id: additionals.id,
                                                            quantity: 1,
                                                        },
                                                    ];
                                                }
                                            );
                                        }}
                                    />
                                )} */
// }
// {
/* </div>
                     </div>
                 );
             })}
         </div>
     );
 } else {
     return <>Carregando...</>;
 } */
// }
// }
