import React, { useState } from 'react';
import { WEIBO_ACCOUNTS } from '../data/content';
import { ExternalLink, Copy, Check, QrCode, Sparkles, AlertCircle } from 'lucide-react';
import { gothicAudio } from '../utils/audio';

export const PageWeibo: React.FC = () => {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [qrAccount, setQrAccount] = useState<string | null>(null);

  const handleCopy = (id: string, text: string) => {
    gothicAudio.playClickChime();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Title Section */}
      <div className="text-center space-y-2">
        <div className="text-rose-500/80 font-cinzel text-xs tracking-widest">
          PORTAL OF SHADOWS & CONNECTIONS
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-sc font-bold tracking-wide text-zinc-100 flex items-center justify-center gap-2">
          <span>✧ֺּ𓈒ॱֺּ𓏽♱</span>
          <span>微博直通</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-serif-sc max-w-lg mx-auto">
          全矩阵账号与即时业务通道，支持一键直达、复制链接与扫码访问
        </p>
      </div>

      {/* Grid of Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {WEIBO_ACCOUNTS.map((acc) => {
          const isCopied = copiedId === acc.id;
          const isIncubating = acc.status === 'incubating';

          return (
            <div
              key={acc.id}
              className={`relative rounded-2xl border p-6 transition-all duration-300 flex flex-col justify-between ${
                acc.status === 'business'
                  ? 'bg-gradient-to-b from-[#160b12] to-[#0c0a0e] border-rose-900/60 shadow-lg shadow-rose-950/20'
                  : 'bg-[#0d0d12] border-zinc-800/80 hover:border-zinc-700'
              }`}
            >
              {/* Top Row: Handle & Status */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-rose-500 font-serif">➵</span>
                    <h3 className="text-xl font-bold font-serif-sc text-zinc-100 tracking-wide">
                      {acc.handle}
                    </h3>
                  </div>

                  {/* Clean unboxed status text */}
                  <div className="text-xs font-serif-sc">
                    {isIncubating ? (
                      <span className="text-amber-400/90 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>养号中</span>
                      </span>
                    ) : acc.status === 'business' ? (
                      <span className="text-rose-400 font-bold flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>业务xyt直达</span>
                      </span>
                    ) : (
                      <span className="text-zinc-400">公开常驻</span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-zinc-400 font-serif-sc leading-relaxed mb-6">
                  {acc.description}
                </p>
              </div>

              {/* Bottom Actions */}
              <div className="pt-4 border-t border-zinc-800/60 flex items-center justify-between gap-3 flex-wrap">
                {acc.url ? (
                  <>
                    <a
                      href={acc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => gothicAudio.playClickChime()}
                      className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-rose-100 bg-rose-950/70 hover:bg-rose-900 border border-rose-800/40 rounded-lg transition-colors cursor-pointer"
                    >
                      <span>直通访问</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleCopy(acc.id, acc.url!)}
                        className="inline-flex items-center gap-1 px-3 py-2 text-xs text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                      >
                        {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
                        <span>{isCopied ? '已复制' : '复制链接'}</span>
                      </button>

                      <button
                        onClick={() => {
                          gothicAudio.playClickChime();
                          setQrAccount(qrAccount === acc.id ? null : acc.id);
                        }}
                        aria-label="查看二维码"
                        title="查看二维码"
                        className="p-2 text-zinc-400 hover:text-rose-300 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <QrCode className="w-4 h-4" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full flex items-center justify-between py-1 text-xs text-zinc-500 font-serif-sc">
                    <span>状态：暂未开放对外直达</span>
                    <button
                      onClick={() => handleCopy(acc.id, acc.handle)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-900 border border-zinc-800 rounded-lg transition-colors cursor-pointer"
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>复制名称</span>
                    </button>
                  </div>
                )}
              </div>

              {/* QR Code expansion */}
              {qrAccount === acc.id && acc.url && (
                <div className="mt-4 p-4 rounded-xl bg-zinc-950 border border-zinc-800 text-center space-y-2 animate-fadeIn">
                  <div className="text-xs text-zinc-400">使用微博或微信扫描二维码：</div>
                  <div className="p-2 bg-white rounded-lg inline-block shadow-md">
                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(
                        acc.url
                      )}`}
                      alt={`二维码 - ${acc.handle}`}
                      className="w-32 h-32 block"
                    />
                  </div>
                  <div className="text-[11px] text-zinc-500 break-all">{acc.url}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Advice Strip */}
      <div className="text-center py-4 border-t border-zinc-900 text-xs text-zinc-500 font-serif-sc">
        ✦ 私信若未能及时回复，可同时在多个直通通道留言，并注明来意与预算 ✦
      </div>
    </div>
  );
};
