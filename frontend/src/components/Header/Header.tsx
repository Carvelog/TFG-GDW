import React from 'react'
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: 100px;
  background: #5C068C;
  display: flex;
`

export const Header = () => {
  return <Container>
    <h1>ULL LOGO</h1>
  </Container>
}
