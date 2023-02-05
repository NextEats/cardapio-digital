interface iTextInputWithLabel {
    placeholder: string;
}

export default function TextInputWithLabel({ placeholder }: iTextInputWithLabel) {
    return (
        <div>
            <label className="flex flex-col">
                <span className="text-sm font-semibold">E-mail</span>
                <input className="border h-10 mt-2 pl-3" type="text" name="" id="" placeholder="Digite seu e-mail..." />
            </label>
        </div>
    );
}