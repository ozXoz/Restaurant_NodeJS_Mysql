import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes, Link, Outlet } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import Logout from './components/Logout';
import About from './components/About';
import ViewEmployeesPage from './components/EmployeeManagement/ViewEmployees';
import AddEmployeePage from './components/EmployeeManagement/AddEmployee';
import UpdateEmployee from './components//EmployeeManagement/UpdateEmployee';
import References from './components/References';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setLoggedIn(false);
  };

  const handleSignupSuccess = () => {
    setLoggedIn(false);
  };

  return (
    <Router>
      <div className="App">
        <header className="App-header">
          {!loggedIn ? (
            <>
              <nav>
                <ul>
                  <li > 
                    <Link to="/login">Login</Link>
                  </li>
                  <li>
                    <Link to="/signup">Sign Up</Link>
                  </li>
                  
                </ul>
              </nav>
              <Routes>
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignupPage onSuccess={handleSignupSuccess} />} />
                <Route path="*" element={<Navigate to="/login" />} />

              </Routes>
            </>
          ) : (
            <>
              <nav>
                <ul>
                  <li>
                    <Link to="/employees/view">Employees</Link>
                  </li>
                  <li>
                    <Link to="/employees/add">Add Emp</Link>
                  </li>
                  <li>
                    <Link to="/about">About</Link>
                  </li>
                  <li>
                    <Link to="/ref">Refereces</Link>
                  </li>

                 

                </ul> 
              </nav>

              {/* <div>
              
</div> */}
              <Routes>
              <Route path="/update/:id" element={<UpdateEmployee />} />
                <Route path="/employees/view" element={<ViewEmployeesPage />} />
                <Route path="/employees/add" element={<AddEmployeePage />} />
                <Route path="/about" element={<About />} />
                <Route path="/ref" element={<References />} />




              </Routes>
              <Logout onLogout={handleLogout} />
            </>
          )}
        </header>
      </div>
    </Router>
  );
}

export default App;
