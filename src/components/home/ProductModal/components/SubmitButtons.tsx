export default function SubmitButtons({
    handleSubmit,
}: {
    handleSubmit: (e: any) => void;
}) {
    return (
        <div className="flex flex-1 items-center">
            <div
                onClick={(e) => handleSubmit(e)}
                className="h-10 flex flex-1 items-center justify-center bg-gray-700 shadow-md rounded-md"
            >
                <div className="cursor-pointer">
                    <span className="uppercase text-white text-md font-normal opacity-80">
                        Adicionar
                    </span>
                </div>
            </div>
        </div>
    );
}
