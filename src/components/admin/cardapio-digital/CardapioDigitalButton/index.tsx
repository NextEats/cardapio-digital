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
    | 'Imprimir e fechar o caixa'
    | 'Nova Mesa'
    | 'Pedir'
    | 'Adicionar cliente'
    | 'Entregar Pedido'
    | 'Confirmar'
    | 'Finalizar atendimento';
  h?: string;
  w?: string;
  id?: string;
  disabled?: boolean;
}

export function CardapioDigitalButton({
  name = 'Adicionar',
  onClick,
  h,
  w,
  Icon,
  id,
  disabled,
}: iButtonProps) {
  return (
    <button
      id={id}
      disabled={disabled}
      type="submit"
      onClick={onClick}
      className={` flex items-center gap-1 justify-center text-white leading-5 font-semibold rounded disabled:cursor-not-allowed disabled:bg-gray-400 transition-all ease-in-out ${w} ${h}

        ${
          name === 'Adicionar' ||
          name === 'Novo' ||
          name === 'Adicionar novo item' ||
          name === 'Abrir caixa' ||
          name === 'Nova Mesa' ||
          name === 'Adicionar cliente' ||
          name === 'Confirmar' ||
          name === 'Entregar Pedido' ||
          name === 'Finalizar atendimento'
            ? ' hover:bg-green-600 bg-green-300'
            : ''
        }
        ${
          name === 'Criar nova categoria' ||
          name === 'Imprimir' ||
          name === 'Editar' ||
          name === 'Filtrar' ||
          name === 'Pedir' ||
          name === 'Imprimir e fechar o caixa' ||
          name === 'Imprimir e aceitar o pedido'
            ? 'hover:bg-blue-700 bg-blue-500'
            : ''
        }
        ${
          name === 'Cancelar' || name === 'Fechar caixa'
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
