import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword'; 
import Dashboard from './pages/Dashboard'; 
import Classes from './pages/Classes';
import Eleve from './pages/Eleve'; // Import Eleve component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} /> 
        <Route path="/classes" element={<Classes />} />
        <Route path="/eleve" element={<Eleve />} /> {/* Eleve list */}
      </Routes>
    </Router>
  );
}

export default App;
