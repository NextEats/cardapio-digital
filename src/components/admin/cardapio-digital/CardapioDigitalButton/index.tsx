
interface iButtonProps {
    name: "Criar nova categoria" | "Novo" | "Cancelar" | "Editar" | "Adicionar";
}

export function CardapioDigitalButton({ name = 'Adicionar' }: iButtonProps) {
    console.log(name)
    return (
        <div className={` flex flex-1 items-center justify-center text-white font-semibold rounded transition-all ease-in-out
                ${name !== "Criar nova categoria" ? 'h-7' : ' h-10'}
                ${name === "Adicionar" || name === "Novo" ? ' hover:bg-green-600 bg-green-300' : ''}
                ${name === "Editar" || name === "Criar nova categoria" && 'hover:bg-blue-700 bg-blue-500' }
                ${name === "Editar" && 'hover:bg-yellow-500 bg-yellow-400'}
            `}
        >
            {name}
        </div>
    )
}
