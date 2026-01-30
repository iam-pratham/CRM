"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";
import { Sidebar } from "@/components/layout/sidebar";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Logo } from "@/components/ui/logo";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user } = useGameStore();
  const [isMounted, setIsMounted] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
      
      {/* Desktop Sidebar */}
      <div className="p-4 h-full hidden md:block z-10 relative">
         <Sidebar />
      </div>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-xl border-b border-white/5 z-50 px-4 flex items-center justify-between">
        <Logo className="scale-75 origin-left" />
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-zinc-400 hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-3/4 max-w-xs bg-zinc-950 border-r border-white/10 z-50 md:hidden p-4"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Navigation</span>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <Sidebar />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative scroll-smooth z-10 pt-20 md:pt-8">
        <div className="mx-auto max-w-7xl animate-in fade-in zoom-in duration-500">
          {children}
        </div>
      </main>
    </div>
  );
}
