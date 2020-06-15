import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import styled from "@emotion/styled";

const Div = styled.div`
  width: 50%;
  height: 400px;
  background: #b881dd;
  border-radius: 7px;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
`

export const Dropzone = () => {
  const onDrop = useCallback(acceptedFiles => {
    console.log('uploaded file');
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <Div {...getRootProps()}>
      <input {...getInputProps()} />
      {
        isDragActive ? <p>Drop the files here ...</p> : <p>Drag & drop your image here</p>
      }
    </Div>
  )
};
