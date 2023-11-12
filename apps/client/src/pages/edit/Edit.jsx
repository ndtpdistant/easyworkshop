import DragDropFile from '../../components/dragDropFile';
import style from './Edit.module.scss';

const Edit = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <DragDropFile />;
      </div>
    </div>
  );
};

export default Edit;
