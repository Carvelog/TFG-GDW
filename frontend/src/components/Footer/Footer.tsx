import React from 'react'
import styled from "@emotion/styled";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: #5C068C;
  display: flex;
  bottom: 0;
`

export const Footer = () => {
  return <Container>
    <h1>Footer</h1>
    <p>Set a link to icons8.com on all pages where you use our content. If you use it on most pages, a link in your footer is fine.</p>
  </Container>
}
