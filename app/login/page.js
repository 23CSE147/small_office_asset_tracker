'use client';

import './LoginPage.css';
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.ok) {
      router.push("/assets");
    } else {
      alert("Invalid credentials");
    }
  };


  return (
    <div className="login-page-bg">
      <div className="login-container">
        <div className="login-logo-row">
          <img src="/favicon.ico" alt="AssetTracker Logo" className="login-logo" />
          <span className="login-brand">AssetTracker Pro</span>
        </div>
        <h2 className="login-title">Admin Login</h2>
        <p className="login-desc">
          Admin access only.<br />
          Please enter your Email and password to manage office assets.
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoFocus
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
        <div className="login-footer">
          <span>Forgot your password? </span>
          <a href="mailto:admin@example.com" className="login-link">Contact support</a>
        </div>
      </div>
    </div>
  );
}
