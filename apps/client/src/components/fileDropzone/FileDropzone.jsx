import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Swiper, SwiperSlide } from 'swiper/react';

import fileImg from '../../assets/images/uneversal.png'; // Adjust the path as needed
import style from './FileDropzone.module.scss';
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
  onFilesUpload
}) => {
  const [files, setFiles] = useState([]);
  const [error, setError] = useState(initialError);

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

  const handleFilesUpload = useCallback(
    async (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        return types.some((type) => file.name.endsWith(type));
      });

      if (filteredFiles.length !== acceptedFiles.length) {
        setError(errorMessage);
        return;
      } else {
        setError(null);
      }

      const newFiles = await Promise.all(
        filteredFiles.map(async (file) => {
          const preview =
            file.type.startsWith('image/')
              ? await new Promise((resolve) => {
                  const reader = new FileReader();
                  reader.onload = () => resolve(reader.result);
                  reader.readAsDataURL(file);
                })
              : null;

          return {
            file,
            preview,
          };
        })
      );

      setFiles((prevFiles) => {
        const existingFileNames = prevFiles.map((file) => file.file.name);
        const uniqueNewFiles = newFiles.filter(
          (file) => !existingFileNames.includes(file.file.name)
        );

        const updatedFiles = [...prevFiles, ...uniqueNewFiles];
        onFilesUpload(updatedFiles); // Use a callback to ensure a safe update
        return updatedFiles;
      });
    },
    [types, errorMessage, onFilesUpload]
  );

  const acceptFileTypes = types.join(', ');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFilesUpload,
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

  return (
    <div className={style.wrapper}>
      <div {...getRootProps()} className={style.dropzone}>
        <input {...getInputProps()} />
        <img src={fileImg} alt="img" />
        <p>
          <span>Drag and drop</span> your files or <span>click</span> on this
          area to select files from your device
        </p>
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
          spaceBetween={10}
          allowTouchMove={true}
          slidesPerView={3}
          centeredSlides={true}
          modules={[]}
          className="dropzoneSwiper"
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
    </div>
  );
};

export default FileDropzone;
