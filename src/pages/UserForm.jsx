import { useState } from "react";
import axios from "axios";

export const UserForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    handle: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, images: Array.from(e.target.files) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObj = new FormData();
    formDataObj.append("name", formData.name);
    formDataObj.append("handle", formData.handle);
    formData.images.forEach((image) => formDataObj.append("images", image));

    try {
      const response = await axios.post(
        "https://social-media-back-l595.onrender.com/api/users",
        formDataObj
      );
      alert("Data submitted successfully!", response.data);
    } catch (error) {
      alert("Error submitting data.", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: "20px" }}>
      <h2>User Submission Form</h2>
      <div>
        <label>Name:</label>
        <input type="text" name="name" onChange={handleChange} required />
      </div>
      <div>
        <label>Social Media Handle:</label>
        <input type="text" name="handle" onChange={handleChange} required />
      </div>
      <div>
        <label>Upload Images:</label>
        <input type="file" multiple onChange={handleFileChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};
