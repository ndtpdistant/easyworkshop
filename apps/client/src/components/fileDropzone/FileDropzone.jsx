import { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';
// import axios from 'axios';

import style from './FileDropzone.module.scss';

import fileImg from '../../assets/images/uneversal.png';
import Button from '../Button';

import 'swiper/css';
import './swiperStyle.scss';

const FileDropzone = ({
  types,
  errorMessage,
  isImage,
  initialError,
  setLength,
  step,
}) => {
  const [files, setFiles] = useState([]);
  // const [uploadedFile, setUploadedFile] = useState();
  const [error, setError] = useState(initialError);

  // useEffect(() => {
  //   const slicedFiles = files.slice(0, -1);

  //   if (files.length > 5) {
  //     setFiles(slicedFiles);
  //     setError('You can upload up to 5 files for your project.');
  //   }
  // }, [uploadedFile, files]);

  useEffect(() => {
    if (step) {
      setLength(
        files.filter((file) => {
          return types.some((type) => file.file.name.endsWith(type));
        }).length,
      );
    } else {
      setLength(files.length);
    }
  }, [files, step]);

  useEffect(() => {
    setError(initialError);
  }, [initialError]);

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
        Supported file types for {isImage ? 'images' : '3D models'}: <br />
        <span>{types.slice(0, 4).join(', ')}</span>
        {isImage ? null : (
          <>
            {' '}
            and <span style={{ color: '#007AFF' }}>many more</span>.
          </>
        )}
      </p>
      {
        <div className={style.filesSection}>
          <div className={style.filesHeader}>
            {step && files.length
              ? files.filter((file) => {
                  return types.some((type) => file.file.name.endsWith(type));
                }).length > 0
                ? 'Uploaded files:'
                : null
              : files.length
              ? 'Uploaded files:'
              : null}
          </div>
          <Swiper
            style={{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }}
            // loop={true}
            spaceBetween={10}
            allowTouchMove={true}
            slidesPerView={3}
            centeredSlides={true}
            modules={[]}
            className="mySwiper2"
          >
            {files.map((file, index) => {
              if (isImage && !file.preview) {
                return;
              }
              if (!isImage && file.preview) {
                return;
              }
              return (
                <div
                  key={!isImage ? index : null}
                  className={style.fileWrapper}
                  style={isImage ? { flexDirection: 'column' } : null}
                >
                  <div className={style.file}>
                    {file.preview && (
                      <SwiperSlide key={isImage ? index : null}>
                        <img
                          src={file.preview}
                          alt={file.file.name}
                          style={{ maxWidth: '100%', maxHeight: '100%' }}
                        />
                        <Button
                          onClick={() => removeFile(file.file.name)}
                          inlineStyle={{
                            width: '80px',
                            height: '30px',
                            borderRadius: '5px',
                            color: '#FFF',
                            fontSize: '10px',
                            fontWeight: '700',
                            marginTop: '20px',
                          }}
                        >
                          Delete
                        </Button>
                      </SwiperSlide>
                    )}
                    <p
                      className={style.fileName}
                      style={isImage ? { display: 'none' } : null}
                    >
                      {file.file.name}
                    </p>
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
              );
            })}
          </Swiper>
        </div>
      }
    </div>
  );
};

export default FileDropzone;
