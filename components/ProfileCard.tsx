import React from 'react';
import { motion } from 'framer-motion';
import { TikTokUser, TikTokStats } from '../types';
import { StatCard } from './StatCard';
import { Heart, Users, Video, BadgeCheck, Lock, Hash } from 'lucide-react';

interface ProfileCardProps {
  user: TikTokUser;
  stats: TikTokStats;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, stats }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="w-full max-w-4xl mx-auto"
    >
      {/* Main Glass Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tiktok-cyan via-white to-tiktok-pink" />

        <div className="p-8 md:p-10">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            
            {/* Avatar Section */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-tr from-tiktok-cyan to-tiktok-pink">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-black bg-gray-800 relative">
                  <img 
                    src={user.avatarLarger} 
                    alt={user.nickname}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
                    }}
                  />
                </div>
              </div>
              {user.verified && (
                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full border-4 border-black shadow-lg" title="Verified Creator">
                  <BadgeCheck size={20} fill="currentColor" className="text-white" />
                </div>
              )}
            </motion.div>

            {/* User Info Section */}
            <div className="flex-1 text-center md:text-left space-y-3">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-white flex items-center justify-center md:justify-start gap-2">
                  {user.nickname}
                </h2>
                <div className="flex items-center justify-center md:justify-start gap-2 text-tiktok-cyan mt-1 font-mono text-lg">
                  <span>@{user.uniqueId}</span>
                  {user.privateAccount && <Lock size={14} className="text-gray-400" />}
                </div>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-xl mx-auto md:mx-0 font-light border-l-2 border-white/20 pl-4">
                {user.signature || "No bio available."}
              </p>

              <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-2">
                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                    ID: {user.id}
                 </span>
                 <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-gray-300">
                    Region: {user.language.toUpperCase()}
                 </span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">
            <StatCard 
              label="Followers" 
              value={stats.followerCount} 
              icon={<Users />} 
              delay={0.3}
              color="text-tiktok-cyan"
            />
            <StatCard 
              label="Likes" 
              value={stats.heartCount} 
              icon={<Heart />} 
              delay={0.4}
              color="text-tiktok-pink"
            />
            <StatCard 
              label="Videos" 
              value={stats.videoCount} 
              icon={<Video />} 
              delay={0.5}
              color="text-purple-400"
            />
             <StatCard 
              label="Following" 
              value={stats.followingCount} 
              icon={<Hash />} 
              delay={0.6}
              color="text-green-400"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};