import React from "react";
import styled from "@emotion/styled";
import {Dropzone} from "../../components/Dropzone/Dropzone";

const Div = styled.div`
  height: 90vh;
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

export const LandingPage = () => {
  return (
    <Div>
      <Title>Upload your retinal image to process it and get the diagnosis</Title>
      <Text>By submitting data below, you are agreeing to our Terms of service and Privacy policy.
      The ULL and this project are not responsible for the contents of your submission.
      Learn more.</Text>
      <Container>
        <Dropzone />
      </Container>
    </Div>
  )
}
