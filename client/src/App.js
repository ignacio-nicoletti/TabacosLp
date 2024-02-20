import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home";
import LoginPage from "./Pages/login/loginPage";
import { ProtectedRoute } from "./Pages/ProtectedRoute/ProtectedRoute";
import HomeAdmin from "./Pages/HomeAdmin/HomeAdmin";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/login" Component={LoginPage} />

        <Route
          path="/admin/home"
          element={
            <ProtectedRoute>
              <HomeAdmin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
