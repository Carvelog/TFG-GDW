import React from "react";
import styled from "@emotion/styled";
import crop_screenshot from "../../assets/screenshot1.png"

const Div = styled.div`
  min-height: 92vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Title = styled.h1`
  margin-top: 100px;
  font-size: 40px;
  text-align: center;
`

const Text = styled.p`
  font-size: 25px;
  text-align: center;
  padding: 20px;
`

const Img = styled.img`
  width: 20%;
  min-width: 150px;
`

const Guide = () => {
  return (
    <Div>
      <Title>How to prepare the image for upload</Title>
      <Text>For the prediction to be as accurate as possible, the image of the retina must be crop through the part of the optic nerve. Like in the example below.</Text>
      <Img src={crop_screenshot} alt="crop screenshot"/>
      <Text>Then press the "accept" and "upload" button.</Text>
    </Div>
  )
}

export default Guide
