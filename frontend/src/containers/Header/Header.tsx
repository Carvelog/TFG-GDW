import React from 'react'
import styled from "@emotion/styled";
import { useHistory, useLocation } from 'react-router-dom'
import Button from "../../components/Buttons/Button";
import logo from "../../assets/ULL_logo.svg"

const Container = styled.div`
  max-height: 80px;
  min-height: 50px;
  background: #5C068C;
  display: flex;
  align-items: center;
  width: 100%;
`

const Img = styled.img`
  width: 15%;
  min-width: 150px;
`

export const Header = () => {
  const currentLocation = useLocation()
  const history = useHistory();

  const toGuide = () => {
    if (currentLocation.pathname !== '/guide')
      history.push('/guide')
  }

  const toAbout = () => {
    if (currentLocation.pathname !== '/about')
      history.push('/about')
  }

  const toHome = () => {
    if (currentLocation.pathname !== '/')
      history.push('/')
  }

  return <Container>
    <Img src={logo} alt="Ull logo" onClick={toHome}/>
    <Button value="Guide" onClick={toGuide} type='square'/>
    <Button value="About" onClick={toAbout} type='square'/>
    {currentLocation.pathname !== '/'?
      <Button value="Upload" onClick={toHome} type='square'/>
      :
      <div/>
    }
  </Container>
}
