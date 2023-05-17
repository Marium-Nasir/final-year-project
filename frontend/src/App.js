import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import RegistrationPage from './Pages/RegistrationPage';

import "./App.css";
import Otp from './Pages/Otp';
import ResetPassPage from './Pages/ResetPassPage';
import DriverUi from './Pages/DriverUi';
import StudentUi from './Pages/StudentUi';


const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<RegistrationPage />} />
          <Route exact path="/otp" element={<Otp />} />
          <Route
            exact
            path="/resetyourpass/:id/:token"
            element={<ResetPassPage />}
          />
          <Route
            exact
            path="/driverprofile"
            element={<DriverUi />}
          />
          <Route
            exact
            path="/studentprofile"
            element={<StudentUi />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App

