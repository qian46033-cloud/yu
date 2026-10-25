import React, { useState } from 'react';
import { SERVICE_SECTIONS } from '../data/content';
import { ExternalLink, Check, Copy, ShieldAlert, Sparkles, Image as ImageIcon, ZoomIn, X, FileCode } from 'lucide-react';
import { gothicAudio } from '../utils/audio';
import { GothicImage } from './GothicImage';

export const PageServices: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; title: string } | null>(null);

  const filterTabs = [
    { id: 'all', label: '全部业务' },
    { id: 'management', label: '管理｜团助' },
    { id: 'promotion', label: '代宣' },
    { id: 'pr', label: '公关客诉' },
    { id: 'code', label: '代码代挂' },
    { id: 'planning', label: '策划 & 须知' },
  ];

  const handleCopyLink = (url: string, id: string) => {
    gothicAudio.playClickChime();
    navigator.clipboard.writeText(url);
    setCopiedLink(id);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const openLightbox = (src: string, title: string) => {
    gothicAudio.playClickChime();
    setLightboxImage({ src, title });
  };

  return (
    <div className="relative w-full max-w-6xl mx-auto py-8 px-4 sm:px-6 space-y-10 animate-fadeIn">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="text-rose-500/80 font-cinzel text-xs tracking-widest">
          GRIMOIRE OF CONTRACTS & SERVICES
        </div>
        <h2 className="text-2xl sm:text-4xl font-serif-sc font-bold tracking-wide text-zinc-100 flex items-center justify-center gap-2">
          <span>✧ֺּ𓈒ॱֺּ𓏽♱</span>
          <span>五大业务板块与价格录</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-400 font-serif-sc max-w-2xl mx-auto">
          明码标价 · 契约精神 · 倾力交付。各业务详情与实操规章如下。
        </p>
      </div>

      {/* Segmented Filter Controls */}
      <div className="flex items-center justify-center flex-wrap gap-2 p-1.5 bg-[#0b0b10] border border-zinc-800/80 rounded-xl max-w-2xl mx-auto">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              gothicAudio.playClickChime();
              setActiveFilter(tab.id);
            }}
            className={`px-3 py-1.5 text-xs font-serif-sc rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === tab.id
                ? 'bg-rose-950/80 text-rose-200 border border-rose-800/60 font-semibold shadow-sm'
                : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/40'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Service Blocks */}
      <div className="space-y-12">
        {/* 1. 管理｜团助 */}
        {(activeFilter === 'all' || activeFilter === 'management') && (
          <div className="bg-[#0b0b10] border border-zinc-800/90 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-zinc-800/70 pb-4">
              <div>
                <div className="text-xs font-cinzel text-rose-500 tracking-wider mb-1">SECTION 01</div>
                <h3 className="text-xl md:text-2xl font-bold font-serif-sc text-zinc-100">
                  ✧ֺּ𓈒ॱֺּ𓏽♱ 管理｜团助
                </h3>
              </div>
              <div className="text-xs text-zinc-400 font-serif-sc">
                在职期间 · 毫无保留改进方案
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SERVICE_SECTIONS[0].pricing?.map((p, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between hover:border-rose-900/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-rose-500 font-serif">➟</span>
                      <span className="text-base font-bold text-zinc-100 font-serif-sc">{p.name}</span>
                    </div>
                    <div className="text-2xl font-bold font-cinzel text-rose-300 tabular-nums mb-2">
                      {p.price}
                    </div>
                    <p className="text-xs text-zinc-400 font-serif-sc">{p.note}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Rules & Notes */}
            <div className="p-4 rounded-xl bg-zinc-950/70 border border-zinc-800/70 space-y-2 text-xs font-serif-sc text-zinc-300">
              <div className="text-rose-400 font-bold mb-1">执行与合作共识：</div>
              <ul className="space-y-1.5 list-none">
                {SERVICE_SECTIONS[0].rules?.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-serif">•</span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
              {SERVICE_SECTIONS[0].link && (
                <div className="pt-2 flex items-center gap-3">
                  <a
                    href={SERVICE_SECTIONS[0].link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition-colors text-xs"
                  >
                    <span>{SERVICE_SECTIONS[0].linkText}（微博直达）</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                  <button
                    onClick={() => handleCopyLink(SERVICE_SECTIONS[0].link!, 'mgmt-link')}
                    className="text-zinc-500 hover:text-zinc-300 text-[11px] inline-flex items-center gap-1 cursor-pointer"
                  >
                    {copiedLink === 'mgmt-link' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedLink === 'mgmt-link' ? '已复制' : '复制链接'}</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 2. 代宣 */}
        {(activeFilter === 'all' || activeFilter === 'promotion') && (
          <div className="bg-[#0b0b10] border border-zinc-800/90 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-zinc-800/70 pb-4">
              <div>
                <div className="text-xs font-cinzel text-rose-500 tracking-wider mb-1">SECTION 02</div>
                <h3 className="text-xl md:text-2xl font-bold font-serif-sc text-zinc-100">
                  ✧ֺּ𓈒ॱֺּ𓏽♱ 代宣
                </h3>
              </div>
              <div className="text-xs text-zinc-400 font-serif-sc">
                日宣 · 周宣 · 月宣 · 季宣 · 半年宣
              </div>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICE_SECTIONS[1].packages?.map((pkg, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between hover:border-rose-900/50 transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-bold text-zinc-200 font-serif-sc">{pkg.tier}</span>
                      <span className="text-lg font-bold font-cinzel text-rose-300 tabular-nums">{pkg.price}</span>
                    </div>
                    <div className="text-xs text-zinc-400 font-serif-sc">
                      • {pkg.guarantee}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Terms of Promotion */}
            <div className="p-5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 space-y-3">
              <div className="flex items-center gap-2 text-rose-400 font-serif-sc font-bold text-xs">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>下单默认已读如下须知：</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-1.5 text-xs font-serif-sc text-zinc-400">
                {SERVICE_SECTIONS[1].terms?.map((term, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-serif shrink-0">•</span>
                    <span>{term}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 单贴阅读量与宣发凭据 */}
            <div className="pt-2 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2 text-rose-400 font-serif-sc font-bold text-sm">
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  <span>单贴阅读量实测数据与宣发账号凭证</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-serif-sc">点击图片可放大查阅</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image: Reading volume screenshots */}
                <div
                  onClick={() => openLightbox('./assets/aistudio/1058_eeb136ac.jpeg', '单贴阅读量实测数据（5.8w、5w、3.2w+ 高频曝光）')}
                  className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-rose-800/80 transition-all shadow-lg shadow-black/40"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-black/60 flex items-center justify-center">
                    <GothicImage
                      src="./assets/aistudio/1058_eeb136ac.jpeg"
                      alt="单贴阅读量实测数据"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5">
                    <div>
                      <div className="text-xs font-bold text-zinc-100 font-serif-sc">
                        单贴阅读量如下
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        单贴 1.6w - 5.8w+ 真实阅读数据交付
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/70 text-rose-400 border border-zinc-700/60 group-hover:bg-rose-900 group-hover:text-white transition-colors">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Image: Account homepages */}
                <div
                  onClick={() => openLightbox('./assets/aistudio/1059_c8aad502.jpeg', '主账号 @雨yu鱼- 与副账号 @yu薇vv- 宣发主页展示')}
                  className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-rose-800/80 transition-all shadow-lg shadow-black/40"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-black/60 flex items-center justify-center">
                    <GothicImage
                      src="./assets/aistudio/1059_c8aad502.jpeg"
                      alt="宣发主页与账号展示"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3.5">
                    <div>
                      <div className="text-xs font-bold text-zinc-100 font-serif-sc">
                        宣发账号主页展示
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        @雨yu鱼- & @yu薇vv- 活跃权重与业务声明
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/70 text-rose-400 border border-zinc-700/60 group-hover:bg-rose-900 group-hover:text-white transition-colors">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. 公关客诉 */}
        {(activeFilter === 'all' || activeFilter === 'pr') && (
          <div className="bg-[#0b0b10] border border-zinc-800/90 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-zinc-800/70 pb-4">
              <div>
                <div className="text-xs font-cinzel text-rose-500 tracking-wider mb-1">SECTION 03</div>
                <h3 className="text-xl md:text-2xl font-bold font-serif-sc text-zinc-100">
                  ✧ֺּ𓈒ॱֺּ𓏽♱ 公关客诉
                </h3>
              </div>
              <div className="text-xs text-zinc-400 font-serif-sc">
                单月外聘 · 临时公关 · 客诉咨询
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SERVICE_SECTIONS[2].items?.map((item, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between hover:border-rose-900/50 transition-colors"
                >
                  <div>
                    <div className="text-base font-bold font-serif-sc text-zinc-100 mb-2 flex items-center gap-1.5">
                      <span className="text-rose-500 font-serif">➟</span>
                      <span>{item.name}</span>
                    </div>
                    <div className="text-xl font-bold font-cinzel text-rose-300 tabular-nums mb-3">
                      {item.price}
                    </div>
                    <ul className="text-xs text-zinc-400 font-serif-sc space-y-1">
                      {('details' in item && Array.isArray(item.details) ? item.details : []).map((d: string, i: number) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-rose-500">•</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/60 text-xs text-zinc-400 font-serif-sc flex items-center gap-2">
              <span className="text-rose-400 font-serif">•</span>
              <span>下单默认已读：咨询仅给合理建议不包含上手；单月外聘常驻3月起签，包所有客诉和每月两次代码代挂。</span>
            </div>

            {/* NEW: 第一张图 (1053_f78bd00c.jpeg) 添加于公关客诉板块末尾 */}
            <div className="pt-3 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <div className="flex items-center gap-2 text-rose-400 font-serif-sc font-bold text-xs sm:text-sm">
                  <ImageIcon className="w-4 h-4 text-rose-500" />
                  <span>公关专属 · 个人报价与下单须知凭证</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-serif-sc">点击查看高清原图</span>
              </div>

              <div
                onClick={() => openLightbox('./assets/aistudio/1053_f78bd00c.jpeg', '公关专属 · 个人报价与下单须知明细图')}
                className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 max-w-xl mx-auto cursor-pointer hover:border-rose-800/80 transition-all shadow-xl shadow-black/50"
              >
                <div className="w-full max-h-[500px] overflow-hidden bg-black flex items-center justify-center">
                  <GothicImage
                    src="./assets/aistudio/1053_f78bd00c.jpeg"
                    alt="公关专属 个人报价与下单须知"
                    className="w-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-4 pointer-events-none">
                  <div>
                    <div className="text-sm font-bold text-zinc-100 font-serif-sc">
                      公关客诉明细须知
                    </div>
                    <div className="text-xs text-zinc-400">
                      Scope of business · 公关专属报价、时效与态度守则
                    </div>
                  </div>
                  <div className="p-2 rounded-lg bg-black/80 text-rose-400 border border-zinc-700/60">
                    <ZoomIn className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. 代码代挂 */}
        {(activeFilter === 'all' || activeFilter === 'code') && (
          <div className="bg-[#0b0b10] border border-zinc-800/90 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-zinc-800/70 pb-4">
              <div>
                <div className="text-xs font-cinzel text-rose-500 tracking-wider mb-1">SECTION 04</div>
                <h3 className="text-xl md:text-2xl font-bold font-serif-sc text-zinc-100">
                  ✧ֺּ𓈒ॱֺּ𓏽♱ 代码代挂
                </h3>
              </div>
              <div className="text-xs text-zinc-400 font-serif-sc">
                朋友圈代挂 · 微博代挂 · 专属代码制作
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Code Writing */}
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold font-serif-sc text-zinc-100 flex items-center gap-2">
                    <span className="text-rose-500 font-serif">➟</span>
                    <span>代码制作</span>
                  </div>
                  <div className="text-xl font-bold font-cinzel text-rose-300">20/百字</div>
                </div>

                <ul className="text-xs text-zinc-300 font-serif-sc space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500">•</span>
                    <span>图片5张后 +3r/张</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500">•</span>
                    <span>定金80r（多退少补，反悔不退）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500">•</span>
                    <span>笔记72h内出</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-rose-500">•</span>
                    <span>加急：24h内 +20%起，6h内 +60%起</span>
                  </li>
                </ul>
              </div>

              {/* Hanging / Posting */}
              <div className="p-6 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-4">
                <div className="text-lg font-bold font-serif-sc text-zinc-100 flex items-center gap-2">
                  <span className="text-rose-500 font-serif">➟</span>
                  <span>代挂服务</span>
                </div>

                <div className="space-y-3 text-xs font-serif-sc">
                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70">
                    <div className="text-zinc-200 font-semibold mb-1">朋友圈 (pyq)：</div>
                    <div className="text-rose-300 font-mono">30r/3天 · 65r/7天 · 255/月</div>
                    <div className="text-[11px] text-zinc-400 mt-1">置顶 +10r</div>
                  </div>

                  <div className="p-3 rounded-lg bg-zinc-950/60 border border-zinc-800/70">
                    <div className="text-zinc-200 font-semibold mb-1">微博 (vb)：</div>
                    <div className="text-rose-300 font-mono">35r/贴 · 永挂包车</div>
                    <div className="text-[11px] text-zinc-400 mt-1">置顶 +10r/天</div>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between">
                  {SERVICE_SECTIONS[3].link && (
                    <a
                      href={SERVICE_SECTIONS[3].link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors"
                    >
                      <span>案例直达（微博）</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <span className="text-xs text-zinc-500 font-serif-sc">具体私聊沟通排期</span>
                </div>
              </div>
            </div>

            {/* NEW: 第二张图 (1054_6201a3ed.jpeg) 和第三张图 (1055_630602f3.jpeg) 添加于代码代挂板块末尾 */}
            <div className="pt-4 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800/80 pb-2">
                <div className="flex items-center gap-2 text-rose-400 font-serif-sc font-bold text-xs sm:text-sm">
                  <FileCode className="w-4 h-4 text-rose-500" />
                  <span>代码笔记与代挂案例长卷展示</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-serif-sc">支持点击放大全景浏览</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Image 2 (1054) */}
                <div
                  onClick={() => openLightbox('./assets/aistudio/1054_6201a3ed.jpeg', '代码代挂实操长卷一（排版、证据链条与长图代挂）')}
                  className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-rose-800/80 transition-all shadow-lg shadow-black/40"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
                    <GothicImage
                      src="./assets/aistudio/1054_6201a3ed.jpeg"
                      alt="代码代挂实操长卷一"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
                    <div>
                      <div className="text-xs font-bold text-zinc-100 font-serif-sc">
                        代码代挂案例长卷 · 卷一
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        微信长篇笔记、证据链美化整理与完整发布
                      </div>
                    </div>
                    <div className="p-1.5 rounded-lg bg-black/80 text-rose-400 border border-zinc-700/60">
                      <ZoomIn className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>

                {/* Image 3 (1055) */}
                <div
                  onClick={() => openLightbox('./assets/aistudio/1055_630602f3.jpeg', '代码代挂实操长卷二（事件复盘、公关调解与公开展出）')}
                  className="group relative rounded-xl overflow-hidden border border-zinc-800 bg-zinc-950 cursor-pointer hover:border-rose-800/80 transition-all shadow-lg shadow-black/40"
                >
                  <div className="aspect-[16/9] w-full overflow-hidden bg-black flex items-center justify-center">
                    <GothicImage
                      src="./assets/aistudio/1055_630602f3.jpeg"
                      alt="代码代挂实操长卷二"
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-103"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex items-end justify-between p-3.5">
                    <div>
                      <div className="text-xs font-bold text-zinc-100 font-serif-sc">
                        代码代挂案例长卷 · 卷二
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        结构化公关排版、申辩陈述与图文代挂全景
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
        )}

        {/* 5. 策划 & 须知 */}
        {(activeFilter === 'all' || activeFilter === 'planning') && (
          <div className="bg-[#0b0b10] border border-zinc-800/90 rounded-2xl p-6 md:p-8 space-y-6 relative overflow-hidden">
            <div className="flex items-start justify-between flex-wrap gap-4 border-b border-zinc-800/70 pb-4">
              <div>
                <div className="text-xs font-cinzel text-rose-500 tracking-wider mb-1">SECTION 05</div>
                <h3 className="text-xl md:text-2xl font-bold font-serif-sc text-zinc-100">
                  ✧ֺּ𓈒ॱֺּ𓏽♱ 策划
                </h3>
              </div>
              <div className="text-xs text-zinc-400 font-serif-sc">
                单次策划 · 驻团策划 · 排版美化
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Single Planning */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <div className="text-base font-bold font-serif-sc text-zinc-100 mb-2 flex items-center gap-1.5">
                    <span className="text-rose-500 font-serif">➟</span>
                    <span>单次策划</span>
                  </div>
                  <div className="text-xl font-bold font-cinzel text-rose-300 mb-3">100r起接</div>
                  <ul className="text-xs text-zinc-400 font-serif-sc space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>带预算咨询，非诚勿扰</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>包含全部美化排版和后续修改</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>大型策划单次价可能会超200/300</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Resident Planning */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <div className="text-base font-bold font-serif-sc text-zinc-100 mb-2 flex items-center gap-1.5">
                    <span className="text-rose-500 font-serif">➟</span>
                    <span>驻团策划</span>
                  </div>
                  <div className="text-xl font-bold font-cinzel text-rose-300 mb-3">388/月起</div>
                  <ul className="text-xs text-zinc-400 font-serif-sc space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>每月两次活动上限</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>全流程深度跟进与排版交付</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Beautify Typesetting */}
              <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col justify-between">
                <div>
                  <div className="text-base font-bold font-serif-sc text-zinc-100 mb-2 flex items-center gap-1.5">
                    <span className="text-rose-500 font-serif">➟</span>
                    <span>排版美化</span>
                  </div>
                  <div className="text-xl font-bold font-cinzel text-rose-300 mb-3">50r起</div>
                  <ul className="text-xs text-zinc-400 font-serif-sc space-y-1.5">
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>具体私聊确定框架风格</span>
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="text-rose-500">•</span>
                      <span>
                        案例可查：
                        <a
                          href="https://weibo.com/8391420579/5277946862375480"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-rose-400 hover:underline"
                        >
                          微博直通
                        </a>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Mandatory Notice / Terms */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-[#160a0f] to-[#0a0a0e] border border-rose-900/60 space-y-4">
              <div className="flex items-center gap-2 text-rose-400 font-serif-sc font-bold text-sm">
                <Sparkles className="w-4 h-4 text-rose-500" />
                <span>✧ֺּ𓈒ॱֺּ𓏽♱ 须知｜下单默认已读</span>
              </div>
              <ul className="text-xs font-serif-sc text-zinc-300 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-serif">•</span>
                  <span>驻团策划在驻团解约后禁二改/模仿/抄袭/擦边的，违者赔偿该策划3倍价格</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-serif">•</span>
                  <span>一经付款概不退款</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-serif">•</span>
                  <span>请预算充足，非诚勿扰，不议价</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-serif">•</span>
                  <span>不提供图表，请自行配合约图</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Lightbox Modal for Full View */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl max-h-[92vh] bg-zinc-950 border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
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
