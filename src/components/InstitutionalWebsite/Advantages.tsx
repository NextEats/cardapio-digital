// import cardapioDigital from '@/src/assets/cardapioDigital.png';
// const Advantages = () => {
//   return (
//     <div className="container lg:px-2 lg:py-10 mx-auto h-full">
//       <div className="section flex justify-center items-center mt-5">
//         <div className="w-1/2 lg:w-1/4 hidden md:block ">
//           <img src={cardapioDigital.src} alt="Imagem 1" className="w-full" />
//         </div>
//         <div className="w-auto lg:w-2/3 px-8">
//           <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
//             CARDÁPIO DIGITAL
//           </h2>
//           <p className="text-center md:text-left text-lg text-gray-500 leading-relaxed">
//             Maximize o sucesso do seu negócio com o revolucionário sistema de
//             gerenciamento de mesas: torne sua vida mais fácil e impulsione a
//             satisfação do cliente como nunca antes!
//           </p>
//         </div>
//       </div>
//       <div className="section flex justify-center items-center mt-5">
//         <div className="w-auto lg:w-2/3 px-8">
//           <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
//             CONTROLE DE MESAS
//           </h2>
//           <p className="text-center md:text-left text-lg text-gray-700 leading-relaxed">
//             Maximize o sucesso do seu negócio com o revolucionário sistema de
//             gerenciamento de mesas: torne sua vida mais fácil e impulsione a
//             satisfação do cliente como nunca antes!
//           </p>
//         </div>
//         <div className="w-1/2 lg:w-1/4 hidden md:block">
//           <img src={cardapioDigital.src} alt="Imagem 2" className="w-full" />
//         </div>
//       </div>
//       <div className="section flex justify-center items-center mt-5">
//         <div className="w-1/2 lg:w-1/4 hidden md:block ">
//           <img src={cardapioDigital.src} alt="Imagem 1" className="w-full" />
//         </div>
//         <div className="w-auto lg:w-2/3 px-8">
//           <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
//             WhatsApp
//           </h2>
//           <p className="text-center md:text-left text-lg text-gray-500 leading-relaxed">
//             Eleve a comunicação com seus clientes a um novo patamar com nossa
//             avançada funcionalidade de envio automático de mensagens pelo
//             WhatsApp! Mantenha-os informados sobre o status do pedido em tempo
//             real e proporcione uma experiência excepcional para fidelizar ainda
//             mais sua clientela.
//           </p>
//         </div>
//       </div>
//       <div className="section flex justify-center items-center mt-5">
//         <div className="w-auto lg:w-2/3 px-8">
//           <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
//             Delivery
//           </h2>
//           <p className="text-center md:text-left text-lg text-gray-700 leading-relaxed">
//             Receba pedidos em tempo real e garanta a felicidade dos seus
//             clientes com agilidade e eficiência incomparáveis. Conquiste ainda
//             mais sucesso com nosso sistema inovador e veja sua empresa decolar!
//           </p>
//         </div>
//         <div className="w-1/2 lg:w-1/4 hidden md:block">
//           <img src={cardapioDigital.src} alt="Imagem 2" className="w-full" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Advantages;
import { AiOutlineCheckCircle, AiOutlineUserSwitch } from 'react-icons/ai';
import { FaMotorcycle } from 'react-icons/fa';
import { IoRestaurantOutline } from 'react-icons/io5';
import CardAdvantages from './CardAdvantages';

const Advantages = () => {
  return (
    <>
      {/* <div className="bg-[#ff5c1b] h-[15%] w-screen grid-cols-4 absolute z-10 bottom-0 hidden lg:block"></div> */}
      <div
        id="advantages"
        className=" w-screenflex justify-center items-center relative bg-[#c03d09]"
      >
        <div className="bg-[#c03d09] max-w-[1246px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto py-10 ">
          <CardAdvantages
            Icon={AiOutlineCheckCircle}
            title="Total Controle"
            text="Você tem o poder de personalizar seu cardápio
                            digital para deixá-lo como quiser."
          />
          <CardAdvantages
            Icon={AiOutlineUserSwitch}
            title="MESAS E GARÇONS"
            text="Controle automaticamente seus garçons e mesas do seu estabelecimento sem mais dor de cabeça!"
          />
          <CardAdvantages
            Icon={IoRestaurantOutline}
            title="CARDÁPIO DIGITAL"
            text="Receba pedidos de diversos canais diferentes, dê o próximo passo na sua empresa otimizando seu trabalho!"
          />
          <CardAdvantages
            Icon={FaMotorcycle}
            title="DELIVERY"
            text="Diversas funcionalidades para ajudar o seu restaurante delivery a lucrar mais."
          />
        </div>
      </div>
    </>
  );
};

export default Advantages;
