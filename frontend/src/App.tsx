import React from 'react';
import { Header } from "./containers/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import { Footer } from "./containers/Footer/Footer";
import Guide from "./pages/Guide/Guide";
import ShowResult from "./components/ShowResult/ShowResult";

const App = () => {
  return (
    <Router>
      <div>
        <Header/>
        <Route exact path='/' component={Home}/>
        <Route path='/about' component={About}/>
        <Route path='/guide' component={Guide}/>
        <Footer/>
      </div>
    </Router>
  )
};

export default App;
