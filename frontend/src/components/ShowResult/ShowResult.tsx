import React, { FC } from "react";
import Button from "../Buttons/Button";
import styled from "@emotion/styled";

interface ResultPageProps {
  result: number
  image: string
  onClickReset: () => void
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`

const Div = styled(Container)`
  flex-direction: column;
  justify-content: center;
`

const ImgContainer = styled.div`
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: space-between;
 background: red;
 margin: 0 40px 0 40px ;

`

const P = styled.p`
  display: flex;
  justify-content: center;
  font-size: 25px;
  text-align: center;
`

const Text = styled(P)`
 background: lightgray;
 padding: 10px;
 border-radius: 6px;
 width: fit-content;
 margin: 0;
`

const ShowResult: FC<ResultPageProps> = ({result, image, onClickReset}) => {

  return <Div>
    <Container>
      <ImgContainer>
        <img src={`data:image/jpeg;base64,${image}`} alt="" width="200" height="200"/>
        <P>Original</P>
      </ImgContainer>
      <ImgContainer>
        <img src={`data:image/jpeg;base64,${image}`} alt="" width="200" height="200"/>
        <P>Heatmap</P>
      </ImgContainer>
    </Container>
    <Text>Result: {result}</Text>
    <Button onClick={onClickReset} type="square" value="Ok"/>
  </Div>
}

export default ShowResult

