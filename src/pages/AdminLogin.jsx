import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://social-media-back-l595.onrender.com/api/admin/login",
        {
          username,
          password,
        }
      );

      console.log(response);
      // On successful login, store the token and navigate to the admin dashboard
      const { token } = response.data;
      localStorage.setItem("token", token);
      alert(`Welcome, ${username}!`);
      navigate("/admin");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Admin Login</h1>
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <br />
        <input
          type="password"
          placeholder="Enter admin password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            marginBottom: "10px",
            borderRadius: "5px",
            border: "1px solid #ddd",
          }}
        />
        <br />
        <button
          onClick={handleLogin}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
};
