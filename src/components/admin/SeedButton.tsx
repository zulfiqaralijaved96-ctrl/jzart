"use client";

import React, { useState } from "react";
import { Button, message } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { seedDatabase } from "@/app/actions/seed";

export default function SeedButton() {
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const result = await seedDatabase();
      if (result.success) {
        message.success(result.message);
      } else {
        message.error("Failed to seed data.");
      }
    } catch (error) {
      console.error(error);
      message.error("An error occurred during seeding.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      type="dashed"
      icon={<DatabaseOutlined />}
      onClick={handleSeed}
      loading={loading}
    >
      Seed Mock Data
    </Button>
  );
}
