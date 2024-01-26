import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from './components/Loginpage';
import Homepage from './components/Homepage';

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Loginpage />} />
        <Route path="/login" element={<Loginpage />} />
        <Route path="/home" element={<Homepage />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  );
}

export default App;
