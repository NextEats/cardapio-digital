import { useEffect } from 'react';

import backgroundAboveTheFold from '@/src/assets/background-atf-image.png';
// import nextEatsWhiteLogo from "@/src/assets/next-eats-white-logo.png"

const Homepage = () => {
    useEffect(() => {
        const body = document.getElementById('body');
        body?.classList.add('overflow-x-hidden');
    }, []);

    const backgroundImageStyles = {
        background: `url(${backgroundAboveTheFold.src})`,
        backgroundRepeat: 'no-repeat',
        backgroundOrigin: 'content-box',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
    };

    return (
        <>
            <div
                className="min-h-screen w-screen"
                style={backgroundImageStyles}
            >
                <div>
                    <span className="text-brand-light-orange text-[3.5rem] font-bold block">
                        Automatize as entregas e o gerenciamento do seu
                        restaurante.
                    </span>
                    <span className="text-white">
                        Livre das taxas dos marketplaces e 100% digital.
                    </span>
                </div>
                <div className="bg-white h-32 absolute bottom-0 w-screen right-triangle"></div>
            </div>
            <div className="h-[600px] w-screen relative bg-white">
                <div className="bg-gray-600 h-32 w-screen right-triangle absolute bottom-0 left-0 right-0"></div>
            </div>
            <div className="h-[600px] w-screen relative bg-gray-600"></div>
        </>
    );
};

export default Homepage;
