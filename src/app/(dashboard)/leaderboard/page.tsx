"use client";

import { useGameStore } from "@/store/gameStore";
import { Trophy, Crown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";

// Mock Data for Leaderboard
const MOCK_LEADERBOARD = [
  { id: 1, name: "Sarah Connor", role: "Product Designer", points: 2450, avatar: "SC" },
  { id: 2, name: "John Doe", role: "Frontend Dev", points: 2100, avatar: "JD" },
  { id: 3, name: "Alice Smith", role: "Marketing", points: 1950, avatar: "AS" },
  { id: 4, name: "Bob Wilson", role: "Backend Dev", points: 1800, avatar: "BW" },
  { id: 5, name: "Charlie Brown", role: "Manager", points: 1650, avatar: "CB" },
  { id: 6, name: "Diana Prince", role: "UX Researcher", points: 1500, avatar: "DP" },
  { id: 7, name: "Evan Wright", role: "Data Analyst", points: 1400, avatar: "EW" },
];

export default function LeaderboardPage() {
  const { user } = useGameStore();

  // Merge current user into leaderboard for display purposes if not already there
  const leaderboard = [...MOCK_LEADERBOARD, { id: 99, name: user.name, role: "Associate", points: user.points, avatar: user.name.substring(0,2).toUpperCase() }]
    .sort((a, b) => b.points - a.points)
    .slice(0, 10);

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
      className="space-y-8 max-w-6xl mx-auto pb-10"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-zinc-100">
           <Trophy className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Team Performance</h1>
          <p className="text-zinc-400 font-normal">Top associate ranking.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
        {/* Rank 2 */}
        <motion.div variants={item} className="md:order-1 order-2">
          <TiltCard className="bg-zinc-900/40 border-white/5 flex flex-col items-center p-6 relative overflow-hidden group">
             <div className="w-20 h-20 rounded-full border border-white/10 p-1 mb-4 relative z-10 bg-zinc-900">
               <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-300">
                 {leaderboard[1].avatar}
               </div>
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-600">#2</div>
             </div>
             <h3 className="text-lg font-bold text-white">{leaderboard[1].name}</h3>
             <p className="text-zinc-500 text-sm mb-2">{leaderboard[1].role}</p>
             <p className="text-2xl font-bold text-zinc-300">{leaderboard[1].points}</p>
          </TiltCard>
        </motion.div>

        {/* Rank 1 */}
        <motion.div variants={item} className="md:order-2 order-1 transform md:-translate-y-8 z-10">
          <TiltCard className="bg-zinc-900 border-white/10 flex flex-col items-center p-8 relative overflow-hidden group shadow-2xl shadow-black/50">
             <Crown className="w-10 h-10 text-white mb-4" />
             
             <div className="w-24 h-24 rounded-full border border-white/20 p-1 mb-4 relative z-10 bg-zinc-900">
               <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-3xl font-bold text-white">
                 {leaderboard[0].avatar}
               </div>
               <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-4 py-1 rounded-full border border-white/20">#1</div>
             </div>
             
             <h3 className="text-2xl font-bold text-white">{leaderboard[0].name}</h3>
             <p className="text-zinc-400 text-sm mb-4">{leaderboard[0].role}</p>
             <p className="text-4xl font-bold text-white">{leaderboard[0].points}</p>
             
             <div className="mt-4 px-4 py-1 rounded-full bg-zinc-800/50 border border-white/5 text-zinc-300 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
               <TrendingUp className="w-3 h-3" /> Top Performer
             </div>
          </TiltCard>
        </motion.div>

        {/* Rank 3 */}
        <motion.div variants={item} className="md:order-3 order-3">
          <TiltCard className="bg-zinc-900/40 border-white/5 flex flex-col items-center p-6 relative overflow-hidden group">
             <div className="w-20 h-20 rounded-full border border-white/10 p-1 mb-4 relative z-10 bg-zinc-900">
               <div className="w-full h-full rounded-full bg-zinc-800 flex items-center justify-center text-xl font-bold text-zinc-400">
                 {leaderboard[2].avatar}
               </div>
               <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-zinc-800 text-zinc-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-zinc-700">#3</div>
             </div>
             <h3 className="text-lg font-bold text-white">{leaderboard[2].name}</h3>
             <p className="text-zinc-500 text-sm mb-2">{leaderboard[2].role}</p>
             <p className="text-2xl font-bold text-zinc-400">{leaderboard[2].points}</p>
          </TiltCard>
        </motion.div>
      </div>

      <div className="space-y-4">
        {leaderboard.slice(3).map((player, index) => (
          <motion.div 
            key={player.id}
            variants={item}
            className="flex items-center justify-between p-4 rounded-xl bg-zinc-900/20 border border-white/5 hover:bg-zinc-900/40 transition-colors"
          >
             <div className="flex items-center gap-4">
               <span className="text-sm font-bold text-zinc-600 w-6">#{index + 4}</span>
               <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-sm font-bold text-zinc-400">
                 {player.avatar}
               </div>
               <div>
                 <h4 className="text-white font-medium">{player.name}</h4>
                 <p className="text-xs text-zinc-500">{player.role}</p>
               </div>
             </div>
             <div className="font-bold text-zinc-400">{player.points}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
