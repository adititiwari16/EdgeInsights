import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Login from './pages/login';
import Signup from './pages/register';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import PrivateRoute from './routes/PrivateRoute';
import YourProfile from './pages/yourprofile';


function App() {
  return (
    <Router>
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/yourprofile" element={
            <PrivateRoute>
              <Navbar />
              <YourProfile />
            </PrivateRoute>
          } />
      </Routes>
    </div>
  </Router>
  );
}

export default App;