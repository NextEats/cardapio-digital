import { DigitalMenuContext } from '@/src/contexts/DigitalMenuContext';
import { useContext, useState } from 'react';
import { BsX } from 'react-icons/bs';
import ContactInfoForm from './subcomponents/ContactInfoForm';
import ProductsList from './subcomponents/ProductsList';
import ThankYouPage from './subcomponents/ThankYou';

type tSteps = 'products_list' | 'contact_info' | 'thank_you';

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
            case 'thank_you':
                return <ThankYouPage />;
        }
    }

    return (
        <div className="overflow-auto w-screen h-screen fixed bg-white z-[500] flex justify-center items-center">
            <BsX></BsX>
            <div className="w-full max-w-[600px] px-2">
                <CurrentStepComponent />
            </div>
        </div>
    );
}
