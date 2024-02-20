import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/login/loginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={LoginPage} />
      </Routes>
    </>
  );
}

export default App;
