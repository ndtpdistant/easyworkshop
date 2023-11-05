import * as style from './Button.module.scss';

const Button = ({ text, borderRadius, width, height, type }) => {
  return (
    <>
      <a href="#">
        <button
          type={type}
          className={style.btn}
          style={{
            borderRadius: `${borderRadius}px`,
            width: `${width}px`,
            height: `${height}px`,
          }}
        >
          {`${text}`}
        </button>
      </a>
    </>
  );
};

export default Button;
