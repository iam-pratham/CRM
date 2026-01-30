"use client";

import { motion } from "framer-motion";
import { Folder, MoreHorizontal, Clock, Users, ArrowUpRight, CheckCircle2, Circle } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";

const projects = [
  {
    id: 1,
    title: "Q1 Marketing Campaign",
    client: "Acme Corp",
    status: "Active",
    progress: 65,
    dueDate: "Mar 31, 2024",
    members: ["AM", "SC", "JD"],
    color: "bg-emerald-500",
  },
  {
    id: 2,
    title: "Website Redesign",
    client: "Globex Inc",
    status: "In Review",
    progress: 90,
    dueDate: "Feb 15, 2024",
    members: ["AM", "BW"],
    color: "bg-indigo-500",
  },
  {
    id: 3,
    title: "Mobile App Development",
    client: "Soylent Corp",
    status: "Planning",
    progress: 15,
    dueDate: "Jun 30, 2024",
    members: ["AM", "SC", "DP", "EW"],
    color: "bg-amber-500",
  },
  {
    id: 4,
    title: "Database Migration",
    client: "Internal",
    status: "Blocked",
    progress: 45,
    dueDate: "Feb 28, 2024",
    members: ["BW", "EW"],
    color: "bg-rose-500",
  },
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

export default function ProjectsPage() {
  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-zinc-100">
             <Folder className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Projects</h1>
            <p className="text-zinc-400 font-normal">Manage client deliverables and timelines.</p>
          </div>
        </div>
        <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">
          + New Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <motion.div variants={item} key={project.id}>
            <TiltCard className="bg-zinc-900/40 border-white/5 p-6 flex flex-col h-full group">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${project.color}`} />
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">{project.client}</span>
                </div>
                <button className="text-zinc-500 hover:text-white transition-colors">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-zinc-200 transition-colors">{project.title}</h3>
              
              <div className="flex items-center gap-4 text-xs text-zinc-500 mb-6 font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {project.dueDate}
                </div>
                <div className="flex items-center gap-1.5">
                  <Circle className={`w-2 h-2 fill-current ${
                    project.status === 'Active' ? 'text-emerald-500' :
                    project.status === 'Blocked' ? 'text-rose-500' :
                    project.status === 'In Review' ? 'text-indigo-500' :
                    'text-amber-500'
                  }`} />
                  {project.status}
                </div>
              </div>

              <div className="mt-auto space-y-4">
                <div className="flex items-center justify-between text-xs font-bold text-zinc-400">
                  <span>Progress</span>
                  <span>{project.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${project.color} transition-all duration-500`} 
                    style={{ width: `${project.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <div className="flex -space-x-2">
                    {project.members.map((initial, i) => (
                      <div key={i} className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-900 flex items-center justify-center text-[10px] font-bold text-zinc-400 ring-2 ring-zinc-900">
                        {initial}
                      </div>
                    ))}
                  </div>
                  <button className="p-2 rounded-lg hover:bg-white/5 text-zinc-400 hover:text-white transition-colors">
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        ))}
        
        <motion.div variants={item} className="h-full min-h-[250px]">
          <button className="w-full h-full rounded-xl border-2 border-dashed border-white/5 hover:border-white/10 hover:bg-white/5 transition-all flex flex-col items-center justify-center gap-4 group">
            <div className="w-12 h-12 rounded-full bg-zinc-800/50 flex items-center justify-center text-zinc-500 group-hover:text-white group-hover:bg-zinc-800 transition-all">
              <Folder className="w-6 h-6" />
            </div>
            <span className="text-sm font-bold text-zinc-500 group-hover:text-zinc-300">Create New Project</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
}
