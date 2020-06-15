import React from 'react';
import { Header } from './components/Header/Header'
import { LandingPage } from "./views/LandingPage/LandingPage";
import { Footer } from "./components/Footer/Footer";

const App = () => {
  return (
    <div>
      <Header />
      <LandingPage />
    </div>
  )
};

export default App;
