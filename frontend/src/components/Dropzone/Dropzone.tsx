import React, {useCallback} from 'react'
import { useDropzone } from 'react-dropzone'
import styled from "@emotion/styled";
import axios from 'axios'

const Div = styled.div`
  width: 50%;
  height: 400px;
  background: #b881dd;
  border-radius: 7px;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  outline: none;
`

export const Dropzone = () => {
  const onDrop = useCallback( (acceptedFiles) => {

    const data = new FormData();
    data.append("image", acceptedFiles);

    // fetch("http://localhost:5000/api/upload", {
    //   method: 'POST',
    //   body: datos,
    // })
    //   .then(response => response.json())
    //   .then(result => console.log(result))
    //   .catch(error => console.log('error', error));

    axios({
      method: 'post',
      url: 'http://localhost:5000/api/upload',
      data: data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
      .then(res => {
        console.log('res: ', res);
      })
      .catch(err => {
        console.log('err: ', err);
      })

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
