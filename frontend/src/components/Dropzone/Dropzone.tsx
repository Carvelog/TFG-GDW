import React, { useRef, useState } from 'react'
import styled from "@emotion/styled";
import axios from 'axios'
import Button from "../buttons/Button";
import imageIcon from '../../assets/gallery.png'
import dropzoneIcon from '../../assets/dragAndDrop.png'

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
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 50px;
`

const Img = styled.img`
  margin: 0;
  pointer-events: none;
`

const P = styled.p`
  pointer-events: none;
`

export const Dropzone = () => {

  const [ imageUpload, setImageUpload ] = useState(null)

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
      setImageUpload(files)

      e.dataTransfer.clearData();
    }
    else {
      const files = e.target.files
      setImageUpload(files)
    }

    // for (let i = 0; i < files.length; i++) {
    //   console.log("Type: " + files[i].type);
    // }

  }

  const handleUpload = () => {
    if(imageUpload !== undefined)
      console.log(imageUpload)
      // axios
    else
      console.log('no file uploaded');
    //mensaje de error
  }

  const handleOnClick = (e: any) => {
    // @ts-ignore
    hiddenInputFile.current.click();
  }

  const handleDelete = (e: any) => {
    setImageUpload(null)
  }

  return (
    <Container>
      <Div ref={dropzoneDiv} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} onDragOver={onDragOver} onClick={handleOnClick}>
        {imageUpload ?
            <div>
              <Img src={imageIcon} alt="" width="100" height="100"/>
              <Button value='x' onClick={handleDelete} type='round'>Delete</Button>
            </div>
          :
            <Img src={dropzoneIcon} alt="" width="100" height="100"/>
        }
        <P>drag and drop</P>
      </Div>
      <input type="file" ref={hiddenInputFile} onChange={onDrop} style={{display:'none'}}/>
      <Button value="Upload" onClick={handleUpload} type='square'/>
    </Container>
  )
}
