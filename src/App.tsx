import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Router from "./routes/Router";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
