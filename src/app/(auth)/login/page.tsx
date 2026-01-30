"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Lock, Mail, Shield, User, ChevronRight, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGameStore } from "@/store/gameStore";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<'admin' | 'employee'>('employee');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const router = useRouter();
  const { login } = useGameStore();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const namePart = email.split('@')[0];
    const formattedName = namePart
      .split('.')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    setTimeout(() => {
      login(formattedName || "User", role);
      setIsLoading(false);
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-zinc-950 relative overflow-hidden selection:bg-emerald-500/30 font-sans">
      
      {/* Cinematic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(16,185,129,0.03),transparent_70%)]" />
        <div 
          className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03] mix-blend-overlay"
        />
        {/* Animated Orbs */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md relative z-10 px-6"
      >
        {/* Glass Card */}
        <div className="relative group rounded-3xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 p-8 md:p-10 shadow-2xl overflow-hidden">
            
            {/* Spotlight Effect */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.06), transparent 40%)`
              }}
            />

            <div className="relative z-10 flex flex-col items-center text-center mb-10">
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h1>
                <p className="text-zinc-500 text-sm">Enter your credentials to access the workspace.</p>
              </div>
            </div>

            <form onSubmit={handleLogin} className="space-y-6 relative z-10">
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative group/input">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-white transition-colors" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      className="w-full bg-black/20 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest ml-1">Password</label>
                  <div className="relative group/input">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within/input:text-white transition-colors" />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-black/20 border border-white/5 rounded-xl py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/50 focus:bg-zinc-900/50 focus:ring-1 focus:ring-emerald-500/20 transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="p-1 bg-black/20 border border-white/5 rounded-xl grid grid-cols-2 gap-1">
                <button
                  type="button"
                  onClick={() => setRole('employee')}
                  className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 ${role === 'employee' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
                >
                  <User className="w-3.5 h-3.5" />
                  Employee
                </button>
                <button
                  type="button"
                  onClick={() => setRole('admin')}
                  className={`flex items-center justify-center gap-2 py-2.5 text-xs font-bold rounded-lg transition-all duration-300 ${role === 'admin' ? 'bg-zinc-800 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5'}`}
                >
                  <Shield className="w-3.5 h-3.5" />
                  Admin
                </button>
              </div>

              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer group/checkbox">
                  <div className="relative">
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-4 h-4 rounded border border-zinc-700 bg-zinc-900/50 peer-checked:bg-emerald-500 peer-checked:border-emerald-500 transition-all flex items-center justify-center">
                      <Check className="w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity" />
                    </div>
                  </div>
                  <span className="text-xs text-zinc-500 group-hover/checkbox:text-zinc-400 transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-xs text-zinc-500 hover:text-emerald-400 transition-colors font-medium">Forgot password?</a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-white text-black font-bold text-sm rounded-xl hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 group relative overflow-hidden shadow-lg shadow-white/5"
              >
                {isLoading ? (
                  <div className="h-4 w-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="relative z-10">Sign In</span>
                    <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
        </div>

        <div className="mt-8 text-center">
           <p className="text-[10px] text-zinc-600 font-medium tracking-wider uppercase opacity-50 hover:opacity-100 transition-opacity cursor-default">
             Indigen CRM v2.0
           </p>
        </div>
      </motion.div>
    </div>
  );
}
