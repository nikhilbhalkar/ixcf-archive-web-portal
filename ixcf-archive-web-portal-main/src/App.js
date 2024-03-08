import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Loginpage";


function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect from root URL to /login */}
        

        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="*" element={<div>Hello You are Hacked</div>} />


      </Routes>
    </Router>
  );
}

export default App;