
interface ICardProps {
    name: string,
    value: string,
    color: string,
}

export function Card({ name, value, color }: ICardProps ) {
    return (
        <div>
                <div className={`w-auto h-[160px] shadow-xl p-8 border-b-8 border-b-${color} border rounded-lg `}>
                    <span className="block text-3xl font-semibold">
                        {value}
                    </span>
                    <span className={`block mt-1 text-${color} font-bold text-2xl`}>
                        {name}
                    </span>
                </div>
        </div>
    )
}