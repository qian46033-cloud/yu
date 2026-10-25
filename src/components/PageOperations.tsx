import React, { useState } from 'react';
import { OPERATIONS_DOC } from '../data/content';
import { ExternalLink, Copy, Check, FileSpreadsheet, Sparkles, BookOpen, Image as ImageIcon, ZoomIn, X } from 'lucide-react';
import { gothicAudio } from '../utils/audio';
import { GothicImage } from './GothicImage';

export const PageOperations: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const handleCopy = () => {
    gothicAudio.playClickChime();
    navigator.clipboard.writeText(OPERATIONS_DOC.url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openLightbox = (src: string, title: string) => {
    gothicAudio.playClickChime();
    setLightboxImage({ src, title });
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Title */}
      <div className="text-center space-y-2">
        <div className="text-rose-500/80 font-cinzel text-xs tracking-widest">
          CHRONICLES OF OPERATIONS & LOGIC
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-sc font-bold tracking-wide text-zinc-100 flex items-center justify-center gap-2">
          <span>✧ֺּ𓈒ॱֺּ𓏽♱</span>
          <span>运营详情</span>
        </h2>
        <p className="text-sm text-rose-400 font-serif-sc italic tracking-wide">
          {OPERATIONS_DOC.caseName}
        </p>
      </div>

      {/* Main Feature Showcase Card */}
      <div className="bg-[#0b0b10] border border-zinc-800/90 rounded-2xl p-6 sm:p-10 space-y-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-rose-950/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-800/80">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-serif-sc text-rose-400">
              <FileSpreadsheet className="w-4 h-4 text-rose-500" />
              <span>金山文档 · 在线白皮书沉淀库</span>
            </div>
            <h3 className="text-2xl font-bold font-serif-sc text-zinc-100">
              {OPERATIONS_DOC.caseName}
            </h3>
            <p className="text-xs sm:text-sm text-zinc-400 font-serif-sc max-w-xl">
              {OPERATIONS_DOC.summary}
            </p>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-3 shrink-0 flex-wrap">
            <a
              href={OPERATIONS_DOC.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => gothicAudio.playClickChime()}
              className="flex items-center gap-2 px-5 py-2.5 text-xs font-medium text-rose-100 bg-rose-950 hover:bg-rose-900 border border-rose-800/70 rounded-lg transition-all shadow-lg shadow-rose-950/30 cursor-pointer"
            >
              <span>查阅金山文档</span>
              <ExternalLink className="w-4 h-4 text-rose-300" />
            </a>

            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-4 py-2.5 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
              <span>{copied ? '链接已复制' : '复制文档链接'}</span>
            </button>
          </div>
        </div>

        {/* Architectural Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {OPERATIONS_DOC.features.map((feat, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80 hover:border-rose-900/40 transition-colors flex items-center gap-3.5"
            >
              <div className="w-8 h-8 rounded-lg bg-zinc-800/70 border border-zinc-700/60 flex items-center justify-center shrink-0">
                <span className="font-cinzel text-xs text-rose-400">0{idx + 1}</span>
              </div>
              <div className="text-xs sm:text-sm font-serif-sc text-zinc-200">{feat}</div>
            </div>
          ))}
        </div>

        {/* Document Frame / Reader Preview Banner */}
        <div className="p-6 rounded-xl bg-zinc-950/90 border border-zinc-800/80 space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs text-zinc-400 font-serif-sc">
            <span className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-rose-400" />
              <span>文档直达地址：</span>
              <span className="text-zinc-300 font-mono underline break-all">{OPERATIONS_DOC.url}</span>
            </span>
            <span className="text-[11px] text-zinc-500">KDocs Cloud Secure Link</span>
          </div>

          <div className="p-4 rounded-lg bg-zinc-900/40 border border-zinc-800/60 text-xs font-serif-sc text-zinc-400 leading-relaxed">
            <span className="text-rose-400 font-semibold">导读提示：</span>
            本篇【眼泪是反重力的海】运营白皮书深度记录了从0到1架构团队助航、风控预防、客诉应对的完整经验沉淀。如遇权限申请或手机端排版适配，请直接点击上方「查阅金山文档」在金山文档APP或浏览器内全屏浏览。
          </div>
        </div>

        {/* NEW: 第四张图 (1056_426303a7.jpeg) 和 第五张图 (1057_6278ecca.jpeg) 添加于运营详情末尾 */}
        <div className="pt-4 space-y-4">
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
            <div className="flex items-center gap-2 text-rose-400 font-serif-sc font-bold text-xs sm:text-sm">
              <ImageIcon className="w-4 h-4 text-rose-500" />
              <span>圈消10w+ / 运营流水转账收款真实凭证</span>
            </div>
            <span className="text-[11px] text-zinc-500 font-serif-sc">点击图片可放大查看</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image 4 (1056) */}
            <div
              onClick={() => openLightbox('./assets/aistudio/1056_426303a7.jpeg', '圈内运营流水与固板收款交易实录（8888r、13140r、1500r+ 等）')}
              className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-rose-800/80 transition-all shadow-lg shadow-black/40"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black flex items-center justify-center">
                <GothicImage
                  src="./assets/aistudio/1056_426303a7.jpeg"
                  alt="运营流水收款凭证一"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
                <div>
                  <div className="text-xs font-bold text-zinc-100 font-serif-sc">
                    运营收款流水凭证 · 卷一
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    大额结算、定金与多笔高频业务流水实录
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-black/80 text-rose-400 border border-zinc-700/60">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>

            {/* Image 5 (1057) */}
            <div
              onClick={() => openLightbox('./assets/aistudio/1057_6278ecca.jpeg', '圈内运营流水与固板收款交易实录（2888r、2000r、1500r+ 等）')}
              className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-rose-800/80 transition-all shadow-lg shadow-black/40"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-black flex items-center justify-center">
                <GothicImage
                  src="./assets/aistudio/1057_6278ecca.jpeg"
                  alt="运营流水收款凭证二"
                  className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
                <div>
                  <div className="text-xs font-bold text-zinc-100 font-serif-sc">
                    运营收款流水凭证 · 卷二
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    团务驻留、代码代挂与策划收益真实到账明细
                  </div>
                </div>
                <div className="p-1.5 rounded-lg bg-black/80 text-rose-400 border border-zinc-700/60">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal for Operations Images */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
              <div className="text-sm font-bold font-serif-sc text-zinc-200">
                {lightboxImage.title}
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="overflow-auto max-h-[calc(92vh-65px)] flex items-center justify-center p-3 bg-black">
              <GothicImage
                src={lightboxImage.src}
                alt={lightboxImage.title}
                className="max-w-full max-h-[82vh] object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
