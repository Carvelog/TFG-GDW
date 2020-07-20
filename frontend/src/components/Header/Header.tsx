import React from 'react'
import styled from "@emotion/styled";

import Button from "../buttons/Button";
import logo from "../../assets/ULL_logo.svg"

const Container = styled.div`
  max-height: 100px;
  min-height: 50px;
  background: #5C068C;
  display: flex;
  align-items: center;
  width: 100%;
`

const Img = styled.img`
  width: 20%;
  min-width: 120px;
  height: auto;
`



export const Header = () => {

  const handleClick = () => {
    console.log('Click')
  }

  return <Container>
    <Img src={logo} alt="Ull logo" />
    <Button value="Guide" onClick={handleClick} type='square'/>
    <Button value="About" onClick={handleClick} type='square'/>
  </Container>
}
