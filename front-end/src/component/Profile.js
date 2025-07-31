import React, { useState, useEffect } from "react";

const Profile = ({ user, setUser }) => {
  const token = localStorage.getItem("token");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!formData.name || !formData.email) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/profile/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success && data.result) {
        localStorage.setItem("user", JSON.stringify(data.result));
        setUser(data.result);
        setEditMode(false);
        alert("Profile updated successfully!");
      } else {
        alert("Profile update failed.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>👤 User Profile</h2>
        <hr></hr>
        {user ? (
          editMode ? (
            <div>
              <label>Name:
                <input name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>Email:
                <input name="email" value={formData.email} onChange={handleChange} />
              </label>
              <button onClick={handleSave}>💾 Save</button>
              <button onClick={() => setEditMode(false)}>❌ Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={() => setEditMode(true)}>✏️ Edit Profile</button>
            </div>
          )
        ) : <p>No user data found</p>}
      </div>
    </div>
  );
};

export default Profile;
