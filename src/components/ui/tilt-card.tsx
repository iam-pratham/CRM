"use client";

import React from "react";
import { motion } from "framer-motion";

export const TiltCard = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`relative h-full w-full rounded-xl bg-zinc-900/40 border border-white/5 transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-black/50 ${className}`}
    >
      {children}
    </motion.div>
  );
};
