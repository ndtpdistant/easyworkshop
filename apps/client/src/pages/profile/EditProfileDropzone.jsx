import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import Camera from '../../assets/icons/Camera';

import style from './EditProfile.module.scss';

const EditProfileDropzone = ({ itemClass, alt, src, setImage }) => {
  const types = ['.jpg', '.jpeg', '.png', '.svg'];
  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const filteredFiles = acceptedFiles.filter((file) => {
        return types.some((type) => file.name.endsWith(type));
      });

      const newFiles = filteredFiles.map((file) => ({
        file,
        preview: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : null,
      }));
      setFiles((prevFiles) => []);
      setFiles((prevFiles) => {
        const isNewFile = prevFiles.filter((file) => {
          return file.file.name === newFiles[0].file.name;
        });

        if (isNewFile.length > 0) {
          setImage([...prevFiles]);
          return [...prevFiles];
        }
        setImage([...prevFiles, ...newFiles]);
        return [...prevFiles, ...newFiles];
      });
    },
    [types],
  );

  const acceptFileTypes = types.join(', ');

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptFileTypes,
    multiple: false,
  });
  return (
    <div {...getRootProps()} className={itemClass}>
      {files.length ? (
        <img src={files[0]?.preview} alt={alt} className={itemClass} />
      ) : (
        <img src={src} alt={alt} className={itemClass} />
      )}
      <input {...getInputProps()} />
      <Camera />
    </div>
  );
};

export default EditProfileDropzone;
