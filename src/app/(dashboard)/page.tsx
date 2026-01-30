"use client";

import { useGameStore } from "@/store/gameStore";
import { 
  CheckCircle, 
  Flame, 
  Activity, 
  Zap,
  Target,
  Cpu,
  Terminal,
  Layers,
  Gift,
  ChevronRight,
  Clock,
  Briefcase,
  Calendar,
  Trophy
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { 
  AreaChart, 
  Area, 
  ResponsiveContainer
} from "recharts";
import { TiltCard } from "@/components/ui/tilt-card";

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
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardPage() {
  const { user, tasks } = useGameStore();

  // Mock Activity Data for "System Log"
  const activities = [
    { id: 1, type: "complete", task: "Design System Update", time: "2h ago", points: "+50" },
    { id: 2, type: "streak", task: "7 Day Streak Reached", time: "5h ago", points: "+100" },
    { id: 3, type: "create", task: "New Project: Titan", time: "1d ago", points: "" },
    { id: 4, type: "complete", task: "Client Meeting", time: "1d ago", points: "+30" },
  ];

  const pointsHistory = [
    { value: 400 }, { value: 300 }, { value: 550 }, { value: 450 }, { value: 600 }, { value: 750 }, { value: 850 }
  ];

  // Mock Rewards for Dashboard Widget
  const nextReward = { title: "Amazon Gift Card", cost: 5000, icon: "Gift" };
  const rewardProgress = Math.min((user.points / nextReward.cost) * 100, 100);

  // Quick Actions
  const quickActions = [
    { name: "New Task", icon: Layers, href: "/tasks" },
    { name: "Log Standup", icon: Zap, href: "/check-in" },
    { name: "View Schedule", icon: Calendar, href: "/calendar" },
    { name: "Team Status", icon: Trophy, href: "/leaderboard" },
  ];

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-10"
    >
      {/* Hero Section */}
      <motion.div variants={item} className="relative h-[250px] rounded-2xl overflow-hidden group bg-zinc-900 border border-white/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/50 via-zinc-900/0 to-zinc-900/0 opacity-50" />
        
        <div className="relative h-full p-8 md:p-10 flex flex-col justify-center z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="px-3 py-1 rounded-full bg-zinc-800/50 border border-white/5 text-zinc-400 text-[10px] font-bold uppercase tracking-widest flex items-center gap-2">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
              </span>
              System Online
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">
            Welcome back, <span className="text-white">{user.name}</span>
          </h1>
          
          <p className="text-lg text-zinc-400 max-w-xl font-normal">
            Productivity is at <span className="text-zinc-200 font-medium">98%</span>. 
            You have <span className="text-zinc-200 font-medium">{tasks.filter(t => t.status !== 'completed').length} pending tasks</span>.
          </p>

          <div className="absolute bottom-8 right-10 hidden md:block">
            <div className="flex items-center gap-8">
               <div className="text-right">
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Current Streak</p>
                 <p className="text-3xl font-bold text-white">{user.streak}</p>
               </div>
               <div className="h-10 w-px bg-white/5" />
               <div className="text-right">
                 <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Total Points</p>
                 <p className="text-3xl font-bold text-white">{user.points.toLocaleString()}</p>
               </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Bar */}
      <motion.div variants={item} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link key={action.name} href={action.href}>
            <motion.div 
              whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.03)" }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/50 border border-white/5 hover:border-emerald-500/20 transition-colors cursor-pointer group"
            >
              <div className="h-10 w-10 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-emerald-500/10 group-hover:border-emerald-500/20 transition-colors">
                <action.icon className="w-5 h-5 text-zinc-400 group-hover:text-emerald-500 transition-colors" />
              </div>
              <span className="text-sm font-medium text-zinc-300 group-hover:text-white transition-colors">
                {action.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-auto md:h-[500px]">
        {/* Large Chart Card */}
        <motion.div variants={item} className="md:col-span-8 h-[300px] md:h-full">
          <TiltCard className="p-0 overflow-hidden bg-zinc-900/40 border-white/5 h-full">
             <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-zinc-400" />
                    Performance Analytics
                  </h3>
                  <p className="text-xs text-zinc-400">Real-time productivity metrics</p>
                </div>
                <div className="flex gap-2">
                   {['1H', '24H', '7D', '30D'].map((t) => (
                     <button key={t} className={`px-3 py-1 text-[10px] font-bold rounded-lg transition-colors border ${t === '7D' ? 'bg-zinc-100 text-zinc-900 border-zinc-100' : 'bg-transparent text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'}`}>
                       {t}
                     </button>
                   ))}
                </div>
             </div>
             <div className="h-[calc(100%-80px)] w-full pt-4">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={pointsHistory}>
                   <defs>
                     <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#d4d4d8" stopOpacity={0.1}/>
                       <stop offset="95%" stopColor="#d4d4d8" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <Area 
                     type="monotone" 
                     dataKey="value" 
                     stroke="#d4d4d8" 
                     strokeWidth={2}
                     fillOpacity={1} 
                     fill="url(#colorPoints)" 
                   />
                 </AreaChart>
               </ResponsiveContainer>
             </div>
          </TiltCard>
        </motion.div>

        {/* Vertical Stack */}
        <div className="md:col-span-4 flex flex-col gap-6 h-full">
          {/* Daily Focus */}
          <motion.div variants={item} className="flex-1">
             <TiltCard className="bg-zinc-900/40 border-white/5 relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-50" />
               
               <div className="relative z-10 p-6 flex flex-col h-full justify-between">
                 <div>
                   <div className="flex items-center justify-between mb-4">
                     <div className="p-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
                       <Target className="w-6 h-6 text-white" />
                     </div>
                     <span className="px-2 py-1 rounded bg-white/10 text-[10px] font-bold text-zinc-300 uppercase border border-white/5">Priority #1</span>
                   </div>
                   <h3 className="text-2xl font-bold text-white leading-tight mb-2">Complete System Migration</h3>
                   <p className="text-zinc-400 text-sm">Critical infrastructure update required before EOD.</p>
                 </div>
                 
                 <div className="mt-4">
                    <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-white rounded-full" />
                    </div>
                    <button className="w-full mt-4 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 transition-colors shadow-lg">
                      Engage Task
                    </button>
                 </div>
               </div>
             </TiltCard>
          </motion.div>

          {/* Next Reward Widget */}
          <motion.div variants={item} className="h-1/3">
             <TiltCard className="bg-zinc-900/40 border-white/5 p-0 flex flex-col justify-between group cursor-pointer hover:border-white/20 transition-all relative overflow-hidden">
               {/* Background Effects */}
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
               <div className="absolute top-0 right-0 p-24 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none transition-all duration-500 group-hover:bg-emerald-500/20" />
               
               <div className="p-5 flex flex-col h-full relative z-10">
                 <div className="flex justify-between items-start mb-2">
                   <div className="flex items-center gap-3">
                     <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                       <Gift className="w-5 h-5 text-emerald-400" />
                     </div>
                     <div>
                       <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-0.5">Target Reward</p>
                       <h4 className="text-white font-bold leading-none text-lg group-hover:text-emerald-200 transition-colors">{nextReward.title}</h4>
                     </div>
                   </div>
                   <div className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                      <ChevronRight className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
                   </div>
                 </div>

                 <div className="mt-auto space-y-3">
                   <div className="flex justify-between items-end">
                     <div className="flex flex-col">
                        <span className="text-3xl font-black text-white tracking-tight">{Math.round(rewardProgress)}%</span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Completed</span>
                     </div>
                     <div className="text-right">
                       <span className="text-xs font-medium text-zinc-400 font-mono block mb-1">
                         <span className="text-white font-bold">{user.points}</span> / {nextReward.cost} PTS
                       </span>
                     </div>
                   </div>
                   
                   <div className="relative h-2 w-full bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                     <motion.div 
                       initial={{ width: 0 }}
                       animate={{ width: `${rewardProgress}%` }}
                       transition={{ duration: 1.5, ease: "easeOut" }}
                       className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                     />
                   </div>
                 </div>
               </div>
             </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* System Log */}
      <motion.div variants={item}>
        <div className="rounded-2xl bg-zinc-900/40 border border-white/5 overflow-hidden backdrop-blur-md">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
             <h3 className="text-sm font-bold text-white flex items-center gap-2">
               <Terminal className="w-4 h-4 text-zinc-500" />
               System Log
             </h3>
             <span className="text-[10px] text-zinc-500 font-mono">LIVE FEED</span>
          </div>
          <div className="divide-y divide-white/5">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors group cursor-pointer">
                <div className="flex items-center gap-4">
                   <div className={`p-2 rounded-lg ${
                      activity.type === 'complete' ? 'bg-emerald-500/10 text-emerald-400' :
                      activity.type === 'streak' ? 'bg-orange-500/10 text-orange-400' :
                      'bg-indigo-500/10 text-indigo-400'
                   }`}>
                      {activity.type === 'complete' ? <CheckCircle className="w-4 h-4" /> :
                       activity.type === 'streak' ? <Flame className="w-4 h-4" /> :
                       <Layers className="w-4 h-4" />}
                   </div>
                   <div>
                     <p className="text-sm font-medium text-zinc-200 group-hover:text-white transition-colors">{activity.task}</p>
                     <p className="text-xs text-zinc-500">{activity.time}</p>
                   </div>
                </div>
                {activity.points && (
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20">
                    {activity.points} PTS
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
