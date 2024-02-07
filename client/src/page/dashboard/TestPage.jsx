import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const UserProfile = () => {
  const { user, loading, error } = useContext(AuthContext);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!user) {
    // User is not signed in
    return <p>Please sign in to view your profile.</p>;
  }

  const { displayName, email, additionalData } = user;
  console.log("ddd",additionalData);
  return (
    <div>
      <h2>Welcome, {displayName}!</h2>
      <p>Email: {email}</p>

      {/* Display additional user data */}
      {additionalData && (
  <div>
    <p>Age: {additionalData.age}</p>
    <p>Address: {additionalData.address}</p>
    {/* Add other fields as needed */}
  </div>
)}

    </div>
  );
};

export default UserProfile;
