import { useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import FileDropzone from '../../components/FileDropzone';

import style from './Add.module.scss';
import { useState } from 'react';

const Add = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigate();

  return (
    <div className={style.wrapper}>
      <div className={style.addHeader}>
        <div className={style.title}>Upload a new model</div>
        <div className={style.close} onClick={() => navigation(-1)}>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={style.container}>
        <FileDropzone
          types={['.stl', '.obj', '.fbx', '.blend', '.dae', '.amf', '.3ds', '.x3d', '.3mf']} 
          // amf, dae, 3ds, x3d, blend, ply, dxf, ai, svg,
          // cdr, ps, eps, epsi, sch, brd, png, gif, doc, docx
      
          errorMessage={'Please upload only supported files.'}
        />
        <Button
          inlineStyle={{
            color: '#007AFF',
            fontSize: '14px',
            fontWeight: '700',
            borderRadius: ' 5px',
            border: '1px solid #007AFF',
            background: '#FFF',
            width: '345px',
            height: '45px',
            marginTop: '25px'
          }}
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default Add;
