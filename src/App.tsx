import "./App.css";
import { HashRouter as BrowserRouter } from "react-router-dom";
import Router from "./routes/Router";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
