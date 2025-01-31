import React from "react";
import { Routes, Route } from "react-router-dom";
import UserList from "../components/UserList/UserList";
import SavedUsers from "../components/SaveUser/SaveUser";
import Navbar from "../components/NavBar/NavBar";
import styles from "./App.module.css";

const App = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/saved" element={<SavedUsers />} />
      </Routes>
    </div>
  );
};

export default App;
