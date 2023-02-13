import { SetStateAction } from "react";

interface iInputWithLabel {
  label: string;
  placeholder?: string;
  state: string | undefined;
  setState?: React.Dispatch<SetStateAction<string>>;
}

export default function InputWithLabel({
  label,
  placeholder,
  state,
  setState,
}: iInputWithLabel) {
  return (
    <label className="w-full">
      <span className="text-sm font-semibold text-[#4b4b4b]">{label}</span>
      <input
        className="mt-2 w-full focus:outline-none border border-[#d1d1d1] rounded-sm py-2 pl-4"
        type="text"
        placeholder={placeholder}
        onChange={
          setState ? (e) => setState(e.target.value) : (e) => e.preventDefault()
        }
        value={state}
      />
    </label>
  );
}
