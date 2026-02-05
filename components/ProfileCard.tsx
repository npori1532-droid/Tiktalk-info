import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TikTokUser, TikTokStats } from '../types';
import { StatCard } from './StatCard';
import { Heart, Users, Video, BadgeCheck, Lock, Hash, Calendar, Globe, Fingerprint, Copy, Check } from 'lucide-react';

interface ProfileCardProps {
  user: TikTokUser;
  stats: TikTokStats;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({ user, stats }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const formatDate = (timestamp: number) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp * 1000).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, type: "spring" }}
      className="w-full max-w-5xl mx-auto"
    >
      {/* Main Glass Card */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl">
        
        {/* Decorative Top Gradient Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tiktok-cyan via-white to-tiktok-pink" />

        <div className="p-6 md:p-10">
          <div className="flex flex-col lg:flex-row gap-8 items-center lg:items-start">
            
            {/* Avatar Section */}
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative group"
            >
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full p-1 bg-gradient-to-tr from-tiktok-cyan to-tiktok-pink">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-black bg-gray-800 relative z-10">
                  <img 
                    src={user.avatarLarger} 
                    alt={user.nickname}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://cdn-icons-png.flaticon.com/512/847/847969.png';
                    }}
                  />
                </div>
              </div>
              {user.verified && (
                <div className="absolute bottom-2 right-2 z-20 bg-blue-500 text-white p-2 rounded-full border-4 border-black shadow-lg" title="Verified Creator">
                  <BadgeCheck size={24} fill="currentColor" className="text-white" />
                </div>
              )}
            </motion.div>

            {/* User Info Section */}
            <div className="flex-1 w-full text-center lg:text-left space-y-4">
              <div className="space-y-1">
                <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center justify-center lg:justify-start gap-3 flex-wrap">
                  {user.nickname}
                  {user.privateAccount && (
                    <div className="bg-white/10 p-1.5 rounded-lg border border-white/5" title="Private Account">
                      <Lock size={16} className="text-gray-400" />
                    </div>
                  )}
                </h2>
                <div className="flex items-center justify-center lg:justify-start gap-2 text-tiktok-cyan mt-1 font-mono text-lg md:text-xl">
                  <span>@{user.uniqueId}</span>
                  <button 
                    onClick={() => copyToClipboard(user.uniqueId, 'username')}
                    className="text-white/20 hover:text-white transition-colors p-1"
                    title="Copy Username"
                  >
                    {copiedField === 'username' ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                  </button>
                </div>
              </div>

              <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto lg:mx-0 font-light border-l-2 border-white/20 pl-4 py-1 italic">
                {user.signature || "No bio available."}
              </p>

              {/* Meta Data Grid */}
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
                 {/* User ID */}
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 items-start relative group hover:bg-white/10 transition-colors">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1">
                      <Hash size={10} /> ID
                    </span>
                    <span className="text-sm font-mono text-gray-300 truncate w-full" title={user.id}>
                      {user.id}
                    </span>
                    <button 
                      onClick={() => copyToClipboard(user.id, 'id')}
                      className="absolute top-3 right-3 text-white/20 hover:text-white opacity-0 group-hover:opacity-100 transition-all"
                    >
                      {copiedField === 'id' ? <Check size={14} className="text-green-400"/> : <Copy size={14} />}
                    </button>
                 </div>

                 {/* Region/Language */}
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 items-start hover:bg-white/10 transition-colors">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1">
                      <Globe size={10} /> Region
                    </span>
                    <span className="text-sm font-mono text-gray-300 uppercase">
                      {user.language}
                    </span>
                 </div>

                 {/* Created At */}
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 items-start hover:bg-white/10 transition-colors">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1">
                      <Calendar size={10} /> Joined
                    </span>
                    <span className="text-sm font-mono text-gray-300 whitespace-nowrap">
                      {formatDate(user.createTime)}
                    </span>
                 </div>
                 
                  {/* Verified Status Text */}
                 <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-1 items-start hover:bg-white/10 transition-colors">
                    <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold flex items-center gap-1">
                      <BadgeCheck size={10} /> Status
                    </span>
                    <span className={`text-sm font-mono font-bold ${user.verified ? 'text-blue-400' : 'text-gray-500'}`}>
                      {user.verified ? 'VERIFIED' : 'UNVERIFIED'}
                    </span>
                 </div>
              </div>
              
              {/* Technical Details / SecUid */}
              <div className="w-full">
                 <div className="bg-black/20 border border-white/5 rounded-xl p-3 flex items-center gap-3 group relative overflow-hidden">
                    <div className="p-2 bg-white/5 rounded-lg text-gray-400">
                      <Fingerprint size={16} />
                    </div>
                    <div className="flex-1 overflow-hidden">
                       <div className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-0.5">SecUID</div>
                       <div className="text-xs font-mono text-gray-400 truncate w-full select-all">
                          {user.secUid}
                       </div>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(user.secUid, 'secUid')}
                      className="p-2 hover:bg-white/10 rounded-lg text-gray-500 hover:text-white transition-colors"
                      title="Copy SecUID"
                    >
                      {copiedField === 'secUid' ? <Check size={16} className="text-green-400"/> : <Copy size={16} />}
                    </button>
                 </div>
              </div>

            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
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