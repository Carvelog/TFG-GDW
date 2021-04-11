import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from 'axios'

import { Dropzone } from "../../components/Dropzone/Dropzone";
import ShowResult from "../../components/ShowResult/ShowResult";
import Loader from "../../components/Loader/Loader";
import DataForm from "../../components/Form/Form";

const Div = styled.div`
  min-height: 92vh;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Title = styled.h1`
  margin-top: 100px;
  display: flex;
  justify-content: center;
  font-size: 40px;
  text-align: center;
`

const Text = styled.p`
  display: flex;
  justify-content: center;
  font-size: 25px;
  text-align: center;
  padding: 60px 60px 10px 60px;
`

export interface ImageData {
  cropData: object,
  imageName: string,
  imageWidth: number,
  imageHeight: number,
  b64Image: string
}

const sendImageRequest = async (imageData: ImageData | undefined) => {
  return await axios({
    method: 'post',
    url: 'http://localhost:8080/api/process',
    data: imageData,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}

const getDiagnosisRequest = (imageID: string, setResult: any, setIsLoading: any, setErrors: any) => {
  const intervalId = setInterval(async () => {
    await axios({
      method: 'get',
      url: `http://localhost:8080/api/diagnosis/${imageID}`,
    })
      .then((res) => {
        clearInterval(intervalId)
        setResult(res.data.diagnosisResult)
        setIsLoading(false)
      })
      .catch((err) => {
        clearInterval(intervalId)
        setErrors(err)
      })
  }, 1500)
}

const getCropImage = async (imageId: string) => {
  return await axios({
    method: 'get',
    url: `http://localhost:8080/api/download/${imageId}`,
    headers: { }
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}

const sendMetadata = async (imageId: string, metadata: any) => {
  return await axios({
    method: 'post',
    url: `http://localhost:8080/api/metadata/${imageId}`,
    data: metadata,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      return err
    })
}

const Home = () => {
  const [ data, setData ] = useState()
  const [ ImageUuid, setImageUuid ] = useState()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ result, setResult ] = useState()
  const [ image, setImage ] = useState()
  const [ errors, setErrors] = useState()

  const handleChildUpload = async (data: ImageData | undefined) => {
    setData(data)

    setIsLoading(true)

    const imageID = await sendImageRequest(data)
    setImageUuid(imageID)
    setImage(await getCropImage(imageID))
    getDiagnosisRequest(imageID, setResult, setIsLoading, setErrors)
    //manejar errores
  }

  const handleMetadataUpload = async (data: any) => {
    await sendMetadata(ImageUuid, data)
  }

  const onClickReset = () => {
    setData(null)
    setResult(null)
  }

  return (
    <Div>
      <Container>
        {data?
          <>
            {isLoading?
              <Loader/>
              :
              <div>
                <ShowResult result={result} image={image}/>
                <DataForm onMetadataUpload={handleMetadataUpload} onClickReset={onClickReset}/>
              </div>
              }
          </>
          :
          <Div>
            <Title>Upload your retinal image to process it and get the diagnosis</Title>
            <Text>By submitting data below, the ULL, associates and this project are not responsible for the contents of your submission. In addition, the uploaded images will be stored in a database in order to train neural network models.</Text>
            <Text>To have a more accurate prediction look at this&nbsp;<a href="http://localhost:3000/guide"> documentation</a></Text>
            <Container>
              <Dropzone onChildUpload={handleChildUpload}/>
            </Container>
          </Div>
        }
      </Container>
    </Div>
  )
}

export default Home
