import React, { useState, useEffect } from 'react';
import { fetchRandomUsers } from '../API/userApi';
import UserCard from '../UserCard/UserCard';
import styles from "./UserList.module.css";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    const userData = await fetchRandomUsers(5);
    setUsers((prevUsers) => [...prevUsers, ...userData]);
    setIsLoading(false);
  };

  return (
    <div className={styles.list_container}>
      <ul className={styles.user_list}>
        {users.map((user) => (
          <UserCard
            key={user.email}
            user={{
              name: `${user.name.first} ${user.name.last}`,
              gender: user.gender,
              profileImage: user.picture.large,
              location: `${user.location.city}, ${user.location.country}`,
              email: user.email,
              latitude: user.location.coordinates.latitude,
              longitude: user.location.coordinates.longitude,
            }}
          />
        ))}
      </ul>
      <button className={styles.loadMoreButton} onClick={loadUsers} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default UserList;
