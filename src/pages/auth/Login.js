import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { setUser } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user); // save uid
      nav("/");
    } catch (err) {
      alert("Invalid email or password");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2>Welcome back 👋</h2>
        <form onSubmit={submit}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
          <button className="auth-btn" type="submit">
            Log in
          </button>
        </form>
        <p className="auth-link">
          New user? <Link to="/signup">Create account</Link>
        </p>
      </div>
    </div>
  );
}
