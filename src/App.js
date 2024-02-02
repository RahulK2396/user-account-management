import logo from './logo.svg';
import './App.css';
import Login from './component/Login';
import Register from './component/Register';
import Account from './component/Account';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
