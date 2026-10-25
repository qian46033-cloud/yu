import React, { useState } from 'react';
import { X, Copy, Check, Trash2, Send, Sparkles } from 'lucide-react';
import { gothicAudio } from '../utils/audio';

interface OrderItem {
  name: string;
  price: string;
  category: string;
}

interface GothicOrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: OrderItem[];
  onRemoveItem: (index: number) => void;
  onClearAll: () => void;
}

export const GothicOrderModal: React.FC<GothicOrderModalProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
}) => {
  const [copied, setCopied] = useState(false);
  const [clientNote, setClientNote] = useState('');

  if (!isOpen) return null;

  const handleCopyInquiry = () => {
    gothicAudio.playClickChime();
    const itemList = items.map((it, idx) => `${idx + 1}. 【${it.category}】${it.name} (${it.price})`).join('\n');
    const draft = `【知薇 业务咨询 / 下单预选单】\n预选项目：\n${itemList || '暂无选定具体项目'}\n${
      clientNote ? `我的需求备注：${clientNote}\n` : ''
    }已读须知并诚心咨询，请问有档期吗？`;

    navigator.clipboard.writeText(draft);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0c0c12] border border-rose-900/60 rounded-2xl shadow-2xl shadow-rose-950/40 p-6 space-y-6 text-zinc-100 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2">
            <span className="text-rose-500 font-cinzel">♱</span>
            <h3 className="text-lg font-bold font-serif-sc tracking-wide">
              契约清单 · 业务咨询草稿
            </h3>
          </div>
          <button
            onClick={() => {
              gothicAudio.playClickChime();
              onClose();
            }}
            className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List of items */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {items.length === 0 ? (
            <div className="text-center py-10 space-y-3 text-zinc-500 font-serif-sc">
              <Sparkles className="w-8 h-8 mx-auto text-zinc-600" />
              <p className="text-sm">暂未选入任何业务条目</p>
              <p className="text-xs text-zinc-600">在「业务板块」点击“加入清单”即可在此汇总</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 flex items-center justify-between gap-3 text-xs font-serif-sc"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-zinc-200 truncate">{item.name}</div>
                  <div className="text-rose-400 font-cinzel mt-0.5">{item.price}</div>
                </div>
                <button
                  onClick={() => onRemoveItem(index)}
                  className="p-1.5 text-zinc-500 hover:text-rose-400 rounded transition-colors cursor-pointer"
                  title="移除项目"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}

          {items.length > 0 && (
            <div className="pt-2">
              <label className="block text-xs text-zinc-400 font-serif-sc mb-1.5">
                附加需求留言（可选）：
              </label>
              <input
                type="text"
                placeholder="例如：需要周宣+排版美化，预估预算200左右..."
                value={clientNote}
                onChange={(e) => setClientNote(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-rose-700"
              />
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-zinc-800 flex items-center justify-between gap-3 flex-wrap">
          {items.length > 0 ? (
            <>
              <button
                onClick={onClearAll}
                className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors cursor-pointer"
              >
                清空全部
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyInquiry}
                  className="flex items-center gap-2 px-4 py-2 text-xs font-medium text-rose-100 bg-rose-950 hover:bg-rose-900 border border-rose-800/70 rounded-lg transition-colors cursor-pointer"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? '草稿已复制！' : '一键复制私聊发单草稿'}</span>
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={onClose}
              className="w-full py-2 text-xs text-zinc-300 bg-zinc-900 hover:bg-zinc-800 rounded-lg transition-colors cursor-pointer"
            >
              返回浏览业务
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
