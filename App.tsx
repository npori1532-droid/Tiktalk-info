import React, { useState } from 'react';
import { Background3D } from './components/Background3D';
import { ProfileCard } from './components/ProfileCard';
import { Footer } from './components/Footer';
import { fetchTikTokData } from './services/tiktokService';
import { APIResponse } from './types';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);

    try {
      const result = await fetchTikTokData(username);
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user data. Check username.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen text-white font-sans selection:bg-tiktok-pink selection:text-white">
      {/* 3D Background */}
      <Background3D />

      <main className="relative z-10 container mx-auto px-4 py-12 md:py-20 flex flex-col items-center min-h-[80vh]">
        
        {/* Header Branding */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-block mb-2">
            <span className="text-xs font-bold tracking-[0.2em] text-tiktok-cyan uppercase border border-tiktok-cyan/30 bg-tiktok-cyan/10 px-3 py-1 rounded-full">
              TikTok Analytics
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            <span className="text-white">Find </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-tiktok-cyan to-white">Any </span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-tiktok-pink">Creator</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-lg mx-auto">
            Analyze TikTok profiles with high-precision metrics in a futuristic interface.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="w-full max-w-xl mb-16 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-tiktok-cyan to-tiktok-pink rounded-2xl blur opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
          <form onSubmit={handleSearch} className="relative">
            <div className="relative flex items-center bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden p-2 shadow-2xl transition-all focus-within:border-white/30 focus-within:ring-1 focus-within:ring-white/20">
              <div className="pl-4 text-gray-400">
                <span className="font-mono text-xl">@</span>
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="username"
                className="w-full bg-transparent border-none outline-none text-white text-lg placeholder-gray-500 px-2 py-3 font-mono"
              />
              <button 
                type="submit"
                disabled={loading || !username}
                className="bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-all duration-200 border border-white/5 active:scale-95"
              >
                {loading ? (
                  <Loader2 className="animate-spin" size={24} />
                ) : (
                  <Search size={24} />
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Content Area */}
        <div className="w-full flex-1 flex flex-col items-center justify-start min-h-[400px]">
          <AnimatePresence mode="wait">
            
            {/* Loading State Skeleton */}
            {loading && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="w-full max-w-4xl"
              >
                <div className="w-full h-80 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md animate-pulse p-8">
                  <div className="flex gap-8">
                     <div className="w-32 h-32 rounded-full bg-white/10" />
                     <div className="flex-1 space-y-4 pt-4">
                        <div className="h-8 w-64 bg-white/10 rounded-lg" />
                        <div className="h-4 w-32 bg-white/5 rounded-lg" />
                        <div className="h-16 w-full bg-white/5 rounded-lg" />
                     </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error State */}
            {error && !loading && (
               <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center p-8 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-md"
              >
                <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-red-200 mb-2">Error Fetching Data</h3>
                <p className="text-red-300/80">{error}</p>
              </motion.div>
            )}

            {/* Success State */}
            {data && !loading && (
              <ProfileCard 
                key="result"
                user={data.result.user} 
                stats={data.result.stats} 
              />
            )}

            {/* Empty State */}
            {!data && !loading && !error && (
               <motion.div 
                 key="empty"
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 className="text-center text-white/20 mt-10"
               >
                 <div className="text-6xl mb-4 font-mono opacity-20">^_^</div>
                 <p className="text-sm uppercase tracking-widest">Ready to Search</p>
               </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;