import React, { useRef, useState } from 'react'
import styled from "@emotion/styled";
import axios from 'axios'
import Button from "../buttons/Button";

// import { useForm } from 'react-hook-form'
// export const Dropzone = () => {
//   const { register, handleSubmit } = useForm()
//
//   const onSubmit = (data: any)=> {
//
//     console.log(data.image?.[0])
//
//     const imageData = new FormData();
//     imageData.append("image", data.image?.[0]);
//
//     axios({
//       method: 'post',
//       url: 'http://localhost:5000/api/upload',
//       data: imageData,
//       headers: {
//         'Content-Type': 'multipart/form-data'
//       }
//     })
//       .then(res => {
//         console.log('res: ', res);
//       })
//       .catch(err => {
//         console.log('err: ', err);
//       })
//   }
//
//   return (
//     <div>
//       <form method="post" encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
//         <input ref={register} type="file" name="image"/>
//         <input ref={register} type="submit" value="Upload"/>
//       </form>
//     </div>
//   )
// };

const Div = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 7px;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #b881dd;
  outline: none;
  margin-bottom: 15px;
`

const Container = styled.div`
  width: 65%;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

const Img = styled.img`
  pointer-events: none;
`

const P = styled.p`
  pointer-events: none;
`

export const Dropzone = () => {

  const [ imageData, setImageData ] = useState(null)

  const hiddenInputFile = useRef(null);
  const dropzoneDiv = useRef(null)

  const onDragEnter = (e: any) => {
    e.preventDefault()
    console.log('enter');
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#8d1adb';

  }

  const onDragLeave = (e: any) => {
    e.preventDefault()
    console.log('leave');
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#b881dd';
  }

  const onDragOver = (e: any) => {
    e.preventDefault()
  }

  const onDrop = (e: any) => {
    console.log('File(s) dropped');
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#b881dd';

    // Prevent default behavior (Prevent file from being opened)
    e.preventDefault();

    if (e.dataTransfer !== undefined) {
      const files = e.dataTransfer.files;
      setImageData(files)

      // Pass event to removeDragData for cleanup
      e.dataTransfer.clearData();
    }
    else {
      const files = e.target.files
      setImageData(files)
    }

    // for (let i = 0; i < files.length; i++) {
    //   console.log("Type: " + files[i].type);
    // }

  }

  const handleUpload = () => {
    if(imageData !== undefined)
      console.log(imageData)
      // axios
    else
      console.log('no file uploaded');
    //mensaje de error
  }

  const handleOnClick = (e: any) => {
    // @ts-ignore
    hiddenInputFile.current.click();

  }

  return (
    <Container>

      <Div ref={dropzoneDiv} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} onDragOver={onDragOver} onClick={handleOnClick}>
        {/*<Img src="" alt="Lamp" width="100" height="100"/>*/}
        <P>drag and drop</P>
      </Div>
      <input type="file" ref={hiddenInputFile} onChange={onDrop} style={{display:'none'}}/>
      <Button value="Upload" onClick={handleUpload}/>
    </Container>
  )
}
