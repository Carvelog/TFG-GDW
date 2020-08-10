import React from 'react'
import styled from "@emotion/styled";

const Container = styled.div`
  width: auto;
  height: auto;
  background: #5C068C;
  display: flex;
  flex-direction: column;
  bottom: 0;
  padding-left: 30px;
`

const P = styled.p`
  color: #FFFFFF;
  font-size: 25px;
  margin-bottom: 0;
`

const A = styled.a`
  color: #FFFFFF;
  font-size: 25px;
`

const Ul = styled.ul`
  color: #FFFFFF;
  font-size: 25px;
`

export const Footer = () => {
  return <Container>
    <P>Some icons get from:</P>
    <Ul>
      <li><A href="https://icons8.com/" target="_blank">icons8.com</A></li>
    </Ul>
  </Container>
}
