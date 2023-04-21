import { IconType } from 'react-icons';

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

export default CardAdvantages;
