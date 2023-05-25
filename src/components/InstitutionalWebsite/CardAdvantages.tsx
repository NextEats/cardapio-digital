import { IconType } from 'react-icons';

interface iCardAdvantages {
  Icon: IconType;
  title: string;
  text: string;
}

const CardAdvantages = (props: iCardAdvantages) => {
  const { Icon, title, text } = props;
  return (
    <div className="h-[390px] border bg-gray-100 hover:bg-gray-200 m-5 flex flex-col pt-8 p-8 sm:p-4 items-center transition rounded-lg z-20">
      <div className="rounded-full w-[120px] h-[120px] bg-brand-dark-orange flex justify-center items-center">
        <Icon className="text-[60px] text-white" />
      </div>
      <h4 className="mt-5 text-xl font-semibold uppercase">{title}</h4>
      <p className="mt-3 font-semibold">{text}</p>
    </div>
  );
};

export default CardAdvantages;
