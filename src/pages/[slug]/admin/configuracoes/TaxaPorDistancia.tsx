/* eslint-disable react-hooks/rules-of-hooks */
import { AdminContext } from '@/src/contexts/adminContext';
import { supabase } from '@/src/server/api';
import React from 'react';
import { useContext, useEffect, useState } from 'react';

export default function TaxaPorDistancia() {
    const { restaurant } = useContext(AdminContext);

    const [deliveryFees, setDeliveryFees] = useState<any>([]);

    useEffect(() => {
        const fetchDeliveryFees = async () => {
            const { data: deliveryFees, error } = await supabase
                .from('delivery_fees')
                .select('*')
                .eq('restaurant_id', restaurant!.id)
                .order('start_km', { ascending: true });

            if (error) {
                console.error(error);
            } else {
                setDeliveryFees(deliveryFees);
            }
        };

        fetchDeliveryFees();
    }, [restaurant]);

    if (!restaurant) {
        return null;
    }

    const addDeliveryFee = async (
        startKm: number,
        endKm: number,
        fee: number
    ) => {
        try {
            const { data: newDeliveryFee, error } = await supabase
                .from('delivery_fees')
                .insert({
                    fee: fee,
                    start_km: startKm,
                    end_km: endKm,
                    restaurant_id: restaurant.id,
                })
                .select('*');

            newDeliveryFee
                ? setDeliveryFees([...deliveryFees, newDeliveryFee[0]])
                : null;
        } catch (err) {
            console.error(err);
        }
    };

    const deleteDeliveryFee = async (id: number) => {
        const { error } = await supabase
            .from('delivery_fees')
            .delete()
            .match({ id });
        if (error) console.error(error);
        else setDeliveryFees(deliveryFees.filter((fee: any) => fee.id !== id));
    };
    const [startKm, setStartKm] = useState<string>();
    const [endKm, setEndKm] = useState<string>();
    const [fee, setFee] = useState<string>();
        
    const handleAddDeliveryFee = () => {
        // const startKm = parseInt(
        //     prompt('Digite a distância inicial da taxa de entrega (em km):') ||
        //         '0'
        // );
        // const endKm = parseInt(
        //     prompt('Digite a distância final da taxa de entrega (em km):') ||
        //         '0'
        // );
        // const fee = parseFloat(
        //     prompt('Digite o valor da taxa de entrega (em R$):') || '0'
        // );
        if (startKm && endKm && fee) {
            addDeliveryFee(parseFloat(startKm), parseFloat(endKm), parseFloat(fee));
        }
        toggleModal();
        clearInputs();
    };
    function clearInputs(){
        setStartKm("");
        setEndKm("");
        setFee("");
    }
    const handleDeleteDeliveryFee = (id: number) => {
        if (
            window.confirm(
                'Tem certeza que deseja excluir essa taxa de entrega?'
            )
        ) {
            deleteDeliveryFee(id);
        }
    };

    const [showModal, setShowModal] = useState(false);
    const toggleModal = () => {
        setShowModal(!showModal);
        clearInputs();
    };
    
    return (
        <>
            <div className="p-4">
                <h1 className="text-2xl font-bold mb-4">
                    Taxas de entrega por distância
                </h1>
                <div className="w-full text-right">
                    <button
                        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-4 mt-8"
                        onClick={toggleModal}
                    >
                        Adicionar nova taxa de entrega
                    </button>
                </div>
                <table className="w-full table-auto">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Distância</th>
                            <th className="px-4 py-2">Taxa de entrega</th>
                            <th className="px-4 py-2">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deliveryFees.map((deliveryFee: any) => (
                            <tr key={deliveryFee.id}>
                                <td className="border px-4 py-2">{`${deliveryFee.start_km} km - ${deliveryFee.end_km} km`}</td>
                                <td className="border px-4 py-2">{`R$ ${deliveryFee.fee.toFixed(
                                    2
                                )}`}</td>
                                <td className="border px-4 py-2 text-center">
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 ml-3 mr-3 rounded-md"
                                        onClick={() =>
                                            deliveryFee.id
                                                ? handleDeleteDeliveryFee(
                                                    deliveryFee.id
                                                )
                                                : console.error('id não encontrado')
                                        }
                                    >
                                        Excluir
                                    </button>
                                    {/* <button
                                        className=" bg-blue-700 text-white py-2 px-4 ml-3 mr-3 rounded-md"
                                        onClick={() =>
                                            deliveryFee.id
                                                ? handleDeleteDeliveryFee(
                                                    deliveryFee.id
                                                )
                                                : console.error('id não encontrado')
                                        }
                                    >
                                        Editar
                                    </button> */}
                                    
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Main modal */}
            <div
                id="default-modal"
                data-modal-show={showModal}
                aria-hidden={!showModal}
                className={`${
                showModal ? "" : "hidden"
                } overflow-x-hidden overflow-y-auto fixed h-modal inset-0 z-50 justify-center items-center flex bg-black bg-opacity-20`}
            >
                <div className=" w-full max-w-2xl px-4 h-auto">
                    <form action="" onSubmit={(e)=>{ e.preventDefault(); handleAddDeliveryFee() }}>
                        <div className="bg-white rounded-lg shadow relative">
                            {/* Modal header */}
                            <div className="flex items-start justify-between p-5 rounded-t dark:border-gray-600">
                                <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold">
                                    Taxas de entrega por distância
                                </h3>
                                <button
                                    type="button"
                                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    onClick={toggleModal}
                                >
                                    <svg
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                    >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    ></path>
                                    </svg>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-6 space-y-4 space">
                                <div>
                                    <label htmlFor="x0" className="text-sm text-navy-700 font-bold">Digite a distância inicial da taxa de entrega (em km)</label>
                                    <input type="number" required value={startKm} onChange={(el)=> setStartKm(el.target.value)} className="w-full rounded-lg border border-gray-400 p-2 mt-2" placeholder="Digite a distância inicial ..." />
                                </div>
                                <div>
                                    <label htmlFor="xf" className="text-sm text-navy-700 font-bold">Digite a distância final da taxa de entrega (em km)</label>
                                    <input type="number" required value={endKm} onChange={(el)=> setEndKm(el.target.value)} className="w-full rounded-lg border border-gray-400 p-2 mt-2" placeholder="Digite a distância final ..." />
                                </div>
                                <div>
                                    <label htmlFor="email" className="text-sm text-navy-700 font-bold ">Digite o valor da taxa de entrega (em R$)</label>
                                    <input type="number" required value={fee} onChange={(el)=> setFee(el.target.value)} className="w-full rounded-lg border border-gray-400 p-2 mt-2" placeholder="Digite o valor da taxa ..." />
                                </div>
                            </div>
                            <div className="flex space-x-2 justify-end p-6 border-gray-200 rounded-b dark:border-gray-600">
                                <button data-modal-toggle="default-modal" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Cadastrar</button>
                                <button data-modal-toggle="default-modal" type="button" onClick={toggleModal} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600">Cancelar</button>
                            </div>
                        </div>    
                    </form>
                </div>
            </div>
        </>
        
    );
}
function preventDefault() {
    throw new Error('Function not implemented.');
}

