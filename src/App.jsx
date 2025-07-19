import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./loginPage";
import RegisterPage from "./RegistrationPage";
import Home from "./Home"; 


function App() {
  return (
    <Router>
      <Routes>
         <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<Home />} />
         
      </Routes>
    </Router>
  );
}

export default App;
