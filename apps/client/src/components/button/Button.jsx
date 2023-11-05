import * as style from './Button.module.scss';

const Button = ({ text, borderRadius, width, height, type }) => {
  return (
    <>
<<<<<<< HEAD
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
=======
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
>>>>>>> feature/client-cards
    </>
  );
};

export default Button;
