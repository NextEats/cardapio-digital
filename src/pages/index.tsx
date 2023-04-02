import { useEffect } from 'react';

import backgroundAboveTheFold from '@/src/assets/background-atf-image.png';
import nextEatsWhiteLogo from '@/src/assets/next-eats-white-logo.png';
import Image from 'next/image';
import AnchorLink from 'react-anchor-link-smooth-scroll';
import { IconType } from 'react-icons';
import { FaCheck, FaCog, FaMotorcycle } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';

const Homepage = () => {
    useEffect(() => {
        const body = document.getElementById('body');
        body?.classList.add('overflow-x-hidden');
    }, []);

    const backgroundImageStyles = {
        background: `linear-gradient(0deg, #ff7332a2 0%, #090979b6 100%, rgba(0,212,255,0) 100%), url(${backgroundAboveTheFold.src})`,
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
                <div
                    id="start"
                    className="max-w-[1500px] max-w-screen mx-auto px-12 pt-12"
                >
                    <div className="hidden lg:flex flex-row justify-between items-center">
                        <Image
                            src={nextEatsWhiteLogo}
                            alt="nextEatsWhiteLogo"
                            width={200}
                            className="hidden xl:block"
                        />
                        <div>
                            <ul className="text-white flex flex-row gap-x-7 child:cursor-pointer child-hover:opacity-80 child:transition child:delay-75 child:text-lg">
                                <li>
                                    <AnchorLink
                                        href="#start"
                                        className="w-full h-full"
                                    >
                                        Início
                                    </AnchorLink>
                                </li>
                                <li>
                                    <AnchorLink
                                        href="#advantages"
                                        className="w-full h-full"
                                    >
                                        Vantagens
                                    </AnchorLink>
                                </li>
                                <li>Planos</li>
                                <li>Funcionalidades</li>
                                <li>Depoimentos</li>
                            </ul>
                        </div>
                        <div className="child:px-7 child:py-3 child-hover:opacity-80 child:transition child:rounded child:font-semibold flex flex-row gap-x-4">
                            <button className="bg-white">JÁ SOU CLIENTE</button>
                            <button className="bg-orange-500 text-white">
                                QUERO ASSINAR
                            </button>
                        </div>
                    </div>

                    <div className="mt-48">
                        <span className="text-white leading-tight text-[30px] sm:text-[2.5rem] lg:text-[3.5rem] font-bold block lg:max-w-[50%]">
                            Automatize as entregas e o gerenciamento do seu
                            restaurante.
                        </span>
                        <span className="text-lg text-[16px] sm:text-normal text-yellow-400 mt-8 block">
                            Livre das taxas dos marketplaces e 100% digital.
                        </span>
                        <div className="mt-12 lg:hidden child:px-7 child:py-3 child-hover:opacity-80 child:transition child:rounded child:font-semibold flex flex-col gap-y-3 sm:flex-row gap-x-4">
                            <button className="bg-white">JÁ SOU CLIENTE</button>
                            <button className="bg-orange-500 text-white">
                                QUERO ASSINAR
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white h-32 absolute bottom-0 w-screen right-triangle"></div>
            </div>
            <div
                id="advantages"
                className="w-screen relative bg-white flex justify-center items-center"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1500px] mx-auto pt-24 pb-40">
                    <CardAdvantages
                        Icon={FaCog}
                        title="Total Controle"
                        text="Você tem o poder de personalizar seu cardápio
                            digital para deixá-lo como quiser."
                    />
                    <CardAdvantages
                        Icon={FaCheck}
                        title="MESAS E GARÇONS"
                        text="Controle automaticamente seus garçons e mesas do seu estabelecimento sem mais dor de cabeça!"
                    />
                    <CardAdvantages
                        Icon={MdFastfood}
                        title="CARDÁPIO DIGITAL"
                        text="Receba pedidos de diversos canais diferentes, dê o próximo passo na sua empresa otimizando seu trabalho!"
                    />
                    <CardAdvantages
                        Icon={FaMotorcycle}
                        title="DELIVERY"
                        text="Diversas funcionalidades para ajudar o seu restaurante delivery a lucrar mais."
                    />
                </div>
                <div className="bg-gray-800 h-32 w-screen right-triangle absolute -bottom-[1px] left-0 right-0"></div>
            </div>
            <div className="w-screen relative bg-gray-800">
                <div className="grid grid-cols-1 pt-16 p-6 gap-y-3 lg:grid-cols-3 gap-x-3 max-w-[1500px] mx-auto lg:pt-24 lg:pb-44">
                    <CardSubscriptionPlan
                        monthlyPrice={100}
                        name="Start"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                        features={[
                            'Funcionalidade',
                            'Funcionalidade',
                            'Funcionalidade',
                        ]}
                    />
                    <CardSubscriptionPlan
                        monthlyPrice={270}
                        name="Pro"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                        features={[
                            'Funcionalidade',
                            'Funcionalidade',
                            'Funcionalidade',
                        ]}
                    />
                    <CardSubscriptionPlan
                        monthlyPrice={670}
                        name="Expert"
                        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
                        features={[
                            'Funcionalidade',
                            'Funcionalidade',
                            'Funcionalidade',
                        ]}
                    />
                </div>
            </div>
        </>
    );
};

interface iCardSubscriptionPlan {
    monthlyPrice: number;
    name: string;
    description: string;
    features: Array<string>;
}

const CardSubscriptionPlan = (props: iCardSubscriptionPlan) => {
    const { monthlyPrice, name, description, features } = props;

    return (
        <div
            className={`h-[500px] p-12 rounded-lg flex flex-col items-center justify-center bg-white`}
        >
            <div className="w-full">
                <span className="text-4xl inline font-bold text-brand-dark-orange">
                    R$&nbsp;{monthlyPrice}
                </span>
                <span className="ml-3 italic text-gray-500">por mês</span>
            </div>
            <h4 className="w-full text-6xl font-semibold mt-6">{name}</h4>
            <p className="w-full mt-4 mb-10 italic text-gray-800">
                {description}
            </p>
            <ul className="w-full">
                {features.map((feat, index) => {
                    return (
                        <li
                            className="flex flex-row items-center text-lg text-gray-600"
                            key={index}
                        >
                            <div className="h-9 my-2 w-9 flex items-center justify-center bg-brand-dark-orange rounded-full">
                                <FaCheck className="text-xl text-white" />
                            </div>
                            <span className="ml-2">{feat}</span>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

interface iCardAdvantages {
    Icon: IconType;
    title: string;
    text: string;
}

const CardAdvantages = (props: iCardAdvantages) => {
    const { Icon, title, text } = props;
    return (
        <div className="h-[370px] border bg-gray-100 hover:bg-gray-200 m-5 flex flex-col p-12 justify-center items-center transition">
            <div className="rounded-full w-24 h-24 bg-brand-dark-orange flex justify-center items-center">
                <Icon className="text-[32px] text-white" />
            </div>
            <h4 className="mt-7 text-xl font-semibold uppercase">{title}</h4>
            <p className="mt-4 italic">{text}</p>
        </div>
    );
};

export default Homepage;
