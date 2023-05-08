import cardapioDigital from '@/src/assets/cardapioDigital.png';
const Advantages = () => {
  return (
    // <div
    //   id="advantages"
    //   className="w-screen relative bg-white flex justify-center items-center"
    // >
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 max-w-[1500px] mx-auto pt-24 pb-40">
    //     <CardAdvantages
    //       Icon={FaCog}
    //       title="Total Controle"
    //       text="Você tem o poder de personalizar seu cardápio
    //                         digital para deixá-lo como quiser."
    //     />
    //     <CardAdvantages
    //       Icon={FaCheck}
    //       title="MESAS E GARÇONS"
    //       text="Controle automaticamente seus garçons e mesas do seu estabelecimento sem mais dor de cabeça!"
    //     />
    //     <CardAdvantages
    //       Icon={MdFastfood}
    //       title="CARDÁPIO DIGITAL"
    //       text="Receba pedidos de diversos canais diferentes, dê o próximo passo na sua empresa otimizando seu trabalho!"
    //     />
    //     <CardAdvantages
    //       Icon={FaMotorcycle}
    //       title="DELIVERY"
    //       text="Diversas funcionalidades para ajudar o seu restaurante delivery a lucrar mais."
    //     />
    //   </div>
    //   <div className="bg-gray-800 h-32 w-screen right-triangle absolute -bottom-[1px] left-0 right-0"></div>
    // </div>
    // <div className="container px-6 py-10 mx-auto h-full">
    //   <div className="mt-8 lg:mx-6 lg:flex justify-center">
    //     <img className="object-cover lg:mx-6 rounded-xl h-72 lg:h-96" src="https://imgs.casasbahia.com.br/55051807/1g.jpg"alt=""/>

    //     <div className="mt-6 lg:max-w-lg lg:mt-0 lg:mx-6">
    //       <h3 className="block mt-4 text-2xl font-semibold text-black md:text-3xl">
    //         CARDÁPIO DIGITAL
    //       </h3>
    //       <p className="mt-3 text-lg text-gray-500">
    //         Revitalize seu negócio com nosso cardápio digital integrado! Simplifique pedidos, fidelize clientes e impulsione a produtividade, conectando-se através de múltiplos canais. Não só um cardápio, mas uma solução completa para transformar a gestão do seu estabelecimento!
    //       </p>
    //     </div>
    //   </div>
    //   <div className="mt-8 lg:mx-6 lg:flex justify-center">
    //     <div className="mt-6 lg:max-w-lg lg:mt-0 lg:mx-6">
    //       <h3 className="block mt-4 text-2xl font-semibold text-black md:text-3xl">
    //         CONTROLE DE MESAS
    //       </h3>
    //       <p className="mt-3 text-lg text-gray-500">
    //       Maximize o sucesso do seu negócio com o revolucionário sistema de gerenciamento de mesas: torne sua vida mais fácil e impulsione a satisfação do cliente como nunca antes!
    //       </p>
    //     </div>
    //     <img className="object-cover lg:mx-6 rounded-xl h-72 lg:h-96" src="https://imgs.casasbahia.com.br/55051807/1g.jpg"alt=""/>
    //   </div>
    //   <div className="mt-8 lg:mx-6 lg:flex justify-center">
    //     <img className="object-cover lg:mx-6 rounded-xl h-72 lg:h-96" src="https://imgs.casasbahia.com.br/55051807/1g.jpg"alt=""/>

    //     <div className="mt-6 lg:max-w-lg lg:mt-0 lg:mx-6">
    //       <h3 className="block mt-4 text-2xl font-semibold text-black md:text-3xl">
    //         WhatsApp
    //       </h3>
    //       <p className="mt-3 text-lg text-gray-500">
    //         Eleve a comunicação com seus clientes a um novo patamar com nossa avançada funcionalidade de envio automático de mensagens pelo WhatsApp! Mantenha-os informados sobre o status do pedido em tempo real e proporcione uma experiência excepcional para fidelizar ainda mais sua clientela.
    //       </p>
    //     </div>
    //   </div>
    //   <div className="mt-8 lg:mx-6 lg:flex justify-center">
    //     <div className="mt-6 lg:max-w-lg lg:mt-0 lg:mx-6">
    //       <h3 className="block mt-4 text-2xl font-semibold text-black md:text-3xl">
    //         Delivrey
    //       </h3>
    //       <p className="mt-3 text-lg text-gray-500">
    //         Receba pedidos em tempo real e garanta a felicidade dos seus clientes com agilidade e eficiência incomparáveis. Conquiste ainda mais sucesso com nosso sistema inovador e veja sua empresa decolar!
    //       </p>
    //     </div>
    //     <img className="object-cover lg:mx-6 rounded-xl h-72 lg:h-96" src="https://imgs.casasbahia.com.br/55051807/1g.jpg"alt=""/>
    //   </div>
    // </div>
    <div className="container lg:px-24 py-10 mx-auto h-full">
      <div className="section flex justify-center items-center mt-5">
        <div className="w-1/2 lg:w-1/4 ">
          <img src={cardapioDigital.src} alt="Imagem 1" className="w-full" />
        </div>
        <div className="w-1/2 lg:w-2/3 px-8">
          <h2 className="text-3xl font-bold mb-4 uppercase">
            CARDÁPIO DIGITAL
          </h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Maximize o sucesso do seu negócio com o revolucionário sistema de
            gerenciamento de mesas: torne sua vida mais fácil e impulsione a
            satisfação do cliente como nunca antes!
          </p>
        </div>
      </div>
      <div className="section flex justify-center items-center mt-5">
        <div className="w-1/2 lg:w-2/3 px-8">
          <h2 className="text-3xl font-bold mb-4 uppercase">
            CONTROLE DE MESAS
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ac
            enim vestibulum, vehicula est sit amet, bibendum nulla. Etiam
            malesuada ipsum id nisl volutpat eleifend.
          </p>
        </div>
        <div className="w-1/2 lg:w-1/4">
          <img src={cardapioDigital.src} alt="Imagem 2" className="w-full" />
        </div>
      </div>
      <div className="section flex justify-center items-center mt-5">
        <div className="w-1/2 lg:w-1/4 ">
          <img src={cardapioDigital.src} alt="Imagem 1" className="w-full" />
        </div>
        <div className="w-1/2 lg:w-2/3 px-8">
          <h2 className="text-3xl font-bold mb-4 uppercase">WhatsApp</h2>
          <p className="text-lg text-gray-500 leading-relaxed">
            Eleve a comunicação com seus clientes a um novo patamar com nossa
            avançada funcionalidade de envio automático de mensagens pelo
            WhatsApp! Mantenha-os informados sobre o status do pedido em tempo
            real e proporcione uma experiência excepcional para fidelizar ainda
            mais sua clientela.
          </p>
        </div>
      </div>
      <div className="section flex justify-center items-center mt-5">
        <div className="w-1/2 lg:w-2/3 px-8">
          <h2 className="text-3xl font-bold mb-4 uppercase">Delivery</h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Receba pedidos em tempo real e garanta a felicidade dos seus
            clientes com agilidade e eficiência incomparáveis. Conquiste ainda
            mais sucesso com nosso sistema inovador e veja sua empresa decolar!
          </p>
        </div>
        <div className="w-1/2 lg:w-1/4">
          <img src={cardapioDigital.src} alt="Imagem 2" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Advantages;
