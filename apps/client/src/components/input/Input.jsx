import * as style from './Input.module.scss';

const Input = ({ placeholder, height, width, borderRadius, paddingLeft }) => {
  return (
    <input
      className={style.input}
      style={{
        width: `${width}px`,
        height: `${height}px`,
        borderRadius: `${borderRadius}px`,
        paddingLeft: `${paddingLeft}px`,
      }}
      type="text"
      placeholder={placeholder}
    />
  );
};

export default Input;
