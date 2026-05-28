import React from "react";
import ContactForm from "@/components/marketing/ContactForm";

export default function ContactPage() {
  return (
    <div className="site-page min-h-screen py-32 px-6 md:px-12" style={{ backgroundColor: "var(--site-bg)" }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Side: Information */}
        <div className="flex flex-col justify-center">
          <span className="t-accent-label">Get in Touch</span>
          <h1 className="t-display mt-4 mb-6">Build Your Custom Mascot</h1>
          <p className="t-lead mb-8 leading-relaxed">
            Ready to engineer your custom physical mascot costume? Fill out our quote request form. Our master fabricators specialize in custom high-density foam carving, Vis/Vent cooling systems, and ergonomic designs built for brands, sports franchises, malls, schools, and entertainment venues.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--site-accent-soft)", border: "1px solid var(--site-border-accent)" }}
              >
                <span className="material-symbols-outlined t-accent">mail</span>
              </div>
              <div>
                <h4 className="t-subheading text-lg font-bold">Email Us</h4>
                <p className="t-body">hello@jzarts.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "var(--site-accent-soft)", border: "1px solid var(--site-border-accent)" }}
              >
                <span className="material-symbols-outlined t-accent">call</span>
              </div>
              <div>
                <h4 className="t-subheading text-lg font-bold">Call Us</h4>
                <p className="t-body">+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <ContactForm />

      </div>
    </div>
  );
}
