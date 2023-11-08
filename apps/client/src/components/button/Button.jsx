import style from './Button.module.scss';

const Button = ({ text, inlineStyle, onClick, disabled }) => {
  // download button in card - 43px
  // navbar button - 54px
  // auth button - 87px
  return (
    <>
      <button
        className={style.btn}
        onClick={onClick}
        style={inlineStyle}
        disabled={disabled}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
