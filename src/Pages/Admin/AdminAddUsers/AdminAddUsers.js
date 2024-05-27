import React, { useEffect, useState } from "react";
import styles from "./AdminAddUsers.module.css";
import { Get, Post } from "../../../Api/Unprotected";
import { toast } from "react-toastify";

const AdminAddUsers = () => {
  const [roles, setRoles] = useState([]);

  const [r_id, setR_id] = useState();
  const [F_name, setF_name] = useState("");
  const [L_name, setL_name] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");

  useEffect(() => {
    const fetchRoles = async () => {
      const res = await Get("role/");
      console.log("res: " , res);
      setRoles(res);
    };
    fetchRoles();
  }, []);

  const saveUser = async () => {
    const body = {
      r_id,
      F_name,
      L_name,
      password,
      email,
      gender,
      age,
    };
    const url =
      r_id == 1
        ? "user/createAdmin"
        : r_id == 2
        ? "user/createCustomer"
        : r_id == 3
        ? "user/createEmployee"
        : "";
    const res = await Post(url, body);

    if (res && res.accessToken) {
      toast.success("User has been saved successfully!");
    } else {
      toast.error("There was error, please try again later!");
    }

    console.log(res);
  };

  return (
    <div className={styles.div}>
      <div className={styles.container}>
        <h2> Add users </h2>
        <select
          className={styles.select}
          value={r_id}
          onChange={(e) => setR_id(e.target.value)}
        >
          <option value="">Select Role</option>
          {roles.map((r) => (
            <option key={r.r_id} value={r.r_id}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          className={styles.input}
          type="text"
          placeholder="First Name"
          value={F_name}
          onChange={(e) => setF_name(e.target.value)}
        />
        <input
          className={styles.input}
          type="text"
          placeholder="Last Name"
          value={L_name}
          onChange={(e) => setL_name(e.target.value)}
        />
        <input
          className={styles.input}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className={styles.input}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className={styles.input}
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          className={styles.input}
          type="number"
          placeholder="Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <button
          className={styles.button}
          onClick={saveUser}
          disabled={
            r_id == "" ||
            F_name == "" ||
            L_name == "" ||
            password == "" ||
            email == "" ||
            gender == "" ||
            age == ""
          }
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AdminAddUsers;
