import style from './Input.module.scss';

const Input = ({
  value,
  id,
  name,
  placeholder,
  type,
  onChange,
  onBlur,
  inlineStyle,
  maxLen
}) => {
  return (
    <input
      type={type}
      value={value}
      maxLength={maxLen}
      name={name}
      style={inlineStyle}
      className={style.input}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
      id={id}
    />
  );
};

export default Input;
