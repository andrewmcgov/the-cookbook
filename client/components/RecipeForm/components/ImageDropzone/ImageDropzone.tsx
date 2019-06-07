import React from 'react';
import { useDropzone } from 'react-dropzone';

interface Props {
  updateImage: (ImageFile: File) => void;
}

interface ImageFile extends File {
  path: string;
  name: string;
  size: number;
  type: string;
}

function ImageDropzone(props: Props) {
  const onDrop = React.useCallback(acceptedFiles => {
    acceptedFiles.length > 0 && props.updateImage(acceptedFiles[0]);
  }, []);

  const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
    onDrop
  });

  const files = acceptedFiles.map((file: ImageFile) => {
    return (
      <img width="200" key={file.path} src={URL.createObjectURL(file)} alt="" />
    );
  });

  return (
    <div>
      <div {...getRootProps({ className: 'image-dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <div>
        <h4>Image:</h4>
        <ul>{files}</ul>
      </div>
    </div>
  );
}

export default ImageDropzone;
