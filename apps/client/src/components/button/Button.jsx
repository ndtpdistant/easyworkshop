import * as style from './Button.module.scss';

const Button = ({ text, borderRadius, width, height }) => {
  return (
    <>
      <a href="#">
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
      </a>
    </>
  );
};

export default Button;
