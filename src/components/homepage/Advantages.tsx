import { FaCheck, FaCog, FaMotorcycle } from 'react-icons/fa';
import { MdFastfood } from 'react-icons/md';
import CardAdvantages from './CardAdvantages';

const Advantages = () => {
    return (
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
    );
};

export default Advantages;
