import { InputHTMLAttributes } from "react";

interface iInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  placeholder: string;
}

export function Input({ label, ...rest }: iInputProps) {
  return (
    <div className="flex flex-col">
      <label className="text-gray-400 font-light">{label}</label>
      <input className="mt-1 w-full h-[36px] py-[10px] px-[12px] bg-white .placeholder-gray-300 border-2 border-gray-200 rounded outline-none focus:border focus:border-brand-dark-orange" {...rest}></input>
    </div>
  )
}
