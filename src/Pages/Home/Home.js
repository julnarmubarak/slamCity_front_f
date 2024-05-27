import { useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();
  const [full_name, setFullName] = useState(null);

  useEffect(() => {
    const name = localStorage.getItem("full_name");
    if (name) setFullName(name);
  }, []);

  const handleClick = () => {
    navigate("/Login");
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Syrian Basketball League</h1>
      <div className={styles.message}>
        {full_name ? (
          <p>Welcome back, {full_name}!</p>
        ) : (
          <button className={styles.button} onClick={handleClick}>
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
