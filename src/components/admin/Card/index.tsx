interface ICardProps {
  name: string;
  value: string;
  color: string;
}

export function Card({ name, value, color }: ICardProps) {
  return (
    <div
      className={`w-auto h-[120px] sm:h-[140px] xl:h-[160px] p-4 xl:p-8 sm:p-6 shadow-sm border-b-8 border-b-${color} border rounded-lg `}
    >
      <span className="block text-lg sm:text-3xl font-semibold">{value}</span>
      <span
        className={`block mt-1 text-${color} font-semibold sm:font-bold text-base sm:text-2xl`}
      >
        {name}
      </span>
    </div>
  );
}
