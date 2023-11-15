import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

import style from './FileDropzone.module.scss';

import fileImg from '../../assets/images/uneversal.png';
import Button from '../Button';

const FileDropzone = ({ types, errorMessage }) => {
  const [files, setFiles] = useState([]);
  // const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState();

  // useEffect(() => {
  //   const slicedFiles = files.slice(0, -1);

  //   if (files.length > 5) {
  //     setFiles(slicedFiles);
  //     setError('You can upload up to 5 files for your project.');
  //   }
  // }, [uploadedFile, files]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        return types.some((type) => file.name.endsWith(type));
      });

      // setUploadedFile(filteredFiles[0]);

      if (filteredFiles.length !== acceptedFiles.length) {
        setError(errorMessage);
        return;
      } else {
        setError(null);
      }

      const newFiles = filteredFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : null,
      }));
      setFiles((prevFiles) => {
        const isNewFile = prevFiles.filter((file) => {
          return file.file.name === newFiles[0].file.name;
        });

        if (isNewFile.length > 0) {
          setError('You cannot upload the same file more than once');
          return [...prevFiles];
        }

        return [...prevFiles, ...newFiles];
      });
    },
    [types, errorMessage],
  );

  const acceptFileTypes = types.join(', ');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFileTypes,
    multiple: true,
  });

  const removeFile = (fileToRemove) => {
    setError(null);
    setFiles((prevFiles) =>
      prevFiles.filter((file) => {
        return file.file.name !== fileToRemove;
      }),
    );
  };

  // const uploadFiles = async () => {
  //   try {
  //     const formData = new FormData();
  //     files.forEach((file) => {
  //       formData.append('files', file.file);
  //     });

  //     // Замените 'http://localhost:3000/files' на URL вашего сервера
  //     const response = await axios.post(
  //       'http://localhost:3000/files',
  //       formData,
  //       {
  //         headers: {
  //           'Content-Type': 'multipart/form-data',
  //         },
  //       }
  //     );

  //     console.log(response.data);
  //   } catch (error) {
  //     console.error('Ошибка при отправке файлов на сервер:', error);
  //   }
  // };

  return (
    <div className={style.wrapper}>
      <div {...getRootProps()} className={style.dropzone}>
        <input {...getInputProps()} />
        <img src={fileImg} alt="img" />
        {/* {isDragActive ? (
              <p>Перетащите файлы сюда...</p>
            ) : (
              <p>Перетащите файлы сюда или кликните для выбора файлов</p>
            )} */}
        <p>
          <span>Drag and drop</span> your files or <span>click</span> on this
          area to select files from your device
        </p>
        {/* <div className={`${style.hidden} ${}`}></div> */}
        <div className={style.error}>{error}</div>
      </div>
      <p>
        Supported file types for 3D models: <br />
        <span>{types.slice(0, 3).join(', ')}</span> and{' '}
        <span style={{ color: '#007AFF' }}>many more</span>.
      </p>
      {
        <div className={style.filesSection}>
          <div className={style.filesHeader}>
            Uploaded files:
          </div>
          {files.map((file, index) => (
          <div key={index} className={style.fileWrapper}>
            <div className={style.file}>
              {file.preview && (
                <img
                  src={file.preview}
                  alt={file.file.name}
                  style={{ maxWidth: '120px', maxHeight: '120px' }}
                />
              )}
              <p className={style.fileName}>{file.file.name}</p>
            </div>
            <Button
              onClick={() => removeFile(file.file.name)}
              inlineStyle={{
                width: '80px',
                height: '30px',
                borderRadius: '5px',
                color: '#FFF',
                fontSize: '10px',
                fontWeight: '700',
              }}
            >
              Delete
            </Button>
          </div>
          ))}
        </div>
      }
    </div>
  );
};

export default FileDropzone;
