import React from 'react';
import './App.css'
import {Route, Routes} from "react-router-dom";
import Home from "./app/pages/Home";
import Latest from "./app/pages/Latest";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/latest" element={<Latest />}/>
      </Routes>
    </>
  );
}

export default App;
