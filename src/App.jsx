/* eslint-disable react/prop-types */
import { Routes, Route, Navigate } from "react-router-dom";
import { Welcome } from "./pages/Welcome";
import { UserForm } from "./pages/UserForm";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/AdminDashboard";

// eslint-disable-next-line no-unused-vars
const PrivateRoute = ({ element, ...rest }) => {
  const isAdminLoggedIn = !!localStorage.getItem("token");

  return isAdminLoggedIn ? element : <Navigate to="/login" replace />;
};

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/user-form" element={<UserForm />} />

        {/* Protected Admin Dashboard route */}
        <Route
          path="/admin"
          element={<PrivateRoute element={<AdminDashboard />} />}
        />

        {/* Route for Admin Login */}
        <Route path="/login" element={<AdminLogin />} />
      </Routes>
    </div>
  );
}
