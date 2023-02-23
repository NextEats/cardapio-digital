import {
    iProductModalReducer,
    ProductModalReducer,
    tProductModalReducer,
} from '@/src/reducers/ProductModalReducer/reducer';
import Image from 'next/image';
import { MouseEvent, useEffect, useReducer } from 'react';
import { BsArrowLeftCircle } from 'react-icons/bs';
import { iProduct } from '../../../types/types';

export default function ProductModal({
    productModal,
    setProductModal,
    productsDispatch,
}: {
    productModal: iProduct['data'] | undefined | null;
    setProductModal: Function;
    productsDispatch: Function;
}) {
    // const [additionals, setAdditionals] = useState<iProductAdditional[]>();
    // const [price, setPrice] = useState<number>(0);
    // const [selectedAdditionals, setSelectedAdditionals] = useState<any[]>([]);
    // const [quantity, setQuantity] = useState<number>(1);
    // const [observation, setObservation] = useState<string | null>(null);

    const initialState: iProductModalReducer = {
        additionals: [],
        price: 0,
        quantity: 1,
        observation: null,
    };

    const [state, dispatch] = useReducer<tProductModalReducer>(
        ProductModalReducer,
        initialState
    );

    useEffect(() => {}, [productModal]);

    const body = document.querySelector('body');
    body?.classList.add('overflow-hidden');

    function closeModal() {
        setProductModal(null);
        body?.classList.remove('overflow-hidden');
    }

    // useEffect(() => {
    //     setQuantity(1);
    // }, []);

    // useEffect(() => {
    //     if (!productModal) {
    //         return;
    //     }

    //     getProductAdditionals(productModal?.id).then((response) => {
    //         setAdditionals(response as iProductAdditional[]);
    //     });

    //     setPrice(productModal.price);
    // }, [productModal]);

    if (!productModal) {
        return <div>Carregando</div>;
    }

    function handleSubmit(e: MouseEvent) {
        e.preventDefault();

        // productsDispatch({
        //     type: 'add',
        //     payload: {
        //         id: productModal?.id,
        //         name: productModal?.name,
        //         price: productModal?.price,
        //         quantity: quantity,
        //         picture_url: productModal?.picture_url,
        //         additionals: selectedAdditionals,
        //         observation,
        //     },
        // });

        closeModal();
    }

    return (
        <>
            <div
                className="fixed bg-black w-screen h-screen opacity-60 z-[100] cursor-pointer"
                onClick={() => {
                    closeModal();
                }}
            ></div>
            <div
                className={`max-w-[645px] pb-9 px-4 bg-white top-0 right-0 z-[200] fixed overflow-auto shadow-2xl h-screen`}
            >
                <div className="sticky">
                    <BsArrowLeftCircle
                        className="my-8 cursor-pointer"
                        size={30}
                        onClick={() => {
                            closeModal();
                        }}
                    />
                    <div className="flex items-center justify-center mb-9">
                        <Image
                            className="rounded-3xl"
                            src={productModal.picture_url}
                            alt="backgfroundheader"
                            width={500}
                            height={500}
                        />
                    </div>
                    <div className="mb-9">
                        <h1 className="font-extrabold text-xl text-gray-800 ">
                            {productModal.name}
                        </h1>
                        <p className="font-normal text-md text-gray-800 mt-3">
                            {productModal.description}
                        </p>
                    </div>

                    {/* <ProductOptions product_id={productModal.id} />

                    {additionals?.length != 0 && additionals && (
                        <Additionals
                            data={additionals}
                            setPrice={setPrice}
                            selectedAdditionals={selectedAdditionals}
                            setSelectedAdditionals={setSelectedAdditionals}
                        />
                    )} */}

                    {/* <form className="w-full h-24 mb-8">
                        <textarea
                            name=""
                            onBlur={(e) => setObservation(e.target.value)}
                            className=" scrollbar-custom w-full h-full resize-none rounded-sm bg-[#f6f6f6] shadow-sm text-base outline-none p-4"
                            placeholder="Observações"
                        ></textarea>
                    </form> */}

                    {/* <SubmitButtons
                        productModal={productModal}
                        price={price}
                        quantity={quantity}
                        setQuantity={setQuantity}
                        setPrice={setPrice}
                    /> */}
                </div>
            </div>
        </>
    );
}
