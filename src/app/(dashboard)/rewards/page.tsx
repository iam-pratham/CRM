"use client";

import { useGameStore } from "@/store/gameStore";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { Gift, Target, Lock, Unlock, Zap, Crown, CreditCard, Coffee, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock Rewards Data
const REWARDS = [
  {
    id: 1,
    title: "Amazon Gift Card",
    description: "$50 Digital Gift Card",
    cost: 5000,
    icon: Gift,
    category: "Perks",
    image: "bg-gradient-to-br from-orange-500/20 to-amber-500/20",
  },
  {
    id: 2,
    title: "Extra Day Off",
    description: "Paid leave for one day",
    cost: 15000,
    icon: Coffee,
    category: "Lifestyle",
    image: "bg-gradient-to-br from-emerald-500/20 to-teal-500/20",
  },
  {
    id: 3,
    title: "Tech Upgrade",
    description: "New Mechanical Keyboard",
    cost: 8000,
    icon: Monitor,
    category: "Gear",
    image: "bg-gradient-to-br from-indigo-500/20 to-blue-500/20",
  },
  {
    id: 4,
    title: "Team Lunch",
    description: "Lunch on the company",
    cost: 3000,
    icon: CreditCard,
    category: "Social",
    image: "bg-gradient-to-br from-pink-500/20 to-rose-500/20",
  },
];

export default function RewardsPage() {
  const { user } = useGameStore();

  const nextReward = REWARDS.find(r => r.cost > user.points) || REWARDS[REWARDS.length - 1];
  const progress = Math.min((user.points / nextReward.cost) * 100, 100);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-zinc-800/50 border border-white/10 text-white">
           <Gift className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">REWARDS</h2>
          <p className="text-zinc-400 font-medium tracking-wide">Redeem your hard-earned points.</p>
        </div>
      </div>

      {/* Goal Tracker */}
      <motion.div variants={item}>
        <TiltCard className="bg-zinc-900/40 border-white/5 p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-2 space-y-4">
              <div className="flex items-center gap-2 text-indigo-400 font-bold tracking-widest uppercase text-xs">
                <Target className="w-4 h-4" />
                Next Goal
              </div>
              <h3 className="text-3xl font-bold text-white">
                {nextReward.title}
              </h3>
              <p className="text-zinc-400 max-w-md">
                You are <span className="text-white font-bold">{nextReward.cost - user.points} points</span> away from unlocking this reward. Keep pushing!
              </p>
              
              <div className="space-y-2 max-w-xl">
                <div className="flex justify-between text-xs font-bold text-zinc-500 uppercase tracking-widest">
                  <span>Progress</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full bg-white"
                  />
                </div>
                <div className="flex justify-between text-xs font-medium text-zinc-600 font-mono">
                  <span>{user.points} PTS</span>
                  <span>{nextReward.cost} PTS</span>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-zinc-800 flex items-center justify-center bg-zinc-900/50 backdrop-blur-md">
                   <Lock className="w-10 h-10 text-zinc-600" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-zinc-800 px-4 py-1 rounded-full border border-white/10 text-xs font-bold text-zinc-400 whitespace-nowrap">
                  LOCKED
                </div>
              </div>
            </div>
          </div>
        </TiltCard>
      </motion.div>

      {/* Rewards Grid */}
      <div>
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Crown className="w-5 h-5 text-white" />
          Available Rewards
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {REWARDS.map((reward) => {
            const isUnlocked = user.points >= reward.cost;
            return (
              <motion.div variants={item} key={reward.id}>
                <TiltCard className={cn(
                  "bg-zinc-900/40 border-white/5 p-6 flex flex-col h-full group transition-all",
                  isUnlocked ? "hover:border-white/20" : "opacity-60"
                )}>
                  <div className={cn("w-full h-32 rounded-lg mb-4 flex items-center justify-center", reward.image)}>
                    <reward.icon className={cn("w-10 h-10", isUnlocked ? "text-white" : "text-white/50")} />
                  </div>
                  
                  <div className="mb-4">
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-1">{reward.category}</div>
                    <h4 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">{reward.title}</h4>
                    <p className="text-xs text-zinc-400">{reward.description}</p>
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-sm font-bold text-white font-mono">{reward.cost} PTS</span>
                    {isUnlocked ? (
                      <button className="px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold hover:bg-zinc-200 transition-colors">
                        Claim
                      </button>
                    ) : (
                      <div className="flex items-center gap-1 text-zinc-600 text-xs font-bold uppercase tracking-wider">
                        <Lock className="w-3 h-3" />
                        Locked
                      </div>
                    )}
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
