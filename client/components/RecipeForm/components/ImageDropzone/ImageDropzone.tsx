import React from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  updateImage: (ImageFile: File) => void;
  currentImage: string;
}

interface ImageFile extends File {
  path: string;
  name: string;
  size: number;
  type: string;
}

function ImageDropzone({ updateImage, currentImage }: Props) {
  const onDrop = React.useCallback(acceptedFiles => {
    acceptedFiles.length > 0 && updateImage(acceptedFiles[0]);
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
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div className="recipe-form__image">{imageContent}</div>
    </div>
  );
}

export default ImageDropzone;