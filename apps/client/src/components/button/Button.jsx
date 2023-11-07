import * as style from './Button.module.scss';

const Button = ({ text, type, className}) => {
  const clasName = `${style.btn} ${className}`;

  return (
    <>
      <button
        className={clasName}
        type={type}
      >
        {`${text}`}
      </button>
    </>
  );
};

export default Button;
