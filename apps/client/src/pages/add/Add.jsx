import { Form, useNavigate } from 'react-router-dom';

import Button from '../../components/Button';
import FileDropzone from '../../components/FileDropzone';

import style from './Add.module.scss';
import { useEffect, useState } from 'react';
import Input from '../../components/Input';
import useInput from '../../hooks/useInput';
import { createItem } from '../../services/apiItem';

const Add = () => {
  const [filesLength, setFilesLength] = useState(0);
  const [imagesLength, setImagesLength] = useState(0);
  const [error, setError] = useState(null);
  const [step, setStep] = useState(1);
  const navigation = useNavigate();

  const title = useInput('', { isEmpty: true, maxLengthError: 254 });
  const [images, setImages] = useState(null);
  const [about, setAbout] = useState('');

  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [uploadedImages, setUploadedImages] = useState(null);

  const handleCreatingItem = () => {
    const files = [...uploadedImages, ...uploadedFiles];
    const authToken = localStorage.getItem('token');
    createItem(title.value, about, files, authToken);
  };

  const handleFilesUpload = (e) => {
    if (e.target.files) {
      setError(false);
    }
    setUploadedFiles(e.target.files);
    setFilesLength([e.target.value].length);
    navigation('/ ')
  };

  const handleImagesUpload = (e) => {
    if (e.target.files) {
      setError(false);
    }
    setUploadedImages(e.target.files);
    setFilesLength([e.target.value].length);
  };

  useEffect(() => {}, [uploadedFiles]);

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
        {step === 1 ? (
          <>
            <form action="" className={style.firstForm}>
              {error && (
                <h1 style={{ color: 'red' }}>You must upload files first</h1>
              )}
              <h2>Upload your stl files here</h2>
              <input
                type="file"
                multiple={true}
                accept=".stl"
                onChange={(e) => handleFilesUpload(e)}
              />
            </form>
            {/* <FileDropzone
              types={[
                '.stl',
                '.obj',
                '.fbx',
                '.blend',
                '.dae',
                '.amf',
                '.3ds',
                '.x3d',
                '.3mf',
              ]}
              // amf, dae, 3ds, x3d, blend, ply, dxf, ai, svg,
              // cdr, ps, eps, epsi, sch, brd, png, gif, doc, docx

              errorMessage={'Please upload only supported type of files.'}
              setLength={(data) => setFilesLength(data)}
              initialError={error}
              onFilesUpload={handleFilesUpload}
            /> */}
            <Button
              onClick={() => {
                if (filesLength === 0) {
                  setError('You must upload at least one file');
                } else {
                  setError(null);
                  setStep((prevStep) => prevStep + 1);
                }
              }}
              inlineStyle={{
                color: '#007AFF',
                fontSize: '14px',
                fontWeight: '700',
                borderRadius: ' 5px',
                border: '1px solid #007AFF',
                background: '#FFF',
                width: '345px',
                height: '45px',
                margin: '25px 0',
              }}
            >
              Continue
            </Button>
          </>
        ) : (
          <>
            <form action="" className={style.secondForm}>
              {error && (
                <h1 style={{ color: 'red' }}>You must upload images first</h1>
              )}
              <h2>Upload your images here</h2>
              <input
                type="file"
                multiple={true}
                accept=".jpg, .jpeg, .png"
                onChange={(e) => handleImagesUpload(e)}
              />
            </form>
            {/* <FileDropzone
              types={['.jpg', '.jpeg', '.png', '.svg']}
              errorMessage={'Please upload only supported type of files.'}
              isImage={true}
              setLength={(data) => setFilesLength(data)}
              initialError={error}
              step={2}
              onFilesUpload={handleFilesUpload}
            /> */}
            <Form>
              <div className={style.inputWrapper}>
                <label>Title</label>
                <Input
                  name={'title'}
                  onChange={(e) => {
                    title.onChange(e);
                  }}
                  onBlur={(e) => title.onBlur(e)}
                  value={title.value}
                  type={'text'}
                  inlineStyle={{
                    borderRadius: '5px',
                    border: '1px solid #979797',
                    background: '#FFF',
                  }}
                />
              </div>
              <div className={style.inputWrapper}>
                <label>Description</label>
                <textarea
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                  maxLength={1024}
                />
              </div>
            </Form>
            <Button
              onClick={() => {
                if (filesLength === 0) {
                  setError('You must upload at least one image');
                } else {
                  if (!title.inputValid || about === 0) {
                    setError('You must to write the title and description');
                  } else {
                    setError(null);
                    setStep((prevStep) => prevStep + 1);
                    handleCreatingItem();
                  }
                }
              }}
              inlineStyle={{
                width: '345px',
                height: '45px',
                marginTop: '20px',
              }}
            >
              Publish
            </Button>
            <Button
              onClick={() => setStep((prevStep) => prevStep - 1)}
              inlineStyle={{
                color: '#007AFF',
                fontSize: '14px',
                fontWeight: '700',
                borderRadius: ' 5px',
                border: '1px solid #007AFF',
                background: '#FFF',
                width: '345px',
                height: '45px',
                margin: '25px 0',
              }}
            >
              Return
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default Add;
