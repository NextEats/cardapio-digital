interface Iprops {
  placeHolder?: string;
  Disabled?: true | false | boolean;
  Type?: 'text' | 'number' | 'time' | undefined;
  label?: string;
  value: string | number | undefined;
  setValue: Function;
  required?: boolean;
}

export default function TextFiled(props: Iprops) {
  return (
    <div>
      {props.label ? (
        <label htmlFor="x0" className="text-sm text-navy-700 font-bold">
          {' '}
          {props.label}{' '}
        </label>
      ) : (
        ''
      )}
      <input
        type={props.Type}
        required={props.required || false}
        value={props.value}
        placeholder={props.placeHolder}
        onChange={el => props.setValue(el.target.value)}
        className="w-full rounded-lg border border-gray-400 p-2 mt-2"
      />
    </div>
  );
}
