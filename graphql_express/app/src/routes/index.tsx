import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./protected-routes";
import Login from "../components/auth";
import Register from "../components/register";
import Task from "../components/task";

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Task />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute>aaaa</ProtectedRoute>}
      />
    </Routes>
  </Router>
);

export default AppRoutes;
