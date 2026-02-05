import React from 'react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  delay: number;
  color?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ label, value, icon, delay, color = "text-white" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay }}
      className="relative group overflow-hidden rounded-2xl p-4 bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300"
    >
      <div className={`absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity transform rotate-12 ${color}`}>
        {React.cloneElement(icon as React.ReactElement, { size: 64 })}
      </div>
      
      <div className="flex items-center gap-3 mb-2">
        <div className={`p-2 rounded-lg bg-white/5 ${color}`}>
          {icon}
        </div>
        <span className="text-sm text-gray-400 font-mono tracking-wider">{label}</span>
      </div>
      
      <div className="relative">
        <h3 className="text-2xl font-bold text-white tracking-tight">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </h3>
      </div>
    </motion.div>
  );
};