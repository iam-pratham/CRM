"use client";

import { useState } from "react";
import { useGameStore } from "@/store/gameStore";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Zap, Target, CheckCircle, Activity, Battery, BatteryMedium, BatteryLow } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

export default function CheckInPage() {
  const router = useRouter();
  const { addPoints, incrementStreak, user } = useGameStore();
  const [step, setStep] = useState(1);
  const [mood, setMood] = useState("");
  const [focus, setFocus] = useState("");

  const handleComplete = () => {
    // Award points for checking in
    addPoints(50);
    incrementStreak();
    router.push("/tasks");
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex h-full items-center justify-center p-6 relative">
      
      <div className="w-full max-w-2xl space-y-8 relative z-10">
        <div className="text-center space-y-2">
          <motion.div 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800/50 border border-white/10 text-zinc-100 text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Activity className="w-3 h-3" />
            Daily Standup
          </motion.div>
          <motion.h1 
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.1 }}
             className="text-5xl font-black tracking-tighter text-white"
          >
            DAILY <span className="text-zinc-500">CHECK-IN</span>
          </motion.h1>
          <motion.p 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ delay: 0.2 }}
             className="text-zinc-400 font-medium"
          >
            Good morning, Associate {user.name}. Let&apos;s prepare for the day.
          </motion.p>
        </div>

        <TiltCard className="bg-zinc-900 border-white/10 overflow-hidden relative min-h-[400px] flex flex-col">
          {/* Progress Bar */}
          <div className="absolute top-0 left-0 h-1 bg-white/5 w-full z-20">
            <motion.div 
              className="h-full bg-white"
              initial={{ width: "0%" }}
              animate={{ width: step === 1 ? "33%" : step === 2 ? "66%" : "100%" }}
            />
          </div>

          <div className="p-8 md:p-12 flex-1 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3 mb-2">
                      <Zap className="text-white w-6 h-6" />
                      Status Check
                    </h2>
                    <p className="text-zinc-400 text-sm">Select your current status.</p>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { label: "Optimal", value: "High", icon: Battery },
                      { label: "Nominal", value: "Medium", icon: BatteryMedium },
                      { label: "Critical", value: "Low", icon: BatteryLow },
                    ].map((item) => (
                      <button
                        key={item.label}
                        onClick={() => setMood(item.value)}
                        className={`flex flex-col items-center gap-4 p-6 rounded-2xl border transition-all duration-300 group ${mood === item.value ? `border-white bg-zinc-800` : "border-white/5 bg-zinc-900 hover:bg-zinc-800"}`}
                      >
                        <div className={`p-4 rounded-full transition-transform ${mood === item.value ? 'bg-white text-black scale-110' : 'bg-zinc-800 text-zinc-400 group-hover:text-white'}`}>
                           <item.icon className="h-8 w-8" />
                        </div>
                        <span className={`font-bold text-sm uppercase tracking-wider ${mood === item.value ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>{item.label}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-end pt-4">
                    <button
                      onClick={() => setStep(2)}
                      disabled={!mood}
                      className="group flex items-center gap-2 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    >
                      Proceed <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-8"
                >
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-white flex items-center justify-center gap-3 mb-2">
                      <Target className="text-white w-6 h-6" />
                      Goal Setting
                    </h2>
                    <p className="text-zinc-400 text-sm">Define your primary objective for today.</p>
                  </div>
                  
                  <div className="relative group">
                    <textarea
                      placeholder="Today, I will achieve..."
                      className="relative w-full h-40 bg-zinc-950/50 border border-white/10 rounded-xl p-6 text-xl text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 resize-none transition-colors"
                      value={focus}
                      onChange={(e) => setFocus(e.target.value)}
                      autoFocus
                    />
                  </div>

                  <div className="flex justify-between pt-4">
                    <button
                      onClick={() => setStep(1)}
                      className="text-zinc-500 hover:text-white font-medium text-sm transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setStep(3)}
                      disabled={!focus.trim()}
                      className="group flex items-center gap-2 bg-zinc-100 text-zinc-950 px-8 py-4 rounded-xl font-bold hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                    >
                      Initialize <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-8 text-center"
                >
                  <div className="flex justify-center mb-6">
                    <div className="relative">
                      <CheckCircle className="w-24 h-24 text-white relative z-10" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-3xl font-black text-white mb-2">SYSTEMS ONLINE</h2>
                    <p className="text-zinc-400">
                      You are energized and focused. <br />
                      <span className="text-white font-bold">50 Points</span> added to your profile.
                    </p>
                  </div>

                  <div className="pt-8">
                    <button
                      onClick={handleComplete}
                      className="w-full bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-zinc-200 transition-all hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Enter Dashboard
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </TiltCard>
      </div>
    </div>
  );
}
