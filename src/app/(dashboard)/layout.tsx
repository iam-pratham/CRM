"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useGameStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted && !user.name) {
      router.push('/login');
    }
  }, [isMounted, user.name, router]);

  if (!isMounted) {
    return null;
  }

  if (!user.name) {
    return null;
  }

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden selection:bg-white/20">
      {/* Subtle Background Texture - Professional & Minimal */}
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-zinc-900 via-background to-background pointer-events-none opacity-40" />
      
      <div className="p-4 h-full hidden md:block z-10 relative">
         <Sidebar />
      </div>
      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth z-10">
        <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
