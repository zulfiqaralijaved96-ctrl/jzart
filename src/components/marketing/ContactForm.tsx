"use client";

import React, { useState } from "react";
import { submitContactForm } from "@/app/actions/contact";
import { message } from "antd";

export default function ContactForm() {
  const [loading, setLoading] = useState(false);

  async function actionHandler(formData: FormData) {
    setLoading(true);
    const result = await submitContactForm(formData);
    setLoading(false);
    if (result.success) {
      message.success("Thank you! Your inquiry has been sent to our team.");
    } else {
      message.error(result.error || "Failed to send message.");
    }
  }

  // All visual values pulled entirely from tokens.css
  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem 1rem",
    borderRadius: "var(--radius-xl)",
    border: "1px solid var(--site-border-strong)",
    backgroundColor: "var(--site-surface)",
    color: "var(--site-text)",
    outline: "none",
    fontFamily: "var(--site-body-font)",
    fontSize: "var(--type-body-size)",
    lineHeight: "var(--leading-normal)",
    transition: "border-color var(--duration-base), box-shadow var(--duration-base)",
  };

  function onFocus(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "var(--site-accent)";
    e.target.style.boxShadow = "0 0 0 3px var(--site-accent-soft)";
  }

  function onBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    e.target.style.borderColor = "var(--site-border-strong)";
    e.target.style.boxShadow = "none";
  }

  return (
    <div
      className="p-8 md:p-12 rounded-3xl"
      style={{
        backgroundColor: "var(--site-card)",
        border: "1px solid var(--site-border)",
        boxShadow: "var(--shadow-card)",
      }}
    >
      <form action={actionHandler} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="t-small t-muted block mb-2">First Name</label>
            <input name="firstName" required type="text" style={inputStyle} placeholder="John" onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div>
            <label className="t-small t-muted block mb-2">Last Name</label>
            <input name="lastName" required type="text" style={inputStyle} placeholder="Doe" onFocus={onFocus} onBlur={onBlur} />
          </div>
        </div>

        <div>
          <label className="t-small t-muted block mb-2">Email Address</label>
          <input name="email" required type="email" style={inputStyle} placeholder="john@example.com" onFocus={onFocus} onBlur={onBlur} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="t-small t-muted block mb-2">Company / Organization</label>
            <input name="company" type="text" style={inputStyle} placeholder="Your Team Name" onFocus={onFocus} onBlur={onBlur} />
          </div>
          <div>
            <label className="t-small t-muted block mb-2">Estimated Budget</label>
            <select name="budget" style={inputStyle} onFocus={onFocus} onBlur={onBlur}>
              <option>$2,000 – $4,000</option>
              <option>$4,000 – $7,000</option>
              <option>$7,000 – $10,000+</option>
              <option>Not Sure</option>
            </select>
          </div>
        </div>

        <div>
          <label className="t-small t-muted block mb-2">Project Details</label>
          <textarea
            name="notes"
            rows={4}
            style={{ ...inputStyle, resize: "none" }}
            placeholder="Tell us about your mascot idea…"
            onFocus={onFocus}
            onBlur={onBlur}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-4 rounded-xl disabled:opacity-70 disabled:cursor-not-allowed"
          style={{ fontSize: "var(--type-lead-size)" }}
        >
          {loading ? "Sending…" : "Submit Request"}
        </button>
      </form>
    </div>
  );
}
