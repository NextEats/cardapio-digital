import useProductsInCheckout from '@/src/hooks/useProductsInCheckout';
import DynamicProductListItem from '../DynamicProductListItem';

export default function DynamicProductsList() {
    const products = useProductsInCheckout();

    if (!products.state) {
        return null;
    }

    return (
        <div className="mt-8">
            {products.state.map((product: any, index: number) => {
                return (
                    <DynamicProductListItem
                        key={index}
                        product={product}
                        index={index}
                    />
                );
            })}
        </div>
    );
}
