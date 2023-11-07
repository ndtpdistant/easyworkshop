import style from './Input.module.scss';

const Input = ({ placeholder, className, type }) => {
  const clasName = `${style.input} ${className}`;

  return (
    <input
      className={clasName}
      type={type}
      placeholder={placeholder}
    />
  );
};

export default Input;
