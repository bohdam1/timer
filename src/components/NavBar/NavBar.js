import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.link}>Users</Link>
      <Link to="/saved" className={styles.link}>Saved Users</Link>
    </nav>
  );
};

export default Navbar;