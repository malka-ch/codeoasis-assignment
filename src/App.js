import React from 'react';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { PrivateRoute } from './PrivateRoutes';
import Login from './components/Login';
import Home from './components/Home';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <Router>

    <div>

      
      <Route exact path="/" component={Login} />

      <PrivateRoute exact path="/Home" component={Home} />

    </div>

  </Router>
  );
}

export default App;
