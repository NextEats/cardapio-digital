import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext, useState } from 'react';
import ContactInfoForm from './subcomponents/ContactInfoForm';
import ProductsList from './subcomponents/ProductsList';

type tSteps = 'products_list' | 'contact_info';

export default function Checkout() {
    const { modals } = useContext(DigitalMenuContext);

    const [currentStep, setCurrentStep] = useState<tSteps>('products_list');

    const handleCloseModal = () => {
        modals?.set((prev) => {
            return {
                ...prev,
                checkout: false,
            };
        });
    };

    function CurrentStepComponent() {
        switch (currentStep) {
            case 'products_list':
                return (
                    <ProductsList
                        setCurrentStep={setCurrentStep}
                        handleCloseModal={handleCloseModal}
                    />
                );
            case 'contact_info':
                return <ContactInfoForm setCurrentStep={setCurrentStep} />;
        }
    }

    return (
        <div className="absolute w-[98vw] h-screen flex items-center justify-center">
            <div
                className="fixed w-screen h-screen bg-[#0000009f] z-[400]"
                onClick={handleCloseModal}
            ></div>
            <div className="min-h-[600px] max-w-[550px] w-[92%] fixed bg-white z-[500] px-4 py-9 rounded">
                <CurrentStepComponent />
            </div>
        </div>
    );
}
