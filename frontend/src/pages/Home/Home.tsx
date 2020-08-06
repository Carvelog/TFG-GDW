import React, { useState } from "react";
import styled from "@emotion/styled";
import axios from 'axios'

import {Dropzone} from "../../components/Dropzone/Dropzone";
import ResultPage from "../ResultPage/ResultPage";
import Loader from "../../components/Loader/Loader";

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

const getDiagnosisRequest = (data: string) => {
  return axios({
    method: 'get',
    url: `http://localhost:5000/api/diagnosis/${data}`,
  });
}

const sendImageRequest = (imageData: ImageData | undefined, setIsLoading: any, setResult: any) => {
  axios({
    method: 'post',
    url: 'http://localhost:5000/api/process',
    data: imageData,
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      const intervalId = setTimeout(() => {
        getDiagnosisRequest(res.data)
          .then((res) => {
            clearInterval(intervalId)
            setResult(res.data.diagnosisResult)
            setIsLoading(false)
          })
          .catch((err) => {
            clearInterval(intervalId)
            console.log('err: ', err)
          })
      }, 1500)
    })
    .catch(err => {
      console.log('err: ', err);
    })
}

const Home = () => {
  const [ data, setData ] = useState()
  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ result, setResult] = useState()

  const handleChildUpload = (data: ImageData | undefined) => {
    setData(data)
    setIsLoading(true)
    sendImageRequest(data, setIsLoading, setResult)
  }

  console.log('data')
  return (
    <Div>
      <Title>Upload your retinal image to process it and get the diagnosis</Title>
      <Text>By submitting data below, you are agreeing to our Terms of service and Privacy policy.
      The ULL and this project are not responsible for the contents of your submission.
      Learn more.</Text>
      <Container>
        {data?
          <>
            {isLoading? <Loader/> : <ResultPage result={result}/>}
          </>
          :
          <Dropzone onChildUpload={handleChildUpload}/>
        }
      </Container>
    </Div>
  )
}

export default Home