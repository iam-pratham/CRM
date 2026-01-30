"use client";

import { useGameStore } from "@/store/gameStore";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { TrendingUp, Clock, Zap, Target, BarChart2 } from "lucide-react";

export default function AnalyticsPage() {
  const { tasks, user } = useGameStore();

  // Mock data for the graphs
  const activityData = [
    { day: "Mon", points: 120, tasks: 2 },
    { day: "Tue", points: 250, tasks: 4 },
    { day: "Wed", points: 180, tasks: 3 },
    { day: "Thu", points: 300, tasks: 5 },
    { day: "Fri", points: 450, tasks: 6 },
    { day: "Sat", points: 100, tasks: 1 },
    { day: "Sun", points: 150, tasks: 1 },
  ];

  const taskDistribution = [
    { name: "Pending", value: tasks.filter(t => t.status === 'todo').length, color: "#a1a1aa" },
    { name: "Active", value: tasks.filter(t => t.status === 'in_progress').length, color: "#6366f1" },
    { name: "Completed", value: tasks.filter(t => t.status === 'completed').length, color: "#10b981" },
    { name: "Critical", value: tasks.filter(t => t.status === 'blocked').length, color: "#f43f5e" },
  ];

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
           <BarChart2 className="w-8 h-8" />
        </div>
        <div>
          <h2 className="text-4xl font-black tracking-tighter text-white">ANALYTICS</h2>
          <p className="text-zinc-400 font-medium tracking-wide">Performance metrics and neural insights.</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Efficiency Score", value: "94%", sub: "+12% vs last week", icon: TrendingUp },
          { title: "Focus Duration", value: "32h 15m", sub: "Deep work sessions", icon: Clock },
          { title: "Avg. Velocity", value: "245 Pts", sub: "Daily average", icon: Zap },
          { title: "Current Rank", value: `Lvl ${user.level}`, sub: "Associate", icon: Target },
        ].map((stat, i) => (
          <motion.div variants={item} key={i}>
            <TiltCard className="bg-zinc-900/40 border-white/5 hover:border-white/20 transition-colors group">
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                   <div className="text-xs font-bold text-zinc-500 uppercase tracking-widest">{stat.title}</div>
                   <stat.icon className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-4xl font-black text-white mb-2">{stat.value}</div>
                <div className="text-xs font-medium text-zinc-500">{stat.sub}</div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-3 h-[450px]">
        <motion.div variants={item} className="md:col-span-2 h-full">
          <TiltCard className="bg-zinc-900/40 backdrop-blur-xl border-white/5 h-full p-8 flex flex-col hover:border-white/20 transition-colors">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Zap className="w-5 h-5 text-white" />
                    Performance Trend
                    </h3>
                    <p className="text-zinc-500 text-sm mt-1">7-day activity analysis</p>
                </div>
                <div className="text-right">
                    <div className="text-2xl font-black text-white">1,550</div>
                    <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">+12% vs last week</div>
                </div>
            </div>
            
            <div className="flex-1 w-full min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={activityData}>
                  <defs>
                    <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ffffff" stopOpacity={0.1}/>
                      <stop offset="95%" stopColor="#ffffff" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="#52525b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10} 
                  />
                  <YAxis 
                    stroke="#52525b" 
                    fontSize={11} 
                    tickLine={false} 
                    axisLine={false} 
                    dx={-10}
                  />
                  <Tooltip 
                    contentStyle={{ 
                        backgroundColor: '#09090b', 
                        borderColor: 'rgba(255,255,255,0.05)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                    }}
                    itemStyle={{ color: '#fff', fontSize: '12px', fontWeight: 600 }}
                    cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="points" 
                    stroke="#fff" 
                    strokeWidth={2} 
                    fillOpacity={1} 
                    fill="url(#colorPoints)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TiltCard>
        </motion.div>

        <motion.div variants={item} className="h-full">
          <TiltCard className="bg-zinc-900/40 backdrop-blur-xl border-white/5 h-full p-8 flex flex-col hover:border-white/20 transition-colors">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-3 justify-center">
              <Target className="w-5 h-5 text-white" />
              Task Distribution
            </h3>
            <p className="text-zinc-500 text-sm mb-6 text-center">Current workload breakdown</p>
            
            <div className="flex-1 w-full min-h-0 flex flex-col items-center justify-center relative">
              <div className="w-full h-[220px] relative">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                    <Pie
                        data={taskDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={4}
                        dataKey="value"
                        stroke="none"
                        cornerRadius={4}
                    >
                        {taskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" strokeWidth={2} />
                        ))}
                    </Pie>
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#09090b', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '8px' }}
                        itemStyle={{ color: '#e4e4e7', fontSize: '12px' }}
                    />
                    </PieChart>
                </ResponsiveContainer>
                
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <div className="text-4xl font-black text-white tracking-tighter">{tasks.length}</div>
                   <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Total</div>
                </div>
              </div>

              <div className="w-full mt-6 space-y-3">
                {taskDistribution.map((item) => (
                    <div key={item.name} className="flex items-center justify-between group/item cursor-default">
                        <div className="flex items-center gap-3">
                            <div className="w-2.5 h-2.5 rounded-full ring-2 ring-black/20" style={{ backgroundColor: item.color }} />
                            <span className="text-sm font-medium text-zinc-400 group-hover/item:text-zinc-200 transition-colors">{item.name}</span>
                        </div>
                        <span className="text-sm font-bold text-zinc-500 group-hover/item:text-white transition-colors">{item.value}</span>
                    </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </motion.div>
  );
}
