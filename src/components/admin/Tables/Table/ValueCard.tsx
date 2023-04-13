interface iValueCardProps {
  borderColor?: string;
  title: string;
  value: number | string;
}

export default function ValueCard({
  borderColor = 'border-orange-500',
  title,
  value,
}: iValueCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 px-4 py-2 border w-[250px] lg:w-[350px] rounded-[3px] ${borderColor}`}
    >
      <span className="w-full"> {title} </span>
      <span className="w-full text-right"> R$ {value} </span>
    </div>
  );
}
