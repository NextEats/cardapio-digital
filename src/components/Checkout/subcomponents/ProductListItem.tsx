import useProductDataForId from '@/src/hooks/useProductDataForId';
import Image from 'next/image';
import { QuantitySelector } from '../../QuantitySelector';

export default function ProductListItem({ product }: any) {
    const data = useProductDataForId(product.id);

    if (!data) {
        return null;
    }

    return (
        <>
            <div className="bg-[#00000005] shadow-sm border border-[#0000000c] p-3 m-3 flex flex-row h-32 items-center rounded-sm">
                <Image
                    src={data.picture_url}
                    alt={data!.picture_url}
                    width={80}
                    height={50}
                />
                <div className="flex flex-col ml-4 pb-1">
                    <span className="text-xl font-bold text-[#3a3a3a]">
                        {data.name}
                    </span>
                    <span className=" text-[#7d7d7d] truncate w-[200px]">
                        {data.description}
                    </span>
                    <span className="mt-2 text-md text-[#4b9e40]">
                        R$ {data.price}
                    </span>
                </div>
                <div className="ml-auto">
                    <QuantitySelector
                        value={1}
                        addValue={() => {}}
                        subtractValue={() => {}}
                        deleteValue={() => {}}
                    />
                </div>
            </div>
        </>
    );
}
