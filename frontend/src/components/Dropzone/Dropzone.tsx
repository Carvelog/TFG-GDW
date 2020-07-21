import 'react-image-crop/dist/ReactCrop.css';
import React, { useRef, useState } from 'react'
import styled from "@emotion/styled";
import axios from 'axios'
import Button from "../buttons/Button";
import imageIcon from '../../assets/gallery.png'

import dropzoneIcon from '../../assets/dragAndDrop.png'
import ReactCrop from 'react-image-crop';

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

  const [ imageUpload, setImageUpload ] = useState()
  const [ isCroped, setIsCroped ] = useState(false)
  const [ crop, setCrop ] = useState({aspect: 1});

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
      const file = e.dataTransfer.files[0];

      const reader = new FileReader();
      reader.onloadend = function () {
        setImageUpload(reader.result);
      }

      reader.readAsDataURL(file);
      e.dataTransfer.clearData();
    }
    else {
      const file = e.target.files?.[0]

      const reader = new FileReader();
      reader.onloadend = function () {
        setImageUpload(reader.result);
      }

      reader.readAsDataURL(file);
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

  const handleCropOnChange = (newCrop: any) => {
    setCrop(newCrop)
  }

  const saveCrop = () => {
    setImageUpload(crop)
    setIsCroped(true)
  }

  if(imageUpload && isCroped){
    return <Container>
      <Div ref={dropzoneDiv} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop} onDragOver={onDragOver} onClick={handleOnClick}>
        <div>
          <Img src={imageIcon} alt="" width="100" height="100"/>
          <Button onClick={handleDelete} type='round'>Delete</Button>
        </div>
        <P>Uploaded file</P>
      </Div>
      <input type="file" ref={hiddenInputFile} onChange={onDrop} style={{display:'none'}}/>
      <Button value="Upload" onClick={handleUpload} type='square'/>
    </Container>
  } else {
    if (imageUpload) {
      return <Container>
        <ReactCrop src={imageUpload} crop={crop} onChange={handleCropOnChange}/>
        <Button value="Accept" onClick={saveCrop} type='square'/>
      </Container>
    } else {
      return <Container>
        <Div ref={dropzoneDiv} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}
             onDragOver={onDragOver} onClick={handleOnClick}>
          <Img src={dropzoneIcon} alt="" width="100" height="100"/>
          <P>drag and drop</P>
        </Div>
        <input type="file" ref={hiddenInputFile} onChange={onDrop} style={{display:'none'}}/>
        <Button value="Upload" onClick={handleUpload} type='square'/>
      </Container>
    }
  }

  // return <Container>
  //   <Div ref={dropzoneDiv} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}
  //        onDragOver={onDragOver} onClick={handleOnClick}>
  //     <Img src={dropzoneIcon} alt="" width="100" height="100"/>
  //     <P>drag and drop</P>
  //   </Div>
  //   <input type="file" ref={hiddenInputFile} onChange={onDrop} style={{display:'none'}}/>
  //   <Button value="Upload" onClick={handleUpload} type='square'/>
  // </Container>
}
