interface Button {
  text: string;
  Disabled?: true | false | boolean;
  bgColor?: 'red' | 'blue' | string;
  txtColor?: string;
  OnClick?: Function;
  Type?: 'button' | 'submit' | 'reset' | undefined;
}

export default function Button(props: Button) {
  function onClickFunc() {
    if (props.OnClick) {
      props.OnClick();
    }
  }
  return (
    <button
      className={`bg-${props.bgColor || 'blue'}-500 text-${
        props.txtColor || 'white'
      } py-2 px-4 rounded-md mb-4 mt-4 ml-2 mr-2`}
      disabled={props.Disabled}
      {...props}
      onClick={() => onClickFunc()}
      type={props.Type || 'button'}
    >
      {props.text}
    </button>
  );
}
