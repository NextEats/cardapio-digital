import { IconType } from 'react-icons';

interface iCardAdvantages {
  Icon: IconType;
  title: string;
  text: string;
}

const CardAdvantages = (props: iCardAdvantages) => {
  const { Icon, title, text } = props;
  return (
    <div className="h-[370px] border bg-gray-100 hover:bg-gray-200 m-5 flex flex-col p-9 justify-center items-center transition rounded-lg z-20">
      <div className="rounded-full w-[130px] h-[130px] bg-brand-dark-orange flex justify-center items-center">
        <Icon className="text-[80px] text-white" />
      </div>
      <h4 className="mt-7 text-xl font-semibold uppercase">{title}</h4>
      <p className="mt-4 font-semibold">{text}</p>
    </div>
  );
};

export default CardAdvantages;
