import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
// import axios from 'axios';

import style from './FileDropzone.module.scss';

import stlImg from '../../assets/images/stl.png';
import Button from '../Button';

const FileDropzone = ({ types, errorMessage }) => {
  const [files, setFiles] = useState([]);
  const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    const slicedFiles = files.slice(0, -1);

    if (files.length > 5) {
      setFiles(slicedFiles);
      setError('error 1');
    }
    // else {
    //   if (slicedFiles.length > 1) {
    //     setFiles(
    //       slicedFiles.filter((file) => {
    //         console.log(slicedFiles);
    //         console.log(file.file.name);
    //         return !files.some((file) => file.file.name === uploadedFile.name);
    //       })
    //     );
    //   }
    // }
  }, [uploadedFile, files]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        return types.some((type) => file.name.endsWith(type));
      });

      setUploadedFile(filteredFiles[0]);

      if (filteredFiles.length !== acceptedFiles.length) {
        setError(errorMessage);
      } else {
        setError(null);
      }

      const newFiles = filteredFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : null,
      }));
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    },
    [types, errorMessage],
  );

  const acceptFileTypes = types.join(', ');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFileTypes,
    multiple: true,
  });

  const removeFile = () => {
    const newFiles = [];
    setFiles(newFiles);
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
    <div>
      <div {...getRootProps()} className={style.dropzone}>
        <input {...getInputProps()} />
        {files.length > 0 ? (
          files.map((file, index) => (
            <div key={index} className={style.file}>
              {file.preview && (
                <img
                  src={file.preview}
                  alt={file.file.name}
                  style={{ maxWidth: '120px', maxHeight: '120px' }}
                />
              )}
              <p className={style.fileName}>{file.file.name}</p>
            </div>
          ))
        ) : (
          <>
            <img src={stlImg} alt="img" />
            {/* {isDragActive ? (
              <p>Перетащите файлы сюда...</p>
            ) : (
              <p>Перетащите файлы сюда или кликните для выбора файлов</p>
            )} */}
            <p>
              Click in this area to select <span>stl</span> files.
            </p>
            <p>You can upload up to 5 files for your project.</p>
          </>
        )}
        <div className={style.error}>{error}</div>
      </div>
      <Button
        onClick={() => removeFile()}
        inlineStyle={{
          width: '125px',
          height: '30px',
          borderRadius: '5px',
          color: '#FFF',
          fontSize: '10px',
          fontWeight: '700',
        }}
      >
        Delete all files
      </Button>
    </div>
  );
};

export default FileDropzone;
