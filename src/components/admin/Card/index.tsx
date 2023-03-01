interface ICardProps {
  name: string;
  value: string;
  color: "green" | "yellow" | "red" | "blue";
}

export function Card({ name, value, color }: ICardProps) {
  return (
    <div
      className={`w-auto h-[120px] sm:h-[140px] xl:h-[160px] p-4 xl:p-8 sm:p-6 shadow-sm border-b-8  border rounded-lg
      ${color === "green" && 'border-b-green-300'}
      ${color === "blue" && 'border-b-blue-500'}
      ${color === "red" && 'border-b-red-500'} 
      ${color === "yellow" && 'border-b-yellow-500'} `}
    >
      <span className="block text-lg sm:text-3xl font-semibold">{
        name === 'Faturamento' ? 'R$' + Number(value).toLocaleString('pt-BR', {
          minimumFractionDigits: 2, maximumFractionDigits: 2
        }) : value
      }</span>
      <span
        className={`block mt-1 font-semibold sm:font-bold text-base sm:text-2xl
        ${color === "green" && 'text-green-300'}
        ${color === "blue" && 'text-blue-500'}
        ${color === "red" && 'text-red-500'} 
        ${color === "yellow" && 'text-yellow-500'} 
        `}
      >
        {name}
      </span>
    </div>
  );
}
