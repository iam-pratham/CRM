"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Clock, Users, MapPin } from "lucide-react";
import { TiltCard } from "@/components/ui/tilt-card";
import { useState } from "react";

const events = [
  { id: 1, title: "Q1 Strategy Meeting", time: "09:00 AM", duration: "1h", type: "meeting", members: ["AM", "JD"], color: "bg-zinc-100" },
  { id: 2, title: "Client Presentation", time: "11:30 AM", duration: "1.5h", type: "client", members: ["AM", "SC"], color: "bg-zinc-100" },
  { id: 3, title: "Design Review", time: "02:00 PM", duration: "1h", type: "work", members: ["AM", "DP", "EW"], color: "bg-zinc-100" },
  { id: 4, title: "Team Standup", time: "04:30 PM", duration: "30m", type: "meeting", members: ["All"], color: "bg-zinc-100" },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const currentMonthDays = Array.from({ length: 31 }, (_, i) => i + 1);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(24);

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 pb-10 h-[calc(100vh-100px)] flex flex-col"
    >
      <div className="flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-zinc-800/50 border border-white/5 text-zinc-100">
             <CalendarIcon className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Schedule</h1>
            <p className="text-zinc-400 font-normal">Manage your appointments and deadlines.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-zinc-900 border border-white/5 rounded-lg p-1">
            <button className="p-2 hover:bg-white/5 rounded-md text-zinc-400 hover:text-white transition-colors">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-bold text-white">October 2023</span>
            <button className="p-2 hover:bg-white/5 rounded-md text-zinc-400 hover:text-white transition-colors">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          <button className="px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-colors flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </div>

      <div className="flex gap-6 flex-1 min-h-0">
        {/* Calendar Grid */}
        <div className="flex-1 bg-zinc-900/40 border border-white/5 rounded-2xl p-6 overflow-hidden flex flex-col">
          <div className="grid grid-cols-7 mb-4">
            {days.map(day => (
              <div key={day} className="text-center text-xs font-bold text-zinc-500 uppercase tracking-widest py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 flex-1 gap-1">
            {/* Empty start days */}
            {[1, 2, 3].map(d => (
              <div key={`empty-${d}`} className="bg-transparent" />
            ))}
            
            {currentMonthDays.map(day => (
              <button
                key={day}
                onClick={() => setSelectedDate(day)}
                className={`relative rounded-xl border transition-all p-2 flex flex-col items-start justify-between group ${
                  selectedDate === day 
                    ? 'bg-white/10 border-white/20 text-white shadow-lg' 
                    : 'bg-zinc-900/20 border-white/5 text-zinc-400 hover:bg-zinc-800 hover:border-white/10'
                }`}
              >
                <span className={`text-sm font-bold ${selectedDate === day ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                  {day}
                </span>
                
                {/* Event Indicators */}
                {[2, 5, 12, 15, 24, 28].includes(day) && (
                  <div className="w-full space-y-1 mt-1">
                     <div className="h-1.5 w-full bg-zinc-700 rounded-full overflow-hidden">
                       <div className="h-full w-2/3 bg-white" />
                     </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Schedule - Side Panel */}
        <div className="w-96 flex flex-col gap-4 shrink-0">
          <TiltCard className="bg-zinc-900/60 border-white/5 flex-1 p-6 flex flex-col">
             <div className="flex justify-between items-center mb-6">
               <div>
                 <h2 className="text-xl font-bold text-white">October {selectedDate}</h2>
                 <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Today's Agenda</p>
               </div>
               <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-zinc-800">
                 <span className="text-sm font-bold text-white">4</span>
               </div>
             </div>

             <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar flex-1">
               {events.map((event, i) => (
                 <motion.div 
                   variants={item}
                   key={event.id}
                   className="p-4 rounded-xl bg-zinc-800/50 border border-white/5 hover:border-white/10 transition-colors group"
                 >
                   <div className="flex justify-between items-start mb-2">
                     <span className="text-xs font-bold text-zinc-500 flex items-center gap-1.5">
                       <Clock className="w-3 h-3" />
                       {event.time}
                     </span>
                     <span className="text-[10px] font-bold text-zinc-600 border border-zinc-700 px-1.5 py-0.5 rounded uppercase">{event.duration}</span>
                   </div>
                   
                   <div className="pl-3 border-l-2 border-white/20 group-hover:border-white transition-colors mb-3">
                     <h3 className="text-sm font-bold text-white leading-tight">{event.title}</h3>
                     <p className="text-xs text-zinc-500 mt-0.5 capitalize">{event.type}</p>
                   </div>

                   <div className="flex items-center justify-between pt-2 border-t border-white/5">
                     <div className="flex -space-x-2">
                       {event.members.map((m, idx) => (
                         <div key={idx} className="w-6 h-6 rounded-full bg-zinc-700 border border-zinc-800 flex items-center justify-center text-[8px] font-bold text-white ring-2 ring-zinc-800">
                           {m}
                         </div>
                       ))}
                     </div>
                     <button className="text-zinc-500 hover:text-white transition-colors">
                       <MapPin className="w-3.5 h-3.5" />
                     </button>
                   </div>
                 </motion.div>
               ))}
               
               <div className="p-8 border-2 border-dashed border-white/5 rounded-xl flex flex-col items-center justify-center text-zinc-600 gap-2">
                 <span className="text-xs font-bold uppercase tracking-widest">Free Slot</span>
                 <span className="text-[10px]">05:00 PM - 07:00 PM</span>
               </div>
             </div>
          </TiltCard>
        </div>
      </div>
    </motion.div>
  );
}
