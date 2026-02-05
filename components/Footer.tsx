import React from 'react';
import { Code, Send, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full mt-20 pb-8 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="h-px w-full max-w-xs bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4"></div>
          
          <div className="flex items-center gap-2 text-white/80 font-mono text-sm">
            <Code size={16} className="text-tiktok-cyan" />
            <span>Developed by</span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-tiktok-cyan to-tiktok-pink">
              Tech Master
            </span>
          </div>

          <div className="flex items-center gap-6">
            <a 
              href="https://t.me/tech_master_a2z" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-widest group"
            >
              <Send size={14} className="group-hover:text-blue-400 transition-colors" />
              <span>Dev Channel</span>
            </a>
            
            <a 
              href="https://t.me/GAJARBOTOLZ" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-widest group"
            >
              <Send size={14} className="group-hover:text-blue-400 transition-colors" />
              <span>Official Telegram</span>
            </a>

             <a 
              href="https://www.gajarbotol.site/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-xs uppercase tracking-widest group"
            >
              <Globe size={14} className="group-hover:text-green-400 transition-colors" />
              <span>Website</span>
            </a>
          </div>
          
          <p className="text-white/20 text-[10px] mt-4">
            © {new Date().getFullYear()} All rights reserved. Not affiliated with TikTok.
          </p>
        </div>
      </div>
    </footer>
  );
};