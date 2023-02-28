import ProductsList from '../home/ProductsList';
import RestaurantHeader from '../home/RestaurantHeader';

export default function DigitalMenuContent() {
    return (
        <div className="bg-[#222] flex justify-center min-h-screen min-w-screen">
            <div className="bg-gray-100 max-w-7xl w-full">
                <RestaurantHeader />
                <ProductsList />

                {/* {products && products.length > 0 && (
                    <div
                        className="fixed bottom-1 max-w-7xl p-3 w-full"
                        onClick={() => {
                            setShowCheckoutModal(true);
                        }}
                    >
                        <OpenCheckoutButton products={products} />
                    </div>
                )} */}
            </div>
        </div>
    );
}
