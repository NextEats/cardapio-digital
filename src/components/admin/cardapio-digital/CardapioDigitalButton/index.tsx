import { ReactNode } from 'react';
interface iButtonProps {
    onClick?: () => void;
    Icon?: ReactNode;
    name?:
    | 'Criar nova categoria'
    | 'Abrir caixa'
    | 'Fechar caixa'
    | 'Novo'
    | 'Filtrar'
    | 'Excluir'
    | 'Cancelar'
    | 'Editar'
    | 'Adicionar'
    | 'Adicionar novo item'
    | 'Imprimir'
    | 'Imprimir e aceitar o pedido'
    | 'Nova Mesa'
    | 'Pedir'
    | 'Adicionar cliente'
    | 'Entregar Pedido'
    | 'Confirmar';
    h?: string;
    w?: string;
    disabled?: boolean;
}

export function CardapioDigitalButton({
    name = 'Adicionar',
    onClick,
    h,
    w,
    Icon,
    disabled,
}: iButtonProps) {
    return (
        <button
            disabled={disabled}
            type="submit"
            onClick={onClick}
            className={` flex items-center gap-1 justify-center text-white leading-5 font-semibold rounded disabled:bg-gray-600 transition-all ease-in-out ${w} ${h}
        ${name === 'Adicionar' ||
                    name === 'Novo' ||
                    name === 'Adicionar novo item' ||
                    name === 'Abrir caixa' ||
                    name === 'Nova Mesa' ||
                    name === 'Adicionar cliente' ||
                    name === 'Confirmar' ||
                    name === 'Entregar Pedido'
                    ? ' hover:bg-green-600 bg-green-300'
                    : ''
                }
        ${name === 'Criar nova categoria' ||
                    name === 'Imprimir' ||
                    name === 'Editar' ||
                    name === 'Filtrar' ||
                    name === 'Pedir' ||
                    name === 'Imprimir e aceitar o pedido'
                    ? 'hover:bg-blue-700 bg-blue-500'
                    : ''
                }
        ${name === 'Cancelar' || name === 'Fechar caixa'
                    ? 'hover:bg-yellow-500 bg-yellow-400'
                    : ''
                }
        ${name === 'Excluir' ? 'hover:bg-red-500 bg-red-400' : ''}
        `}
        >
            {name} {Icon}
        </button>
    );
}
