import React, { useState } from 'react';
import { PERSONAL_INFO } from '../data/content';
import { PageId } from '../types';
import { ExternalLink, Copy, Check, ArrowRight, ShieldCheck, HeartHandshake, Compass, ScrollText, ZoomIn, X } from 'lucide-react';
import { gothicAudio } from '../utils/audio';

interface PageProfileProps {
  onNavigate: (page: PageId) => void;
}

export const PageProfile: React.FC<PageProfileProps> = ({ onNavigate }) => {
  const [copiedResume, setCopiedResume] = useState(false);
  const [showLightbox, setShowLightbox] = useState(false);

  const handleCopyResume = () => {
    gothicAudio.playClickChime();
    navigator.clipboard.writeText(PERSONAL_INFO.resumeUrl);
    setCopiedResume(true);
    setTimeout(() => setCopiedResume(false), 2000);
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Gothic Heraldic Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 text-rose-500/80 font-cinzel text-xs tracking-widest">
          <span>✧ֺּ𓈒ॱֺּ𓏽♱</span>
          <span>GOTHIC DOSSIER & PROFILE</span>
          <span>♱𓏽ॱֺּ𓈒✧</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-cinzel font-bold tracking-wider text-zinc-100">
          yu ｜ 知薇
        </h1>
        {/* Unboxed metadata with typographic separators */}
        <div className="flex items-center justify-center flex-wrap gap-2 text-sm text-zinc-400 font-serif-sc">
          <span className="text-rose-400 font-medium">圈龄 {PERSONAL_INFO.circleAge}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>{PERSONAL_INFO.zodiac}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="uppercase tracking-wider text-zinc-300 font-cinzel">{PERSONAL_INFO.mbti}</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span className="italic text-zinc-400">“{PERSONAL_INFO.motto}”</span>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Left Column: Portrait Frame with Image 6 (1060_f7341007.jpeg) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div
            onClick={() => {
              gothicAudio.playClickChime();
              setShowLightbox(true);
            }}
            className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden gothic-border bg-zinc-950 p-2 shadow-2xl shadow-rose-950/20 group cursor-pointer"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden border border-zinc-800 bg-black">
              <img
                src="./assets/aistudio/1060_f7341007.jpeg"
                alt="yu｜知薇 门牌工作证"
                className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none" />
              
              {/* Bottom Tag within portrait */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-zinc-300 pointer-events-auto">
                <span className="font-cinzel tracking-widest text-rose-300 text-sm">ARCHIVE № 001</span>
                <span className="flex items-center gap-1 text-zinc-400 font-serif-sc text-xs tracking-wider group-hover:text-rose-300 transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>点击查看大图</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Mentors, Metrics & Resume Link */}
        <div className="lg:col-span-7 flex flex-col justify-between space-y-5">
          {/* Mentors Card */}
          <div className="bg-[#0b0b10] border border-zinc-800/80 rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-rose-950/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 mb-4 text-rose-400 font-cinzel text-xs tracking-wider">
              <HeartHandshake className="w-4 h-4" />
              <span>传承师承 · MENTORS & LINEAGE</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PERSONAL_INFO.mentors.map((mentor, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-rose-900/60 transition-colors"
                >
                  <div className="text-xs text-zinc-400 mb-1">{mentor.role}</div>
                  <div className="text-lg font-bold text-zinc-100 font-serif-sc mb-1 flex items-center gap-1.5">
                    <span className="text-rose-500 font-cinzel">♱</span>
                    <span>{mentor.name}</span>
                  </div>
                  <div className="text-xs text-zinc-400">{mentor.note}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Metrics & Resources Bar */}
          <div className="bg-[#0b0b10] border border-zinc-800/80 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-cinzel text-xs tracking-wider">
              <ShieldCheck className="w-4 h-4" />
              <span>沉淀资历与圈内规模 · METRICS & REACH</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {PERSONAL_INFO.stats.map((stat, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-zinc-900/50 border border-zinc-800/70 text-center">
                  <div className="text-xs text-zinc-400 mb-1">{stat.label}</div>
                  <div className="text-2xl font-bold font-cinzel text-rose-200 tabular-nums">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">{stat.desc}</div>
                </div>
              ))}
            </div>
          </div>

          {/* 履历详情可见 Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-rose-950/50 via-[#0d0d14] to-zinc-950 border border-rose-900/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-rose-950/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-950/80 border border-rose-800/60 flex items-center justify-center shrink-0">
                <ScrollText className="w-5 h-5 text-rose-400" />
              </div>
              <div className="space-y-0.5 text-center sm:text-left">
                <div className="text-sm font-bold font-serif-sc text-zinc-100 flex items-center justify-center sm:justify-start gap-1.5">
                  <span className="text-rose-500 font-serif">➵</span>
                  <span>履历详情可见</span>
                </div>
                <div className="text-xs text-zinc-400 font-serif-sc">
                  微博官方发布 · 历年合作成果与详尽背书履历
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => gothicAudio.playClickChime()}
                className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-rose-100 bg-rose-900/90 hover:bg-rose-800 border border-rose-700/60 rounded-lg transition-colors cursor-pointer"
              >
                <span>直达微博查阅</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <button
                onClick={handleCopyResume}
                className="flex items-center gap-1 px-3 py-2 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
              >
                {copiedResume ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                <span>{copiedResume ? '已复制' : '复制链接'}</span>
              </button>
            </div>
          </div>

          {/* Direct navigation guide banner */}
          <div className="p-4 rounded-xl bg-zinc-900/70 border border-zinc-800/70 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs sm:text-sm text-zinc-300 font-serif-sc text-center sm:text-left">
              <span className="text-rose-400 font-medium">示例与落地案例：</span>
              <span>{PERSONAL_INFO.footerNote}</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  gothicAudio.playPageTurnSound();
                  onNavigate('services');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-200 bg-zinc-800 hover:bg-zinc-700 rounded transition-colors cursor-pointer"
              >
                <span>管理与业务</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  gothicAudio.playPageTurnSound();
                  onNavigate('operations');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-rose-200 bg-rose-900/80 hover:bg-rose-800 rounded transition-colors cursor-pointer"
              >
                <Compass className="w-3.5 h-3.5" />
                <span>运营白皮书</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Page 1 Image */}
      {showLightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setShowLightbox(false)}
        >
          <div
            className="relative max-w-2xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="text-sm font-bold font-serif-sc text-zinc-200">
                yu ｜ 知薇 · 个人门牌卡
              </div>
              <button
                onClick={() => setShowLightbox(false)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(92vh-65px)] flex items-center justify-center p-3 bg-black">
              <img
                src="./assets/aistudio/1060_f7341007.jpeg"
                alt="yu ｜ 知薇 个人门牌卡"
                className="max-w-full max-h-[82vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
