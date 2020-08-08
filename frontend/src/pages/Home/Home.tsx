import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from 'axios'

import { Dropzone } from "../../components/Dropzone/Dropzone";
import ResultPage from "../ResultPage/ResultPage";
import Loader from "../../components/Loader/Loader";
import Button from "../../components/Buttons/Button";

const Div = styled.div`
  min-height: 80vh;
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
  padding: 60px;
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
    url: 'http://localhost:5000/api/process',
    data: imageData,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log('err: ', err)
      return err
    })
}

const getDiagnosisRequest = (imageID: string, setResult: any, setIsLoading: any) => {
  const intervalId = setInterval(async () => {
    await axios({
      method: 'get',
      url: `http://localhost:5000/api/diagnosis/${imageID}`,
    })
      .then((res) => {
        clearInterval(intervalId)
        setResult(res.data.diagnosisResult)
        setIsLoading(false)
      })
      .catch((err) => {
        clearInterval(intervalId)
        console.log('err: ', err)
      //  guardar el error en un setError para manejarlo
      })
  }, 1500)
}

const getCropImage = async (imageId: string) => {
  return await axios({
    method: 'get',
    url: `http://localhost:5000/api/download/${imageId}`,
    headers: { }
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
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ result, setResult ] = useState()
  const [ image, setImage ] = useState()

  const handleChildUpload = async (data: ImageData | undefined) => {
    setData(data)

    setIsLoading(true)

    const imageID = await sendImageRequest(data)
    setImage(await getCropImage(imageID))
    getDiagnosisRequest(imageID, setResult, setIsLoading)

  }

  const onClockReset = () => {
    setData(null)
    setResult(null)
  }

  return (
    <Div>
      <Title>Upload your retinal image to process it and get the diagnosis</Title>
      <Text>By submitting data below, you are agreeing to our Terms of service and Privacy policy.
      The ULL and this project are not responsible for the contents of your submission.
      Learn more.</Text>
      <Container>
        {data?
          <>
            {isLoading?
              <Loader/>
              :
              <div>
                <ResultPage result={result} image={image}/>
                <Button value="Ok" onClick={onClockReset} type={"square"}/>
              </div>
              }

          </>
          :
          <Dropzone onChildUpload={handleChildUpload}/>
        }
      </Container>
    </Div>
  )
}

export default Home
