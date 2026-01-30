"use client";

import { useState } from "react";
import { useGameStore, TaskStatus, Priority } from "@/store/gameStore";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle, Circle, Trash2, Calendar, Shield, Zap, Archive, AlertTriangle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/ui/tilt-card";

const columns: { id: TaskStatus; label: string; color: string; icon: LucideIcon }[] = [
  { id: "todo", label: "PENDING", color: "from-zinc-500/20 to-zinc-600/20", icon: Circle },
  { id: "in_progress", label: "ACTIVE", color: "from-indigo-500/20 to-blue-600/20", icon: Zap },
  { id: "blocked", label: "CRITICAL", color: "from-orange-500/20 to-red-600/20", icon: AlertTriangle },
  { id: "completed", label: "ARCHIVED", color: "from-emerald-500/20 to-teal-600/20", icon: Archive },
];

const priorityConfig: Record<Priority, { color: string; label: string }> = {
  low: { color: "text-blue-400 bg-blue-400/10 border-blue-400/20", label: "Low Priority" },
  medium: { color: "text-amber-400 bg-amber-400/10 border-amber-400/20", label: "Medium Priority" },
  high: { color: "text-red-400 bg-red-400/10 border-red-400/20", label: "High Priority" },
};

export default function TasksPage() {
  const { tasks, updateTaskStatus, addTask, deleteTask } = useGameStore();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium");

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    addTask({
      title: newTaskTitle,
      description: "",
      priority: newTaskPriority,
    });
    
    setNewTaskTitle("");
    setIsAdding(false);
  };

  const getNextStatus = (current: TaskStatus): TaskStatus => {
    if (current === 'todo') return 'in_progress';
    if (current === 'in_progress') return 'completed';
    if (current === 'blocked') return 'in_progress';
    return 'todo'; // Toggle back from completed? Or maybe just stay.
  };

  return (
    <div className="space-y-8 h-full flex flex-col pb-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Shield className="w-6 h-6 text-zinc-100" />
            Tasks
          </h2>
          <p className="text-zinc-400 font-normal">Manage your active tasks.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md bg-zinc-100 px-4 font-medium text-zinc-900 transition-all hover:bg-white hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          <span className="mr-2"><Plus className="h-4 w-4" /></span>
          New Task
        </button>
      </div>

      {/* Add Task Modal / Form */}
      <AnimatePresence>
        {isAdding && (
          <motion.div
             initial={{ opacity: 0, height: 0, scale: 0.95 }}
             animate={{ opacity: 1, height: 'auto', scale: 1 }}
             exit={{ opacity: 0, height: 0, scale: 0.95 }}
             className="overflow-hidden"
          >
            <div className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 mb-8 relative">
               <form onSubmit={handleAddTask} className="relative z-10 space-y-4">
                   <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
                     <div className="md:col-span-8 space-y-2">
                      <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Task Description</label>
                      <input
                        type="text"
                        placeholder="e.g. Update client proposal"
                        className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-white/20 focus:ring-1 focus:ring-white/20 transition-all"
                        value={newTaskTitle}
                        onChange={(e) => setNewTaskTitle(e.target.value)}
                        autoFocus
                      />
                    </div>
                     <div className="md:col-span-3 space-y-2">
                       <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Priority Class</label>
                       <select
                         className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white/20 transition-all appearance-none"
                         value={newTaskPriority}
                         onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                       >
                         <option value="low">Class C (Low)</option>
                         <option value="medium">Class B (Medium)</option>
                         <option value="high">Class A (High)</option>
                       </select>
                     </div>
                     <div className="md:col-span-1">
                       <div className="flex gap-2">
                           <button type="button" onClick={() => setIsAdding(false)} className="w-full p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white transition-colors">
                             <Trash2 className="w-5 h-5 mx-auto" />
                           </button>
                           <button type="submit" className="w-full p-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-500/20">
                             <CheckCircle className="w-5 h-5 mx-auto" />
                           </button>
                       </div>
                     </div>
                   </div>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex md:grid md:grid-cols-4 gap-6 h-full overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:scrollbar-default">
        {columns.map((col) => (
          <div key={col.id} className="flex flex-col h-full min-w-[85vw] md:min-w-0 snap-center first:pl-4 md:first:pl-0 last:pr-4 md:last:pr-0">
            {/* Column Header */}
            <div className={`mb-4 p-3 rounded-xl bg-gradient-to-r ${col.color} border border-white/5 backdrop-blur-md flex items-center justify-between group`}>
               <div className="flex items-center gap-2 font-bold text-white text-sm tracking-wider">
                 <col.icon className="w-4 h-4 opacity-70" />
                 {col.label}
               </div>
               <span className="px-2 py-0.5 rounded-md bg-black/20 text-xs font-mono text-white/70">
                 {tasks.filter(t => t.status === col.id).length}
               </span>
            </div>

            {/* Tasks Container */}
            <div className="flex-1 space-y-3">
               <AnimatePresence mode="popLayout">
                 {tasks.filter(t => t.status === col.id).map((task) => (
                   <motion.div
                     layoutId={task.id}
                     key={task.id}
                     initial={{ opacity: 0, y: 20, scale: 0.9 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, scale: 0.9 }}
                     whileHover={{ scale: 1.02, zIndex: 10 }}
                     drag
                     dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                     dragElastic={0.1}
                     className="cursor-grab active:cursor-grabbing"
                   >
                     <TiltCard className="bg-zinc-900/60 backdrop-blur-md border-white/5 hover:border-indigo-500/50 group relative overflow-hidden">
                        <div className="p-4 relative z-10">
                          <div className="flex justify-between items-start mb-3">
                            <span className={cn("text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded border", priorityConfig[task.priority].color)}>
                              {priorityConfig[task.priority].label}
                            </span>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                               <button 
                                 onClick={() => updateTaskStatus(task.id, getNextStatus(task.status))}
                                 className="p-1.5 rounded-lg bg-white/5 hover:bg-emerald-500/20 text-zinc-400 hover:text-emerald-400 transition-colors"
                               >
                                 <CheckCircle className="w-3.5 h-3.5" />
                               </button>
                               <button 
                                 onClick={() => deleteTask(task.id)}
                                 className="p-1.5 rounded-lg bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-400 transition-colors"
                               >
                                 <Trash2 className="w-3.5 h-3.5" />
                               </button>
                            </div>
                          </div>
                          
                          <h3 className="text-sm font-bold text-white leading-snug mb-2 group-hover:text-indigo-300 transition-colors">
                            {task.title}
                          </h3>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-white/5 mt-3">
                             <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-mono">
                               <Calendar className="w-3 h-3" />
                               <span>Today</span>
                             </div>
                             <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                               +{task.points} XP
                             </span>
                          </div>
                        </div>
                        
                        {/* Status Indicator Bar */}
                        <div className={cn(
                          "absolute bottom-0 left-0 right-0 h-1",
                          task.status === 'completed' ? 'bg-emerald-500' :
                          task.status === 'in_progress' ? 'bg-blue-500' :
                          task.status === 'blocked' ? 'bg-red-500' :
                          'bg-zinc-700'
                        )} />
                     </TiltCard>
                   </motion.div>
                 ))}
               </AnimatePresence>
               
               {/* Empty State */}
               {tasks.filter(t => t.status === col.id).length === 0 && (
                 <div className="h-24 rounded-xl border-2 border-dashed border-white/5 flex items-center justify-center text-zinc-600 text-xs font-medium uppercase tracking-widest">
                   No Tasks
                 </div>
               )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
