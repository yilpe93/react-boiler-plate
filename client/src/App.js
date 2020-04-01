import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LandingPage from "./components/views/LandingPage";
import LoginPage from "./components/views/LoginPage";
import RegisterPage from "./components/views/RegisterPage";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
