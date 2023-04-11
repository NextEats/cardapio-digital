// import * as RadioGroup from '@radix-ui/react-radio-group';

// interface iRadioGroupItemProps {
//   value: string;
//   label: string;
//   id: string;
//   lableClassName?: string;
// }

// export default function RadioGroupItem({
//   value,
//   id,
//   label,
//   lableClassName,
// }: iRadioGroupItemProps) {
//   return (
//     <div className="flex items-center">
//       <RadioGroup.Item
//         className="bg-white w-[25px] h-[25px] rounded-full shadow-sm shadow-blue-500 hover:bg-violet3 focus:shadow-[0_0_0_2px] focus:shadow-blue-400 outline-none cursor-default"
//         value={value}
//         id={id}
//       >
//         <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-blue-600" />
//       </RadioGroup.Item>
//       <label
//         className={`text-base font-medium leading-none pl-[15px] ${lableClassName}`}
//         htmlFor={id}
//       >
//         {label}
//       </label>
//     </div>
//   );
// }
