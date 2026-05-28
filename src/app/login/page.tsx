"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { message } from "antd";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@jzarts.com");
  const [password, setPassword] = useState("admin");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        message.error("Invalid credentials.");
      } else {
        message.success("Logged in successfully!");
        router.push("/dashboard");
        router.refresh();
      }
    } catch (error) {
      message.error("An error occurred during login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="site-page min-h-screen flex flex-col justify-center items-center px-4" style={{ backgroundColor: "var(--site-bg-deep)" }}>
      <div 
        className="max-w-md w-full p-8 rounded-3xl backdrop-blur-xl"
        style={{ 
          backgroundColor: "var(--site-card)", 
          border: "1px solid var(--site-border)", 
          boxShadow: "var(--shadow-card)" 
        }}
      >
        <div className="text-center mb-8">
          <h1 className="t-heading text-3xl font-black mb-2">JZ Arts CRM</h1>
          <p className="t-lead text-sm">Sign in to manage your leads and projects.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="t-small t-muted block mb-2 font-medium">Email Address</label>
            <input
              type="email"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--site-border-strong)",
                backgroundColor: "var(--site-surface)",
                color: "var(--site-text)",
                outline: "none",
                fontSize: "var(--type-body-size)",
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="t-small t-muted block mb-2 font-medium">Password</label>
            <input
              type="password"
              required
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                borderRadius: "var(--radius-xl)",
                border: "1px solid var(--site-border-strong)",
                backgroundColor: "var(--site-surface)",
                color: "var(--site-text)",
                outline: "none",
                fontSize: "var(--type-body-size)",
              }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full btn-primary py-4 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
            style={{ fontSize: "var(--type-btn-size)", transition: "all var(--duration-base)" }}
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <div className="mt-8 p-4 rounded-2xl text-center text-xs" style={{ backgroundColor: "var(--site-accent-soft)", border: "1px solid var(--site-border-accent)" }}>
          <p className="t-accent-label font-bold mb-1">Demo Credentials</p>
          <p className="t-body text-xs">Email: <strong style={{ color: "var(--site-text)" }}>admin@jzarts.com</strong></p>
          <p className="t-body text-xs">Password: <strong style={{ color: "var(--site-text)" }}>admin</strong></p>
        </div>
      </div>
    </div>
  );
}
