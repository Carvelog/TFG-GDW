import React, { FC } from "react";
import Button from "../Buttons/Button";
import styled from "@emotion/styled";

interface ResultPageProps {
  result: number
  image: string
  onClickReset: () => void
}

const Div = styled.div`
  display: flex;
  justify-content: center;
`

const Container = styled(Div)`
  flex-direction: column;
  align-items: center;
  margin: 30px;
`

const ImgContainer = styled(Container)`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px;
  box-shadow: 0 4px 8px 1px #9C9FA0;
`

const P = styled.p`
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  text-align: center;
`

const ColoredP = styled(P)`
  background-color: #A6E7DC;
  border-radius: 10px;
  margin: 0 0 0 5px;
`

const H2 = styled.h2`
  color: #5C068C;
  border-bottom: 1px solid #3C02A3;
  padding: 0 30px 10px 30px;
`

const ShowResult: FC<ResultPageProps> = ({result, image, onClickReset}) => {

  return <div>
    <Div>
      <ImgContainer>
        <H2>Original</H2>
        <img src={`data:image/jpeg;base64,${image}`} alt="" width="200" height="200"/>
      </ImgContainer>
    </Div>
    <Container>
      <P>The probability that this image has glaucoma is:<ColoredP>{(result*100).toFixed(3)}%</ColoredP></P>
      <Button onClick={onClickReset} type="square" value="Accept"/>
    </Container>
  </div>

}

export default ShowResult

