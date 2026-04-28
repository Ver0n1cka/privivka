import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Navbar from './components/Navbar/Navbar';
import Main from './components/Main/Main';
import Calculate from './components/Сalculate/Calculate';
import Answers from './components/Answers/Answers';
import ArticlId from './components/ArticlId/ArticlId';
import Articles from './components/Articles/Articles';
import Vactine from './components/Vactine/Vactine';
import ScrollToTop from './components/utils/scroll';
import Footer from './components/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Router>
        <ScrollToTop />
        <Navbar/>
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/calculate" element={<Calculate/>}/>
          <Route path="/ansvers" element={<Answers/>}/>
          <Route path="/articles" element={<Articles/>}/>
          <Route path="/articles/:id" element={<ArticlId/>}/>
          <Route path="/vactina/:id" element={<Vactine/>}/>
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
