import React from 'react';
import { Header } from './components/Header/Header'
import { LandingPage } from "./views/LandingPage/LandingPage";
import { Footer } from "./components/Footer/Footer";
import styled from "@emotion/styled";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const App = () => {
  return (
    <Container>
      <Header />
      <LandingPage />
      <Footer />
    </Container>
  )
};

export default App;
