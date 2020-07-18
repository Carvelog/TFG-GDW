import React from 'react'
import styled from "@emotion/styled";
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

const Button = styled.button`
  content: "New text";
  text-indent: 0;
  width: 120px;
  min-width: 100px;
  height: 60px;
  font-size: 25px;
  color: white;
  font-family: Arial, serif;
  border-radius: 6px;
  background: transparent;
  border: 2px solid white;
  cursor: pointer;
  outline: none;
  margin: 5px;
  margin-left: 20px;

  &:hover {
    background: #3B0458;
    border: 2px solid #ECECEC;
    color: #ECECEC;
  }
  &:active {
    border: 3px solid #ECECEC;
  }
`

export const Header = () => {
  return <Container>
    <Img src={logo} alt="Ull logo" />
    <Button>Guide</Button>
    <Button>About</Button>
  </Container>
}
