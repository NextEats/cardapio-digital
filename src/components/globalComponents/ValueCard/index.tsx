interface iValueCardProps {
  width?: number;
  borderColor?: string;
  title: string;
  value: number | string;
}

export default function ValueCard({
  borderColor = 'border-orange-500',
  title,
  value,
  width,
}: iValueCardProps) {
  return (
    <div
      className={`flex flex-col col-span-4 md:col-span-1 items-start bg-white border-2 rounded p-4 ${borderColor} `}
    >
      {/* <div
       className={`flex flex-col gap-2 px-4 py-2 border rounded-[3px] ${borderColor} ${width ? width : 'w-[250px] lg:w-[350px]'}`}
     > */}
      <span className="w-full"> {title} </span>
      <span className="w-full text-right">
        {' '}
        R${' '}
        {value.toLocaleString('pt-BR', {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}{' '}
      </span>
    </div>
  );
}
