import * as React from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  onImageChange: (ImageFile: File) => void;
  currentImage: string;
}

interface ImageFile extends File {
  path: string;
  name: string;
  size: number;
  type: string;
}

function ImageDropzone({ onImageChange, currentImage }: Props) {
  const onDrop = React.useCallback(acceptedFiles => {
    acceptedFiles.length > 0 && onImageChange(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const files = acceptedFiles.map((file: ImageFile) => {
    return <img key={file.path} src={URL.createObjectURL(file)} alt="" />;
  });

  const imageContent =
    files.length > 0 ? (
      files
    ) : currentImage !== '' ? (
      <img src={currentImage} alt="" />
    ) : null;

  return (
    <div>
      <div {...getRootProps({ className: 'image-dropzone' })}>
        <input {...getInputProps()} />
        <p>
          Drag 'n' drop an image here, or click to select files. If uploading
          from an iPhone, a Live Photo will not work.
        </p>
      </div>
      <div className="recipe-form__image">{imageContent}</div>
    </div>
  );
}

export default ImageDropzone;
