import { useState, useRef } from 'react';

import style from './DragDropFile.module.scss';
import Button from '../Button';

function handleFile(files) {
  alert('Number of files: ' + files.length);
}

// drag drop file component
const DragDropFile = () => {
  // drag state
  const [dragActive, setDragActive] = useState(false);
  // ref
  const inputRef = useRef(null);

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // triggers when file is dropped
  const handleDrop = function (e) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files);
    }
  };

  // triggers when file is selected with click
  const handleChange = function (e) {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files);
    }
  };

  // triggers the input when the button is clicked
  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <form
      id="form-file-upload"
      className={style.formFileUpload}
      onDragEnter={handleDrag}
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        ref={inputRef}
        type="file"
        id="input-file-upload"
        className={style.inputFileUpload}
        multiple={true}
        onChange={handleChange}
      />
      <label
        id="label-file-upload"
        htmlFor="input-file-upload"
        className={dragActive ? style.dragActive : ''}
      >
        <div className={style.textWrapper}>
          <p>Drag your files & photos here</p>
          <p>or</p>
          <p>Choose From</p>
        </div>
      </label>
      {dragActive && (
        <div
          id="drag-file-element"
          className={style.dragFileElement}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        ></div>
      )}
      <Button
            style={{
              cursor: 'pointer',
              padding: '17px',
              width: '147px',
              height: '71px',
              textAlign: 'center',
              fontSize: '34px',
              borderRadius: '5px',
            }}
            onClick={onButtonClick}
          >
            Upload a file
          </Button>
    </form>
  );
};

export default DragDropFile;
