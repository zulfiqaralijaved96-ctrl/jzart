import React from "react";
import { auth, signOut } from "@/lib/auth";
import { LogOut } from "lucide-react";

export default async function SignOutButton() {
  const session = await auth();
  if (!session) return null;

  return (
    <div className="mt-auto pt-8 border-t border-slate-800">
      <div className="text-sm text-slate-400 mb-4 px-2 truncate">
        {session.user?.email}
      </div>
      <form action={async () => {
        "use server";
        await signOut({ redirectTo: "/login" });
      }}>
        <button type="submit" className="w-full flex items-center gap-3 px-2 py-2 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors text-left">
          <LogOut size={18} />
          <span>Sign Out</span>
        </button>
      </form>
    </div>
  );
}
