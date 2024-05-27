import React, { useState } from 'react';
import styles from "./SignUp.module.css"; // Assuming you have a separate CSS module for SignUp
import { Link } from 'react-router-dom';
import { Post } from '../../Api/Unprotected';
import { toast } from "react-toastify";


const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState('');

  const handleSignUp = async() => {
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Gender:', gender);
    console.log('Age:', age);
    const url = "user/createCustomer";
    const body = {
      r_id: 2,
      F_name: firstName,
      L_name: lastName,
      password: password,
      email: email,
      gender: gender,
      age,
    }
    const res = await Post(url, body);

    if (res && res.accessToken) {
      toast.success("User has been saved successfully!");
    } else {
      toast.error("There was error, please try again later!");
    }


  }

  return (
    <div className={styles.ImageBackground}>
      <div className={styles.SignUpContainer}>
        <form className={styles.Form} >
          <h2>Sign Up</h2>
          <label className={styles.Label}>First Name:</label>
          <input className={styles.Input} type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
          
          <label className={styles.Label}>Last Name:</label>
          <input className={styles.Input} type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
          
          <label className={styles.Label}>Email:</label>
          <input className={styles.Input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          
          <label className={styles.Label}>Password:</label>
          <input className={styles.Input} type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          
          <label className={styles.Label}>Gender:</label>
          <select className={styles.Input} value={gender} onChange={(e) => setGender(e.target.value)} required>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          
          <label className={styles.Label}>Age:</label>
          <input className={styles.Input} type="number" value={age} onChange={(e) => setAge(e.target.value)} required />
          
          <button className={styles.Button} type="button" onClick={handleSignUp}>Sign Up</button>
          <Link className={styles.Link} to="/Login">Already have an account?</Link>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
