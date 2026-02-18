import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { setUser } from "../../utils/auth";
import { useNavigate, Link } from "react-router-dom";
import "./Auth.css";
import Toast from "../../components/Toast";

export default function Signup() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [toast, setToast] = useState(null);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const { name, email, password } = form;

    try {
      const cred = await createUserWithEmailAndPassword(auth, email.trim(), password);
      if (name) await updateProfile(cred.user, { displayName: name });
      setUser(cred.user);
      setToast({ message: "Account created successfully!", type: "success" });
      setTimeout(() => nav("/"), 1500);
    } catch (err) {
      console.error("Signup Error:", err.message);
      if (err.code === "auth/email-already-in-use") {
        setToast({ message: "This email is already registered. Please log in.", type: "warning" });
      } else if (err.code === "auth/invalid-email") {
        setToast({ message: "Invalid email format.", type: "error" });
      } else if (err.code === "auth/weak-password") {
        setToast({ message: "Password must be at least 6 characters.", type: "warning" });
      } else {
        setToast({ message: "Failed to create account. Please try again.", type: "error" });
      }
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
        <h2>Create Account 📝</h2>
        <form onSubmit={submit}>
          <input
            className="auth-input"
            placeholder="Full Name"
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
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
            Sign Up
          </button>
        </form>
        <p className="auth-link">
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}
