"use client";

import { motion } from "framer-motion";
import { Settings, User, Bell, Lock, Shield, Palette, Smartphone, Globe, Moon } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { useState } from "react";
import { useGameStore } from "@/store/gameStore";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Lock },
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

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const { user } = useGameStore();

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8 pb-10 max-w-5xl mx-auto"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-zinc-100">
           <Settings className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
          <p className="text-zinc-400 font-normal">Manage your preferences and account.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar Tabs */}
        <div className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id 
                  ? 'bg-white text-black font-bold shadow-lg' 
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-white/5">
            <div className="px-4 text-xs font-bold text-zinc-500 uppercase tracking-widest mb-4">System</div>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
              <Shield className="w-4 h-4" />
              Privacy Policy
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-400 hover:text-zinc-200 hover:bg-white/5 transition-colors">
              <Smartphone className="w-4 h-4" />
              Mobile App
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3">
          <TiltCard className="bg-zinc-900/40 border-white/5 min-h-[500px] p-8">
            
            {activeTab === "profile" && (
              <motion.div variants={item} className="space-y-8">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Profile Information</h2>
                  <p className="text-sm text-zinc-400">Update your public profile and details.</p>
                </div>

                <div className="flex items-center gap-6 pb-8 border-b border-white/5">
                  <div className="w-24 h-24 rounded-full bg-zinc-800 border-2 border-white/10 flex items-center justify-center text-3xl font-bold text-white">
                    {user.name.charAt(0)}
                  </div>
                  <div className="space-y-3">
                    <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                      Change Avatar
                    </button>
                    <p className="text-xs text-zinc-500">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Full Name</label>
                    <input 
                      type="text" 
                      defaultValue={user.name}
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Job Title</label>
                    <input 
                      type="text" 
                      defaultValue="Associate"
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Email Address</label>
                    <input 
                      type="email" 
                      defaultValue="alex.mercer@company.com"
                      className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Department</label>
                    <select className="w-full bg-zinc-950 border border-white/10 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-white/20 transition-all">
                      <option>Engineering</option>
                      <option>Design</option>
                      <option>Marketing</option>
                      <option>Sales</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button className="px-6 py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-zinc-200 transition-colors shadow-lg shadow-white/5">
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === "notifications" && (
              <motion.div variants={item} className="space-y-6">
                 <div>
                  <h2 className="text-xl font-bold text-white mb-1">Notification Preferences</h2>
                  <p className="text-sm text-zinc-400">Choose what you want to be notified about.</p>
                </div>

                <div className="space-y-4">
                  {[
                    { title: "Task Assignments", desc: "When a new task is assigned to you" },
                    { title: "Project Updates", desc: "When a project status changes" },
                    { title: "Team Mentions", desc: "When someone mentions you in a comment" },
                    { title: "Daily Briefing", desc: "Receive a daily summary of your tasks" },
                  ].map((setting, i) => (
                    <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-zinc-950/50 border border-white/5">
                      <div>
                        <h3 className="text-sm font-bold text-white">{setting.title}</h3>
                        <p className="text-xs text-zinc-500">{setting.desc}</p>
                      </div>
                      <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-zinc-700 cursor-pointer">
                        <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === "appearance" && (
              <motion.div variants={item} className="space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-white mb-1">Appearance Settings</h2>
                  <p className="text-sm text-zinc-400">Customize the look and feel of the interface.</p>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl border-2 border-white bg-zinc-900 cursor-pointer">
                    <div className="mb-2 w-full h-20 bg-zinc-950 rounded-lg border border-white/10 flex items-center justify-center">
                      <Moon className="text-white" />
                    </div>
                    <p className="text-center text-sm font-bold text-white">Dark Mode</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-zinc-900 opacity-50 cursor-not-allowed">
                    <div className="mb-2 w-full h-20 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <Moon className="text-black" />
                    </div>
                    <p className="text-center text-sm font-bold text-zinc-500">Light Mode</p>
                  </div>
                  <div className="p-4 rounded-xl border border-white/10 bg-zinc-900 opacity-50 cursor-not-allowed">
                     <div className="mb-2 w-full h-20 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-lg flex items-center justify-center">
                      <Globe className="text-zinc-400" />
                    </div>
                    <p className="text-center text-sm font-bold text-zinc-500">System</p>
                  </div>
                </div>
              </motion.div>
            )}

          </TiltCard>
        </div>
      </div>
    </motion.div>
  );
}
