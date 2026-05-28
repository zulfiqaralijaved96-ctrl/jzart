"use client";

import { useTransition } from "react";
import { seedHomePageContent } from "@/app/actions/seed-content";
import { useRouter } from "next/navigation";

export function SeedContentButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSeed = () => {
    if (confirm("Are you sure you want to seed the CMS with the default Stitch UI content? This will not override existing content if it exists, just fill in the blanks.")) {
      startTransition(async () => {
        const res = await seedHomePageContent();
        if (res.success) {
          alert("Default content seeded successfully!");
          router.refresh();
        } else {
          alert("Failed to seed content: " + res.error);
        }
      });
    }
  };

  return (
    <button
      onClick={handleSeed}
      disabled={isPending}
      className={`px-4 py-2 text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
        isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {isPending ? "Seeding..." : "Seed Default Data"}
    </button>
  );
}
