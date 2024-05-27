import React, { useState } from "react";
import styles from "./Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import { Post } from "../../Api/Unprotected";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await Post("user/login", { email, password });
      if (res.accessToken && res.full_name && res.r_id) {
        localStorage.setItem("token", res.accessToken);
        localStorage.setItem("full_name", res.full_name);
        localStorage.setItem("r_id", res.r_id);
        if (res.r_id == 1) {
          window.location.href = "AdminAddUsers"
        }
        if (res.r_id == 2) {
          window.location.href = "ChatRoom"
        }
        if (res.r_id == 3) {
          window.location.href = "EmployeeMatch"
        }
      } else {
        console.log("eee: ", res);
        setError(
          (res.response && res.response.data && res.response.data.error) ||
            res.error
        );
      }
    } catch (error) {
      console.log("error: ", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong");
      }
    }
  };

  return (
    <div className={styles.ImageBackground}>
      <div className={styles.LoginContainer}>
        <form className={styles.Form} onSubmit={handleLogin}>
          <h2>Welcome</h2>
          <label className={styles.Label}>Email:</label>
          <input
            className={styles.Input}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label className={styles.Label}>Password:</label>
          <input
            className={styles.Input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className={styles.Button} type="submit">
            Login
          </button>
          <Link className={styles.Link} to="/SignUp">
            Don't have an account?
          </Link>
          {error && <p className={styles.Error}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
