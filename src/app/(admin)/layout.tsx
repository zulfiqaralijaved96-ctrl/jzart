import React from "react";
import SignOutButton from "@/components/admin/SignOutButton";
import AdminLayoutWrapper from "@/components/admin/AdminLayoutWrapper";
import { ConfigProvider } from "antd";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2563eb", // corporate royal blue
          borderRadius: 12, // modern curved inputs, tables, and buttons
          fontFamily: "var(--font-inter), sans-serif",
          colorBgContainer: "#ffffff",
          colorBorder: "#e2e8f0", // slate-200 border color
        },
        components: {
          Table: {
            headerBg: "#f8fafc", // slate-50 header background
            headerColor: "#475569", // slate-600 text
            headerBorderRadius: 12,
            rowHoverBg: "#f1f5f9", // slate-100 hover transition
          },
          Button: {
            fontFamily: "var(--font-inter), sans-serif",
            fontWeight: 600,
          },
          Modal: {
            borderRadiusLG: 16,
          },
          Drawer: {
            borderRadiusLG: 16,
          }
        }
      }}
    >
      <AdminLayoutWrapper signOutButton={<SignOutButton />}>
        {children}
      </AdminLayoutWrapper>
    </ConfigProvider>
  );
}
