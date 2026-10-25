import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Disc, ExternalLink, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { gothicAudio } from '../utils/audio';

interface GothicMusicPlayerProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  audioRef: React.RefObject<HTMLAudioElement | null>;
  showPrompt?: boolean;
}

export const GothicMusicPlayer: React.FC<GothicMusicPlayerProps> = ({
  isPlaying,
  onTogglePlay,
  audioRef,
  showPrompt = false,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState('00:00');
  const [duration, setDuration] = useState('00:00');

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const cur = audioRef.current.currentTime;
      const dur = audioRef.current.duration;
      if (dur > 0) {
        setProgress((cur / dur) * 100);
        setCurrentTime(formatTime(cur));
        setDuration(formatTime(dur));
      }
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && audioRef.current.duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const newTime = (clickX / width) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-5 sm:left-5 z-40 select-none">
      <audio
        ref={audioRef}
        src="./audio/intro_max.mp3"
        preload="auto"
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
      />

      {/* Floating Prompt Toast if autoplay was blocked by mobile browser */}
      {showPrompt && !isPlaying && !isExpanded && (
        <div
          onClick={() => {
            gothicAudio.playClickChime();
            onTogglePlay();
          }}
          className="absolute -top-11 left-0 whitespace-nowrap bg-gradient-to-r from-rose-950/90 to-zinc-950/90 border border-rose-600/80 text-rose-200 text-[11px] font-serif-sc px-3 py-1.5 rounded-full shadow-lg shadow-rose-950/50 backdrop-blur-md flex items-center gap-1.5 cursor-pointer animate-bounce hover:scale-105 transition-transform"
        >
          <span className="text-rose-400 font-cinzel">♱</span>
          <span>点击开启《Intro(Max)》背景原声</span>
        </div>
      )}

      {/* Expanded Widget */}
      {isExpanded ? (
        <div className="bg-[#0b0b12]/95 border border-rose-900/80 backdrop-blur-xl rounded-2xl p-4 shadow-2xl shadow-black/80 w-72 sm:w-80 space-y-3.5 gothic-border animate-fadeIn">
          {/* Top Bar: Song Info & Close */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Spinning Vinyl */}
              <div
                className={`relative w-9 h-9 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-950 border border-zinc-700/80 flex items-center justify-center shadow-md ${
                  isPlaying ? 'animate-spin' : ''
                }`}
                style={{ animationDuration: '6s' }}
              >
                <div className="w-3 h-3 rounded-full bg-rose-950 border border-rose-600/70 flex items-center justify-center">
                  <span className="text-[7px] text-rose-300 font-cinzel">♱</span>
                </div>
              </div>

              <div>
                <div className="text-xs font-bold text-zinc-100 font-serif-sc flex items-center gap-1.5">
                  <span className="text-rose-500 font-cinzel">♱</span>
                  <span>Intro(Max)</span>
                </div>
                <div className="text-[11px] text-zinc-400 font-serif-sc">
                  希先森 · 哥特原声
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href="https://163cn.tv/bjqwxjTX"
                target="_blank"
                rel="noopener noreferrer"
                title="在网易云音乐打开"
                className="p-1.5 text-zinc-400 hover:text-rose-300 rounded-lg hover:bg-zinc-800/60 transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-xs text-zinc-500 hover:text-zinc-300 px-1.5 py-0.5 rounded cursor-pointer"
              >
                收起
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1">
            <div
              onClick={handleSeek}
              className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden cursor-pointer relative group"
            >
              <div
                className="h-full bg-gradient-to-r from-rose-800 to-rose-500 transition-all duration-100 relative"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500 font-mono">
              <span>{currentTime}</span>
              <span>{duration}</span>
            </div>
          </div>

          {/* Play Controls */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-1 text-[11px] text-zinc-400 font-serif-sc">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
              <span>{isPlaying ? '正在播放' : '已暂停'}</span>
            </div>

            <button
              onClick={() => {
                gothicAudio.playClickChime();
                onTogglePlay();
              }}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-rose-100 bg-rose-950/90 hover:bg-rose-900 border border-rose-800/80 rounded-full transition-all shadow-lg shadow-rose-950/40 cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-rose-300" />
                  <span>暂停播放</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-rose-300 fill-rose-300" />
                  <span>继续播放</span>
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        /* Collapsed Floating Vinyl Badge */
        <div
          onClick={() => setIsExpanded(true)}
          className="group relative flex items-center gap-2.5 p-2 bg-[#09090e]/90 hover:bg-[#0f0f18] border border-rose-900/60 rounded-full shadow-2xl backdrop-blur-md cursor-pointer transition-all duration-300 hover:scale-105"
        >
          {/* Vinyl Disc Icon */}
          <div
            className={`relative w-8 h-8 rounded-full bg-gradient-to-tr from-zinc-900 via-zinc-800 to-zinc-950 border border-zinc-700/70 flex items-center justify-center ${
              isPlaying ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '6s' }}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-rose-950 border border-rose-500/80 flex items-center justify-center">
              <span className="text-[6px] text-rose-300">♱</span>
            </div>
          </div>

          {/* Song text preview */}
          <div className="flex flex-col pr-1 sm:pr-2">
            <span className="text-[10px] sm:text-[11px] font-bold text-zinc-200 font-serif-sc tracking-wide leading-tight">
              {isPlaying ? '希先森 · Intro(Max)' : '点击播放《Intro(Max)》'}
            </span>
            <span className="text-[8px] sm:text-[9px] text-rose-400/90 font-serif-sc flex items-center gap-1">
              <span>{isPlaying ? '正在播放' : '点此启播原声'}</span>
              <span className="hidden sm:inline">· 点击展开</span>
            </span>
          </div>

          {/* Quick toggle button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              gothicAudio.playClickChime();
              onTogglePlay();
            }}
            className="w-7 h-7 rounded-full bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 flex items-center justify-center text-rose-200 transition-colors cursor-pointer mr-0.5"
            title={isPlaying ? '暂停' : '播放'}
          >
            {isPlaying ? (
              <Pause className="w-3.5 h-3.5 text-rose-300" />
            ) : (
              <Play className="w-3.5 h-3.5 text-rose-300 fill-rose-300 ml-0.5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
};
