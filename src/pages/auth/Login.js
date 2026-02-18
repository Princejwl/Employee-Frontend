import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { setUser } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import Toast from "../../components/Toast";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [toast, setToast] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { email, password } = form;
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      setUser(cred.user);
      setToast({ message: "Login successful! Redirecting...", type: "success" });
      setTimeout(() => nav("/"), 1200);
    } catch (err) {
      setToast({ message: "Invalid email or password", type: "error" });
    }
  };

  return (
    <div className="auth-page">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

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
