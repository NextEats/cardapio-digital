interface Iopt {
  id: number;
  label: string;
}
interface Iprops {
  placeHolder?: string;
  Disabled?: true | false | boolean;
  Type?: 'text' | 'number' | 'time' | undefined;
  label?: string;
  value: string | number | undefined;
  setValue: Function;
  required?: boolean;
  options: Iopt[];
}

export default function Select(props: Iprops) {
  return (
    <div>
      {props.label ? (
        <label
          htmlFor="countries"
          className="block mb-2 text-sm text-navy-700 font-bold"
        >
          {props.label}
        </label>
      ) : (
        ''
      )}
      <select
        id="countries"
        value={props.value}
        className="w-full rounded-lg border border-gray-400 p-2 mt-2"
        onChange={e => props.setValue(e.target.value)}
      >
        {props.options.map(item => (
          <option value={item.id} key={item.id}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  );
}
