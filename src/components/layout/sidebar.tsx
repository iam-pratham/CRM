"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Trophy,
  BarChart2,
  Calendar,
  Settings,
  LogOut,
  Hexagon,
  Layers,
  Zap,
  Folder
} from "lucide-react";
import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import { Logo } from "@/components/ui/logo";

const navigation = [{ name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Projects", href: "/projects", icon: Folder },
  { name: "Tasks", href: "/tasks", icon: Layers },
  { name: "Schedule", href: "/calendar", icon: Calendar },
  { name: "Daily Standup", href: "/check-in", icon: Zap },
  { name: "Team Performance", href: "/leaderboard", icon: Trophy },
  { name: "Rewards", href: "/rewards", icon: Hexagon },
  { name: "Analytics", href: "/analytics", icon: BarChart2 },
];

export function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useGameStore();
  const router = useRouter(); // Use useRouter from next/navigation

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const nextLevelPoints = (user.level + 1) * 1000;
  const progress = (user.points / nextLevelPoints) * 100;

  return (
    <motion.div 
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="flex h-full w-64 flex-col glass-dock overflow-hidden relative"
    >
      {/* Header */}
      <div className="flex h-20 items-center px-6 relative z-10 border-b border-white/5">
        <Logo />
      </div>
      
      {/* Nav */}
      <div className="flex flex-1 flex-col gap-y-6 px-4 py-4 relative z-10">
        <nav className="flex flex-col gap-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="relative group"
              >
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute inset-0 rounded-lg bg-zinc-800/50 border border-white/5"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <div className={cn(
                  "relative flex items-center gap-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors duration-200",
                  isActive ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                )}>
                  <item.icon
                    className={cn(
                      "h-4 w-4 shrink-0 transition-all duration-300",
                      isActive ? "text-white" : "text-zinc-600 group-hover:text-zinc-400"
                    )}
                  />
                  {item.name}
                </div>
              </Link>
            );
          })}
        </nav>
        
        {/* User Profile Widget */}
        <div className="mt-auto">
          <div className="rounded-xl bg-zinc-900/50 border border-white/5 p-4 relative overflow-hidden group hover:border-white/10 transition-colors">
            
            <div className="flex items-center gap-3 mb-4 relative z-10">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center text-sm font-bold ring-2 ring-black">
                  {user.name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-white ring-2 ring-black flex items-center justify-center">
                  <Zap className="w-2 h-2 text-black fill-current" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-white truncate">{user.name}</p>
                <p className="text-[10px] text-zinc-400 font-medium tracking-wide uppercase">Lvl {user.level} Associate</p>
              </div>
            </div>
            
            <div className="space-y-2 relative z-10">
              <div className="flex justify-between text-[10px] uppercase tracking-wider text-zinc-500 font-bold">
                <span>KPI Progress</span>
                <span className="text-zinc-300">{Math.floor(progress)}%</span>
              </div>
              <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden shadow-inner">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(progress, 100)}%` }}
                  className="h-full bg-white" 
                />
              </div>
            </div>

            <div className="mt-4 flex gap-2 relative z-10 opacity-60 group-hover:opacity-100 transition-opacity">
               <Link href="/settings" className="flex-1 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 p-2 text-zinc-400 hover:text-white transition-colors">
                 <Settings className="h-4 w-4" />
               </Link>
               <button 
                 onClick={handleLogout}
                 className="flex-1 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 p-2 text-zinc-400 hover:text-white transition-colors"
               >
                 <LogOut className="h-4 w-4" />
               </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
