import React from 'react';
import { PageId } from '../types';
import { Volume2, VolumeX, Send, Music2, Pause, Play } from 'lucide-react';
import { gothicAudio } from '../utils/audio';

interface GothicHeaderProps {
  currentPage: PageId;
  onPageChange: (page: PageId) => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  isMusicPlaying: boolean;
  onToggleMusic: () => void;
}

export const GothicHeader: React.FC<GothicHeaderProps> = ({
  currentPage,
  onPageChange,
  soundEnabled,
  onToggleSound,
  isMusicPlaying,
  onToggleMusic,
}) => {
  const navItems: { id: PageId; label: string; numeral: string }[] = [
    { id: 'profile', label: '个人信息', numeral: 'I' },
    { id: 'weibo', label: '微博直通', numeral: 'II' },
    { id: 'services', label: '业务板块', numeral: 'III' },
    { id: 'operations', label: '运营详情', numeral: 'IV' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#07070a]/90 border-b border-rose-950/40 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, no extraneous badges) */}
        <button
          onClick={() => {
            gothicAudio.playClickChime();
            onPageChange('profile');
          }}
          className="group flex items-center gap-2 text-left cursor-pointer transition-opacity hover:opacity-90 shrink-0"
        >
          <span className="text-rose-600 font-cinzel text-lg tracking-wider animate-pulse">♱</span>
          <span className="text-lg md:text-xl font-cinzel font-bold tracking-widest text-zinc-100 whitespace-nowrap">
            yu｜知薇
          </span>
        </button>

        {/* Zone 2: 4 clean single-line nav links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-400">
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  gothicAudio.playPageTurnSound();
                  onPageChange(item.id);
                }}
                className={`relative py-1 text-sm tracking-wide transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  isActive ? 'text-rose-300 font-semibold' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                <span className="font-cinzel text-xs text-rose-500/70 mr-1.5">{item.numeral}.</span>
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Music Play/Pause control + Sound toggle + Primary action */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Music Play / Pause quick toggle */}
          <button
            onClick={() => {
              gothicAudio.playClickChime();
              onToggleMusic();
            }}
            aria-label={isMusicPlaying ? '暂停背景音乐' : '播放背景音乐'}
            title={isMusicPlaying ? '音乐播放中（点击暂停）· 希先森《Intro(Max)》' : '音乐已暂停（点击播放）· 希先森《Intro(Max)》'}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-serif-sc transition-all cursor-pointer ${
              isMusicPlaying
                ? 'bg-rose-950/70 text-rose-200 border-rose-800/80 shadow-sm'
                : 'bg-zinc-900/60 text-zinc-400 hover:text-zinc-200 border-zinc-800'
            }`}
          >
            <Music2 className={`w-3.5 h-3.5 ${isMusicPlaying ? 'text-rose-400 animate-pulse' : 'text-zinc-500'}`} />
            <span className="hidden xl:inline text-[11px]">
              {isMusicPlaying ? 'Intro(Max) 播放中' : '音乐暂停'}
            </span>
            {isMusicPlaying ? (
              <Pause className="w-3 h-3 text-rose-400" />
            ) : (
              <Play className="w-3 h-3 text-zinc-400 fill-zinc-400" />
            )}
          </button>

          {/* Gothic chime sound effects toggle */}
          <button
            onClick={onToggleSound}
            aria-label={soundEnabled ? '静音音效' : '开启哥特音效'}
            title={soundEnabled ? '特效音开启（点击静音）' : '特效音静音（点击开启）'}
            className="p-1.5 text-zinc-400 hover:text-rose-300 rounded-lg hover:bg-zinc-800/60 transition-colors cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-rose-400" /> : <VolumeX className="w-4 h-4 text-zinc-500" />}
          </button>

          {/* Primary Action */}
          <a
            href="https://weibo.com/u/8391420579"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => gothicAudio.playClickChime()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-rose-100 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/50 rounded-md transition-all shadow-lg shadow-rose-950/30 whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-rose-400" />
            <span>私信咨询</span>
          </a>
        </div>
      </div>

      {/* Mobile nav drawer strip */}
      <div className="md:hidden flex items-center justify-around px-2 py-2 border-t border-zinc-800/60 bg-[#09090d]">
        {navItems.map((item) => {
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                gothicAudio.playPageTurnSound();
                onPageChange(item.id);
              }}
              className={`px-2 py-1 text-xs whitespace-nowrap transition-colors ${
                isActive ? 'text-rose-400 font-bold border-b border-rose-500' : 'text-zinc-400'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
};
