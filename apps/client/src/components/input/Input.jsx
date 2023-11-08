import style from './Input.module.scss';

const Input = ({ value, label, name, placeholder, type, onChange, onBlur }) => {
  return (
    <input
      type={type}
      value={value}
      name={name}
      className={style.input}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default Input;
