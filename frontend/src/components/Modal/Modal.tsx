import React, { FC, useState } from "react";
import styled from "@emotion/styled";
import Button from "../Buttons/Button";

const Div = styled.div`
  position: absolute;
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const ModalContainer = styled(Div)`
  width: 500px;
  height: 350px;
  background-color: #FFFFFF;
  box-shadow: 0 10px 10px 4px #444445;
  border-radius: 5px;
  display: flex;
  justify-content: center;
`

const Container = styled(Div)`
  width: 100%;
  height: 130vh;
  background-color: rgba(0,0,0,0.6);
`

const P = styled.p`
  display: flex;
  justify-content: center;
  font-size: 25px;
  text-align: center;
  color: #000000;
`

const H2 = styled.h2`
  color: #000000;
  font-size: 25px;
  text-align: center;
  padding-bottom: 15px;
  margin: 0;
`

const ModalContent = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  padding: 30px 30px 10px 30px;
`

const Box = styled.div`
  width: 100%;
  border-bottom: 1px solid #000000;
`


const Modal: FC = () => {
  const [ close, setClose ] = useState(true)

  const onClose = () => {
    setClose(!close)
  }

  return <div>
    {close?
      <Container>
        <ModalContainer>
          <ModalContent>
            <Box>
              <H2>WARNING</H2>
            </Box>
            <Box>
              <P>This website is scientific in nature and for research purposes, so the results obtained should not be taken as final</P>
            </Box>
            <Button onClick={onClose} type="square" value="I agree"/>
          </ModalContent>
        </ModalContainer>
      </Container>
      :
      null
    }
  </div>
}

export default Modal
