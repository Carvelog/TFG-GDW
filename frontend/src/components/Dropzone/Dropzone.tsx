import 'react-image-crop/dist/ReactCrop.css';
import React, { useRef, useState } from 'react'
import styled from "@emotion/styled";
import axios from 'axios'
import Button from "../buttons/Button";
import imageIcon from '../../assets/gallery.png'

import { useDispatch } from "react-redux";
import { saveId } from "../../redux/actions";

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
  background: #A6E7DC;
  outline: none;
  margin-bottom: 15px;
  cursor: pointer;

  &:hover{
    background: #8AE7DB;
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

interface ImageData {
  cropData: object,
  imageName: string,
  imageWidth: number,
  imageHeight: number,
  b64Image: string
}

const getDiagnosisRequest = (data: string) => {
  return axios({
    method: 'get',
    url: `http://localhost:5000/api/diagnosis/${data}`,
  });
}

export const Dropzone = () => {
  const [ imageData, setImageData ] = useState<ImageData>()
  const [ crop, setCrop ] = useState({aspect: 1});

  const [ imageUpload, setImageUpload ] = useState()
  const [ isCropped, setIsCropped ] = useState(false)

  const hiddenInputFile = useRef(null);
  const dropzoneDiv = useRef(null)

  const dispatch = useDispatch()

  const onDragEnter = (e: any) => {
    e.preventDefault()
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#8AE7DB';

  }

  const onDragLeave = (e: any) => {
    e.preventDefault()
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#A6E7DC';
  }

  const onDragOver = (e: any) => {
    e.preventDefault()
  }

  const onDrop = (e: any) => {
    // @ts-ignore
    dropzoneDiv.current.style.backgroundColor = '#A6E7DC';
    e.preventDefault();

    if (e.dataTransfer !== undefined) {
      const file = e.dataTransfer.files[0];

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUpload(reader.result);
        setImageData({
          imageName: file.name,
          b64Image: reader.result
        } as ImageData)
      }

      reader.readAsDataURL(file);
      e.dataTransfer.clearData();
    }
    else {
      const file = e.target.files?.[0]

      const reader = new FileReader();
      reader.onloadend = function () {
        setImageUpload(reader.result);
        setImageData({
          imageName: file.name,
          b64Image: reader.result
        } as ImageData)
      }

      reader.readAsDataURL(file);
    }
  }

  const handleUpload = () => {
    setImageUpload(null)
    setIsCropped(false)

    if(imageUpload !== undefined) {
      axios({
        method: 'post',
        url: 'http://localhost:5000/api/process',
        data: imageData,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(res => {
          console.log('result: ', res.data)
          dispatch(saveId(res.data))

          // const intervalId = setTimeout(() => {
          //   getDiagnosisRequest(res.data)
          //     .then((res) => {
          //       clearInterval(intervalId)
          //       console.log('result: ', res.data.diagnosisResult)
          //       dispatch(saveId(res.data.diagnosisResult))
          //     })
          //     .catch((err) => {
          //       clearInterval(intervalId)
          //       console.log('err: ', err)
          //     })
          // }, 1500)
        })
        .catch(err => {
          console.log('err: ', err);
        })
    }
    else{
      console.log('no file uploaded');
      // mensaje de error, especificar que se requiere una imagen
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
    const dropZoneContainerSize = document.getElementById("cropzone");
    setIsCropped(true);
    setImageData({
      cropData: crop,
      imageName: imageData?.imageName,
      imageWidth: dropZoneContainerSize?.clientWidth,
      imageHeight: dropZoneContainerSize?.clientHeight,
      b64Image: imageData?.b64Image
    } as ImageData)
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
                <Button onClick={handleDelete} type='close'/>
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
          <P>Drag and drop</P>
        </Div>
        <input type="file" ref={hiddenInputFile} onChange={onDrop} style={{display:'none'}}/>
      </>
    }
  </Container>
}
