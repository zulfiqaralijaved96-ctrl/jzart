"use client";

import React, { useEffect, useState } from "react";

const STORAGE_KEY = "jzarts-theme";
type Theme = "dark" | "light";

export default function ThemeToggle() {
  // Always start with "dark" to match SSR default.
  // useEffect will sync to the real current theme after mount.
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    // Read the actual data-theme attribute (set by no-flash script or HTML default)
    const current = (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    // 1. Update the DOM immediately — all CSS vars cascade from here
    document.documentElement.setAttribute("data-theme", next);
    // 2. Persist preference
    localStorage.setItem(STORAGE_KEY, next);
    // 3. Update local state for icon swap
    setTheme(next);
  }

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "2.5rem",
        height: "2.5rem",
        borderRadius: "9999px",
        border: "1px solid var(--site-border-strong)",
        background: "var(--site-surface)",
        color: "var(--site-text-muted)",
        cursor: "pointer",
        flexShrink: 0,
        transition: "transform 150ms ease, background 250ms ease, border-color 250ms ease",
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.transform = "scale(1.1)";
        btn.style.color = "var(--site-accent-text)";
        btn.style.borderColor = "var(--site-border-accent)";
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget as HTMLButtonElement;
        btn.style.transform = "scale(1)";
        btn.style.color = "var(--site-text-muted)";
        btn.style.borderColor = "var(--site-border-strong)";
      }}
    >
      <span
        className="material-symbols-outlined"
        style={{ fontSize: "1.25rem", lineHeight: 1 }}
        aria-hidden="true"
      >
        {isDark ? "light_mode" : "dark_mode"}
      </span>
    </button>
  );
}
