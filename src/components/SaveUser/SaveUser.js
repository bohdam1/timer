import React, { useState, useEffect } from "react";
import UserCard from "../UserCard/UserCard";
import styles from "./SaveUser.module.css";

const SavedUsers = () => {
  const [savedUsers, setSavedUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("savedUsers")) || [];
    setSavedUsers(storedUsers);
  }, []);

  return (
    <div>
      <ul className={styles.user_list}>
        {savedUsers.length > 0 ? (
          savedUsers.map((user) => (
            <UserCard
              key={user.email}
              user={user}
              isSaved={true} 
            />
          ))
        ) : (
          <p>No saved users yet.</p>
        )}
      </ul>
    </div>
  );
};

export default SavedUsers;
