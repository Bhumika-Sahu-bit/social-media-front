import { useNavigate } from "react-router-dom";

export const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Welcome to Task 1</h1>
      <div style={{ marginTop: "30px" }}>
        <button
          onClick={() => navigate("/user-form")}
          style={{
            padding: "10px 20px",
            marginRight: "20px",
            backgroundColor: "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          User
        </button>
        <button
          onClick={() => navigate("/admin")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2196F3",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Admin
        </button>
      </div>
    </div>
  );
};
