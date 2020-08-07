import React from "react";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/core";

const spin = keyframes`
 0% {
    transform: rotateZ(0deg) translate3d(0, 0, 0);
}
  100% {
    transform: rotateZ(720deg) translate3d(0, 0, 0);
}
`

const Load = styled.div`
  position: relative;
  top: 0;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #5C068C;
  transform-origin: 5px 15px;
  animation: ${spin} 2s infinite linear;

  &::before, &::after {
    content: '';
    display: inline-block;
    position: absolute;
  }

  &::after {
    left: 10px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #5C068C;
  }

  &::before {
    left: -10px;
    top: 15px;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: #5C068C;
  }
`

const Container = styled.div`
  display: flex;
`

const H2 = styled.h2`
  margin: 0 20px 0 0;
`

const Loader = () => {
  return <Container>
    <H2>Processing</H2>
    <Load/>
  </Container>
}

export default Loader
