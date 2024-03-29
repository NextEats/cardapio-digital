export interface iButton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export default function Button(props: iButton) {
  const { text, variant = 'primary', disabled } = props;

  const variantClasses =
    variant === 'primary' && !disabled
      ? 'bg-[#FC3B1D] hover:bg-[#ce0f0b] text-white'
      : 'bg-gray-300 hover:bg-gray-400 text-gray-800';

  const disabledClasses = disabled
    ? 'bg-[#505050] hover:bg-[#212121] opacity-90 cursor-not-allowed'
    : '';

  return (
    <button
      className={`transition-all uppercase w-full font-semibold shadow-md py-2 px-4 rounded ${variantClasses} ${disabledClasses}`}
      disabled={disabled}
      {...props}
    >
      {text}
    </button>
  );
}
