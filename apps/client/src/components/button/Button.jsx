import * as style from './Button.module.scss';

const Button = ({ text, borderRadius, width, height, type }) => {
  return (
    <>
      <button
        className={style.btn}
        style={{
          borderRadius: `${borderRadius}px`,
          width: `${width}px`,
          height: `${height}px`,
        }}
      >
        {`${text}`}
      </button>
    </>
  );
};

export default Button;
