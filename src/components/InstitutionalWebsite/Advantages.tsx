import cardapioDigital from '@/src/assets/cardapioDigital.png';
const Advantages = () => {
  return (
    <div className="container lg:px-2 lg:py-10 mx-auto h-full">
      <div className="section flex justify-center items-center mt-5">
        <div className="w-1/2 lg:w-1/4 hidden md:block ">
          <img src={cardapioDigital.src} alt="Imagem 1" className="w-full" />
        </div>
        <div className="w-auto lg:w-2/3 px-8">
          <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
            CARDÁPIO DIGITAL
          </h2>
          <p className="text-center md:text-left text-lg text-gray-500 leading-relaxed">
            Maximize o sucesso do seu negócio com o revolucionário sistema de
            gerenciamento de mesas: torne sua vida mais fácil e impulsione a
            satisfação do cliente como nunca antes!
          </p>
        </div>
      </div>
      <div className="section flex justify-center items-center mt-5">
        <div className="w-auto lg:w-2/3 px-8">
          <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
            CONTROLE DE MESAS
          </h2>
          <p className="text-center md:text-left text-lg text-gray-700 leading-relaxed">
            Maximize o sucesso do seu negócio com o revolucionário sistema de
            gerenciamento de mesas: torne sua vida mais fácil e impulsione a
            satisfação do cliente como nunca antes!
          </p>
        </div>
        <div className="w-1/2 lg:w-1/4 hidden md:block">
          <img src={cardapioDigital.src} alt="Imagem 2" className="w-full" />
        </div>
      </div>
      <div className="section flex justify-center items-center mt-5">
        <div className="w-1/2 lg:w-1/4 hidden md:block ">
          <img src={cardapioDigital.src} alt="Imagem 1" className="w-full" />
        </div>
        <div className="w-auto lg:w-2/3 px-8">
          <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
            WhatsApp
          </h2>
          <p className="text-center md:text-left text-lg text-gray-500 leading-relaxed">
            Eleve a comunicação com seus clientes a um novo patamar com nossa
            avançada funcionalidade de envio automático de mensagens pelo
            WhatsApp! Mantenha-os informados sobre o status do pedido em tempo
            real e proporcione uma experiência excepcional para fidelizar ainda
            mais sua clientela.
          </p>
        </div>
      </div>
      <div className="section flex justify-center items-center mt-5">
        <div className="w-auto lg:w-2/3 px-8">
          <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
            Delivery
          </h2>
          <p className="text-center md:text-left text-lg text-gray-700 leading-relaxed">
            Receba pedidos em tempo real e garanta a felicidade dos seus
            clientes com agilidade e eficiência incomparáveis. Conquiste ainda
            mais sucesso com nosso sistema inovador e veja sua empresa decolar!
          </p>
        </div>
        <div className="w-1/2 lg:w-1/4 hidden md:block">
          <img src={cardapioDigital.src} alt="Imagem 2" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default Advantages;
