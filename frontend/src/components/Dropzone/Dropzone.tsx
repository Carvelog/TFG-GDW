import 'react-image-crop/dist/ReactCrop.css';
import React, { useRef, useState } from 'react'
import styled from "@emotion/styled";
import axios from 'axios'
import Button from "../buttons/Button";
import imageIcon from '../../assets/gallery.png'

import dropzoneIcon from '../../assets/dragAndDrop.png'
import ReactCrop from 'react-image-crop';

const Div = styled.div`
  width: 100%;
  height: 200px;
  border-radius: 7px;
  border: 2px dashed black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: #b881dd; /*//#72bbab*/
  outline: none;
  margin-bottom: 15px;
  cursor: pointer;

  &:hover{
    background: #8d1adb;
  }
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

  const [ isCropped, setIsCropped ] = useState(false)
  const [ crop, setCrop ] = useState({aspect: 1});

  const hiddenInputFile = useRef(null);
  const dropzoneDiv = useRef(null)

  const onDragEnter = (e: any) => {
    e.preventDefault()
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#8d1adb';

  }

  const onDragLeave = (e: any) => {
    e.preventDefault()
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#b881dd';
  }

  const onDragOver = (e: any) => {
    e.preventDefault()
  }

  const onDrop = (e: any) => {
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
  }

  const handleUpload = () => {
    if(imageUpload !== undefined) {
      console.log(imageUpload)
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
    }
    else{
      console.log('no file uploaded');
      // mensaje de error
    }
  }

  const handleOnClick = (e: any) => {
    // @ts-ignore
    hiddenInputFile.current.click();
  }

  const handleDelete = (e: any) => {
    setImageUpload(null)
    setIsCropped(false)
  }

  const handleCropOnChange = (newCrop: any) => {
    setCrop(newCrop)
  }

  const saveCrop = () => {
    console.log(crop)
    console.log(imageUpload)
    const dropZoneContainerSize = document.getElementById("cropzone");
    console.log('w ',dropZoneContainerSize?.clientWidth)
    console.log('h ',dropZoneContainerSize?.clientHeight)
    setIsCropped(true);
  }

  return <Container>
    {imageUpload ?
      <>
        {isCropped ?
          <>
            <Div ref={dropzoneDiv}
                 onDragEnter={onDragEnter}
                 onDragLeave={onDragLeave}
                 onDragOver={onDragOver}
                 onClick={handleOnClick}
                 onDrop={onDrop}
            >
              <div>
                <Img src={imageIcon} alt="" width="100" height="100"/>
                <Button onClick={handleDelete} type='round'>Delete</Button>
              </div>
              <P>Uploaded file</P>
              <Button value="Upload" onClick={handleUpload} type='square'/>
            </Div>
          </>
          :
          <div>
            <div id="cropzone">
              <ReactCrop src={imageUpload} crop={crop} onChange={handleCropOnChange}/>
            </div>
            <Button value="Accept" onClick={saveCrop} type='square'/>
          </div>
        }
      </>
      :
      <>
        <Div ref={dropzoneDiv}
             onDragEnter={onDragEnter}
             onDragLeave={onDragLeave}
             onDragOver={onDragOver}
             onClick={handleOnClick}
             onDrop={onDrop}
        >
          <Img src={dropzoneIcon} alt="" width="100" height="100"/>
          <P>drag and drop</P>
        </Div>
        <input type="file" ref={hiddenInputFile} onChange={onDrop} style={{display:'none'}}/>
      </>
    }
  </Container>
}
