interface iPrintOrderSeparator {
  text?: string;
}

export function PrintOrderSeparator({ text }: iPrintOrderSeparator) {
  return (
    <div className="flex items-center text-[12px]">
      {text ? (
        <>
          <hr className="flex-grow border-t border-dashed border-black" />
          <span className="px-2 font-bold">{text}</span>
          <hr className="flex-grow border-t border-dashed border-black" />
        </>
      ) : (
        <hr className="flex-grow my-1 border-t border-dashed border-black" />
      )}
    </div>
  );
}
