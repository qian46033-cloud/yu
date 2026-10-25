import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PageId } from './types';
import { GothicHeader } from './components/GothicHeader';
import { PageProfile } from './components/PageProfile';
import { PageWeibo } from './components/PageWeibo';
import { PageServices } from './components/PageServices';
import { PageOperations } from './components/PageOperations';
import { GothicClickEffect } from './components/GothicClickEffect';
import { GothicAmbiance } from './components/GothicAmbiance';
import { GothicMusicPlayer } from './components/GothicMusicPlayer';
import { gothicAudio } from './utils/audio';
import { ChevronLeft, ChevronRight, BookOpen, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const PAGE_ORDER: PageId[] = ['profile', 'weibo', 'services', 'operations'];
const PAGE_TITLES: Record<PageId, { numeral: string; title: string }> = {
  profile: { numeral: 'I', title: '个人信息 · 档案' },
  weibo: { numeral: 'II', title: '微博直通 · 通道' },
  services: { numeral: 'III', title: '业务板块 · 契约录' },
  operations: { numeral: 'IV', title: '运营详情 · 白皮书' },
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('profile');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [viewMode, setViewMode] = useState<'flip' | 'scroll'>('flip');
  const [pageDirection, setPageDirection] = useState<'forward' | 'backward'>('forward');
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const currentIndex = PAGE_ORDER.indexOf(currentPage);
  const [showAudioPrompt, setShowAudioPrompt] = useState<boolean>(false);

  // Auto-play music on entry with WeChat JSBridge support and multi-gesture fallback
  useEffect(() => {
    let played = false;

    const startPlayback = async () => {
      if (played || !audioRef.current) return;
      try {
        audioRef.current.volume = 0.55;
        await audioRef.current.play();
        setIsMusicPlaying(true);
        setShowAudioPrompt(false);
        played = true;
      } catch {
        // Autoplay blocked by browser policy without user gesture
        setIsMusicPlaying(false);
        setShowAudioPrompt(true);
      }
    };

    // Attempt direct play
    startPlayback();

    // WeChat In-App Browser JSBridge hook (crucial for users in China / WeChat)
    const handleWechatReady = () => {
      startPlayback();
    };
    if (typeof (window as unknown as { WeixinJSBridge?: unknown }).WeixinJSBridge === 'object') {
      startPlayback();
    } else {
      document.addEventListener('WeixinJSBridgeReady', handleWechatReady, false);
    }

    // Touch & pointer interaction fallback across the entire window
    const handleAnyGesture = () => {
      startPlayback();
      cleanupListeners();
    };

    const cleanupListeners = () => {
      window.removeEventListener('pointerdown', handleAnyGesture);
      window.removeEventListener('touchstart', handleAnyGesture);
      window.removeEventListener('click', handleAnyGesture);
      window.removeEventListener('keydown', handleAnyGesture);
      document.removeEventListener('WeixinJSBridgeReady', handleWechatReady);
    };

    window.addEventListener('pointerdown', handleAnyGesture, { passive: true });
    window.addEventListener('touchstart', handleAnyGesture, { passive: true });
    window.addEventListener('click', handleAnyGesture, { passive: true });
    window.addEventListener('keydown', handleAnyGesture, { passive: true });

    return () => {
      cleanupListeners();
    };
  }, []);

  const handleToggleMusic = () => {
    if (audioRef.current) {
      if (isMusicPlaying) {
        audioRef.current.pause();
        setIsMusicPlaying(false);
      } else {
        audioRef.current.volume = 0.55;
        audioRef.current.play().then(() => {
          setIsMusicPlaying(true);
          setShowAudioPrompt(false);
        }).catch(() => {});
      }
    }
  };

  const goToNextPage = useCallback(() => {
    if (currentIndex < PAGE_ORDER.length - 1) {
      setPageDirection('forward');
      gothicAudio.playPageTurnSound();
      setCurrentPage(PAGE_ORDER[currentIndex + 1]);
    }
  }, [currentIndex]);

  const goToPrevPage = useCallback(() => {
    if (currentIndex > 0) {
      setPageDirection('backward');
      gothicAudio.playPageTurnSound();
      setCurrentPage(PAGE_ORDER[currentIndex - 1]);
    }
  }, [currentIndex]);

  // Keyboard navigation for flipping pages
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        goToNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        goToPrevPage();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToNextPage, goToPrevPage]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    gothicAudio.setSoundEnabled(next);
    if (next) gothicAudio.playClickChime();
  };

  const handleNavigatePage = (page: PageId) => {
    const newIdx = PAGE_ORDER.indexOf(page);
    setPageDirection(newIdx >= currentIndex ? 'forward' : 'backward');
    setCurrentPage(page);
    if (viewMode === 'scroll') {
      const el = document.getElementById(`section-${page}`);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-zinc-100 flex flex-col justify-between selection:bg-rose-950 selection:text-rose-200">
      {/* Gothic Click Particle Ripple Effect */}
      <GothicClickEffect />

      {/* Gothic Ambient Floating Petals and Corner Metalwork */}
      <GothicAmbiance />

      {/* Atmospheric Gothic Cathedral Background with Vignette */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <img
          src="./assets/images/gothic_cathedral_vault_1792856126976.jpg"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-20 filter blur-[2px] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#070709]/95 via-[#070709]/85 to-[#070709]" />
        <div className="absolute inset-0 bg-vignette opacity-95" />
      </div>

      {/* Top Bar Header */}
      <div className="relative z-30">
        <GothicHeader
          currentPage={currentPage}
          onPageChange={handleNavigatePage}
          soundEnabled={soundEnabled}
          onToggleSound={handleToggleSound}
          isMusicPlaying={isMusicPlaying}
          onToggleMusic={handleToggleMusic}
        />
      </div>

      {/* Page Content Container */}
      <main className="relative z-10 flex-1 flex flex-col justify-center max-w-7xl w-full mx-auto px-2 sm:px-4 py-6">
        {/* View Mode & Chapter Bar with Gothic Runes */}
        <div className="flex items-center justify-between px-4 mb-4 text-xs font-serif-sc text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="text-rose-500 font-cinzel text-sm animate-pulse">♱</span>
            <span className="font-bold text-zinc-200 tracking-wide">
              第 {PAGE_TITLES[currentPage].numeral} 卷 · {PAGE_TITLES[currentPage].title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* View Mode Switcher */}
            <button
              onClick={() => {
                gothicAudio.playClickChime();
                setViewMode(viewMode === 'flip' ? 'scroll' : 'flip');
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-zinc-400 hover:text-rose-300 bg-zinc-900/80 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
              title={viewMode === 'flip' ? '切换为单页平铺浏览' : '切换为哥特翻书模式'}
            >
              {viewMode === 'flip' ? (
                <>
                  <Layers className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">切换单页流</span>
                </>
              ) : (
                <>
                  <BookOpen className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">切换翻书模式</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Dynamic Display based on Mode */}
        {viewMode === 'flip' ? (
          <div className="relative min-h-[560px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={pageDirection}>
              <motion.div
                key={currentPage}
                custom={pageDirection}
                initial={{
                  opacity: 0,
                  rotateY: pageDirection === 'forward' ? 25 : -25,
                  scale: 0.97,
                  filter: 'blur(4px)',
                }}
                animate={{
                  opacity: 1,
                  rotateY: 0,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  rotateY: pageDirection === 'forward' ? -25 : 25,
                  scale: 0.97,
                  filter: 'blur(4px)',
                }}
                transition={{
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="w-full"
              >
                {currentPage === 'profile' && <PageProfile onNavigate={handleNavigatePage} />}
                {currentPage === 'weibo' && <PageWeibo />}
                {currentPage === 'services' && <PageServices />}
                {currentPage === 'operations' && <PageOperations />}
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* Continuous Scroll View */
          <div className="space-y-16">
            <section id="section-profile">
              <PageProfile onNavigate={handleNavigatePage} />
            </section>
            <div className="gothic-divider my-10">✧ֺּ𓈒ॱֺּ𓏽♱</div>
            <section id="section-weibo">
              <PageWeibo />
            </section>
            <div className="gothic-divider my-10">✧ֺּ𓈒ॱֺּ𓏽♱</div>
            <section id="section-services">
              <PageServices />
            </section>
            <div className="gothic-divider my-10">✧ֺּ𓈒ॱֺּ𓏽♱</div>
            <section id="section-operations">
              <PageOperations />
            </section>
          </div>
        )}

        {/* Gothic Book-Flip Controls (when in flip mode) */}
        {viewMode === 'flip' && (
          <div className="mt-8 flex items-center justify-between px-4 py-3 bg-[#0a0a0f]/85 border border-rose-950/40 rounded-2xl max-w-xl mx-auto backdrop-blur-md shadow-xl">
            <button
              onClick={goToPrevPage}
              disabled={currentIndex === 0}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-serif-sc rounded-xl transition-all cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-30 cursor-not-allowed text-zinc-600'
                  : 'hover:bg-zinc-800/80 text-zinc-300 hover:text-rose-200'
              }`}
            >
              <ChevronLeft className="w-4 h-4 text-rose-500" />
              <span>上一章</span>
            </button>

            {/* Step Cross Indicator */}
            <div className="flex items-center gap-2.5">
              {PAGE_ORDER.map((pid) => (
                <button
                  key={pid}
                  onClick={() => handleNavigatePage(pid)}
                  title={PAGE_TITLES[pid].title}
                  className={`p-1.5 text-xs font-cinzel rounded-md transition-all cursor-pointer ${
                    currentPage === pid
                      ? 'text-rose-400 font-bold scale-125'
                      : 'text-zinc-600 hover:text-zinc-400'
                  }`}
                >
                  {currentPage === pid ? '♱' : '✦'}
                </button>
              ))}
            </div>

            <button
              onClick={goToNextPage}
              disabled={currentIndex === PAGE_ORDER.length - 1}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-serif-sc rounded-xl transition-all cursor-pointer ${
                currentIndex === PAGE_ORDER.length - 1
                  ? 'opacity-30 cursor-not-allowed text-zinc-600'
                  : 'hover:bg-zinc-800/80 text-zinc-300 hover:text-rose-200'
              }`}
            >
              <span>下一章</span>
              <ChevronRight className="w-4 h-4 text-rose-500" />
            </button>
          </div>
        )}
      </main>

      {/* Floating Gothic Music Player Widget */}
      <GothicMusicPlayer
        isPlaying={isMusicPlaying}
        onTogglePlay={handleToggleMusic}
        audioRef={audioRef}
        showPrompt={showAudioPrompt}
      />

      {/* Gothic Clean Footer */}
      <footer className="relative z-10 border-t border-rose-950/40 bg-[#050508] py-8 px-4 text-center space-y-3">
        <div className="flex items-center justify-center gap-2 text-rose-500/80 text-xs font-cinzel">
          <span>✧ֺּ𓈒ॱֺּ𓏽♱</span>
          <span>yu ｜ 知薇 · 执笔书夜 · 敬畏契约</span>
          <span>♱𓏽ॱֺּ𓈒✧</span>
        </div>
        <p className="text-xs text-zinc-500 font-serif-sc">
          全站支持键盘 ← / → 翻页 · 点击画面触发哥特特效 · 背景原声：希先森《Intro(Max)》
        </p>
      </footer>
    </div>
  );
}
