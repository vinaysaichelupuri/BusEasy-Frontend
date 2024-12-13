import React from 'react';
import './App.css';
import {Login} from './components/loginPage/Login.tsx';
import { Introduction } from './components/introductionPage/Introduction.tsx';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';

function App() {
  return (
<Router>
  <Routes>
    <Route path='/' element={<Introduction/>}/>
    <Route path='/login' element={<Login/>}/>
  </Routes>
</Router>

  );
}
export default App;
