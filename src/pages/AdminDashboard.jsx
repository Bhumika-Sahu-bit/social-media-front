import { useEffect, useState } from "react";
import axios from "axios";

// Function to group submissions by name and handle
const groupSubmissions = (submissions) => {
  const grouped = {};

  submissions.forEach((submission) => {
    const key = `${submission.name}-${submission.handle}`;

    // Check if this user already exists in grouped submissions
    if (grouped[key]) {
      // Merge images if the same user with the same handle exists
      grouped[key].images = [
        ...new Set([...grouped[key].images, ...submission.images]),
      ];
    } else {
      grouped[key] = { ...submission };
    }
  });

  // Convert grouped object back to an array
  return Object.values(grouped);
};

export const AdminDashboard = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "https://social-media-back-l595.onrender.com/api/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const groupedSubmissions = groupSubmissions(response.data);
        setSubmissions(groupedSubmissions);
        setLoading(false);
      } catch (error) {
        alert("Error fetching submissions.", error);
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []);

  if (loading) {
    return <div>Loading submissions...</div>;
  }

  return (
    <div
      style={{
        padding: "20px",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      <h2 style={{ textAlign: "center", color: "#333" }}>Admin Dashboard</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {submissions.length === 0 ? (
          <div style={{ textAlign: "center", color: "#888" }}>
            No submissions yet
          </div>
        ) : (
          submissions.map((submission, index) => (
            <div
              key={index}
              style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #ddd",
              }}
            >
              <div
                style={{ display: "flex", alignItems: "center", gap: "15px" }}
              >
                <div style={{ flex: 1 }}>
                  <p>
                    <strong>Name:</strong> {submission.name}
                  </p>
                  <p>
                    <strong>Handle:</strong> {submission.handle}
                  </p>
                </div>
                <div>
                  {submission.images.length > 0 && (
                    <div>
                      <strong>Images:</strong>
                      <div
                        style={{
                          display: "flex",
                          gap: "10px",
                          marginTop: "10px",
                        }}
                      >
                        {submission.images.map((img, i) => (
                          <img
                            key={i}
                            src={img}
                            alt="uploaded"
                            width={120}
                            height={80}
                            style={{
                              objectFit: "cover",
                              borderRadius: "5px",
                              cursor: "pointer",
                              transition: "transform 0.3s",
                            }}
                            onClick={() => window.open(img, "_blank")}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
