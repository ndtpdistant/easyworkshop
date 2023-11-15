import FileDropzone from '../../components/FileDropzone';

import style from './Add.module.scss';

const Add = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.addHeader}>
          <div className={style.title}>Upload a new model</div>
          <div className={style.close}>
            <span></span>
            <span></span>
          </div>
          <FileDropzone types={['.stl']} errorMessage={'Please upload only STL files.'} />
        </div>
      </div>
    </div>
  );
};

export default Add;
