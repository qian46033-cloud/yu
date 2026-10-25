import React, { useState } from 'react';
import { ImageOff, RefreshCw } from 'lucide-react';

interface GothicImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  fallbackText?: string;
}

export const GothicImage: React.FC<GothicImageProps> = ({
  src,
  alt,
  className = '',
  fallbackText,
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleRetry = (e: React.MouseEvent) => {
    e.stopPropagation();
    setHasError(false);
    setIsLoading(true);
    setRetryCount((prev) => prev + 1);
  };

  const imageSrc = retryCount > 0 && src ? `${src}?v=${retryCount}` : src;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-black/80">
      {/* Loading Skeleton */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/80 animate-pulse text-rose-500/60 z-10">
          <span className="font-cinzel text-lg mb-1">♱</span>
          <span className="text-[10px] font-serif-sc text-zinc-500">圣印显影中...</span>
        </div>
      )}

      {/* Error state */}
      {hasError ? (
        <div className="flex flex-col items-center justify-center p-4 text-center space-y-2 bg-zinc-950 border border-rose-950/80 rounded-lg w-full h-full min-h-[140px]">
          <ImageOff className="w-6 h-6 text-rose-600/70" />
          <div className="text-xs text-zinc-400 font-serif-sc">
            {fallbackText || '图像载入中断（网络受限）'}
          </div>
          <button
            onClick={handleRetry}
            className="inline-flex items-center gap-1.5 px-3 py-1 text-[11px] font-serif-sc text-rose-200 bg-rose-950/80 hover:bg-rose-900 border border-rose-800/80 rounded transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3 h-3 text-rose-300" />
            <span>重新解印</span>
          </button>
        </div>
      ) : (
        <img
          src={imageSrc}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
          {...props}
        />
      )}
    </div>
  );
};
