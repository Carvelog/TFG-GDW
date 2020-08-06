import React from "react";
import styled from "@emotion/styled";

import { useSelector } from "react-redux";

import {Dropzone} from "../../components/Dropzone/Dropzone";
import ResultPage from "../ResultPage/ResultPage";

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

const Home = () => {
  // @ts-ignore
  const id = useSelector(store => store.id)
  return (
    <Div>
      <Title>Upload your retinal image to process it and get the diagnosis</Title>
      <Text>By submitting data below, you are agreeing to our Terms of service and Privacy policy.
      The ULL and this project are not responsible for the contents of your submission.
      Learn more.</Text>
      <Container>
        {id?
          <ResultPage id={id}/>
          :
          <Dropzone />
        }
      </Container>
    </Div>
  )
}

export default Home
