interface iCardAdvantages {
  src: string;
  title: string;
  text: string;
}

const CardAdvantages = (props: iCardAdvantages) => {
  const { src, title, text } = props;
  return (
    <div className="section flex justify-center items-center mt-5">
      <div className="w-auto lg:w-2/3 px-8">
        <h2 className="text-center md:text-left text-3xl font-bold mb-4 uppercase">
          {title}
        </h2>
        <p className="text-center md:text-left text-lg text-gray-700 leading-relaxed">
          {text}
        </p>
      </div>
      <div className="w-1/2 lg:w-1/4 hidden md:block">
        <img src={src} alt="Imagem 2" className="w-full" />
      </div>
    </div>
  );
};

export default CardAdvantages;
