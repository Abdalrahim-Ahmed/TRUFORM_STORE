import React, { useState, useEffect } from 'react';
import { X, Play, Pause, CheckCircle2, RotateCcw, Volume2, Sparkles } from 'lucide-react';

export default function VideoModal({ isOpen, onClose, videoData, productName }) {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(25);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !videoData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-charcoal-950/75 backdrop-blur-sm animate-fadeIn">
      {/* Backdrop */}
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-cream-50 rounded-3xl shadow-soft-xl border border-cream-300 overflow-hidden z-10 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-cream-200 bg-white">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-xl bg-sage-100 text-sage-800">
              <Sparkles className="w-4 h-4 text-gold-500" />
            </span>
            <div>
              <h3 className="font-bold text-base text-charcoal-900 leading-none">
                فيديو تعليمي: {videoData.title}
              </h3>
              <p className="text-xs text-stone-500 mt-1">{productName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-cream-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Area (Mock Player) */}
        <div className="relative aspect-video bg-charcoal-950 flex flex-col items-center justify-center overflow-hidden group">
          {/* Background Poster Skincare Scene */}
          <div className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-[1px]" style={{ backgroundImage: `url(${videoData.thumbnail || '/products/gentle-hydrating-cleanser.png'})` }} />

          {/* Central Play/Pause Watermark */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="relative z-10 w-16 h-16 rounded-full bg-sage-700/90 hover:bg-sage-600 text-white flex items-center justify-center shadow-soft-xl transition-transform transform hover:scale-110"
          >
            {isPlaying ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 mr-1 fill-white" />}
          </button>

          {/* Video Status Overlay */}
          <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-charcoal-900/80 backdrop-blur-md text-white text-xs font-medium flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span>{isPlaying ? 'جاري العرض التوضيحي...' : 'متوقف مؤقتاً'}</span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 z-10 bg-charcoal-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl flex items-center justify-between text-white text-xs">
            <div className="flex items-center gap-3">
              <button onClick={() => setIsPlaying(!isPlaying)} className="hover:text-gold-400">
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              </button>
              <button onClick={() => setProgress(0)} className="hover:text-gold-400" title="إعادة من البداية">
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span>0:45 / {videoData.duration || '1:30'}</span>
            </div>

            {/* Simulated progress bar */}
            <div className="flex-1 mx-4 bg-charcoal-700 h-1.5 rounded-full overflow-hidden cursor-pointer" onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const clickX = e.clientX - rect.left;
              setProgress(Math.round((clickX / rect.width) * 100));
            }}>
              <div className="bg-sage-400 h-full rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>

            <div className="flex items-center gap-2 text-stone-300">
              <Volume2 className="w-4 h-4" />
              <span>HD</span>
            </div>
          </div>
        </div>

        {/* Video Steps & Tips Guidance */}
        <div className="p-6 overflow-y-auto space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-charcoal-900">
              نصائح الخبراء للحصول على أفضل نتيجة من هذا المنتج:
            </h4>
            <span className="text-xs text-stone-400">المدة: {videoData.duration}</span>
          </div>

          <div className="space-y-2.5">
            {videoData.tips?.map((tip, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-3 rounded-2xl bg-white border border-cream-200"
              >
                <div className="w-6 h-6 rounded-full bg-sage-100 text-sage-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-xs sm:text-sm text-charcoal-800 leading-relaxed">{tip}</p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-cream-200/60 border border-cream-300 text-xs text-stone-600 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              اتباع الترتيب الصحيح ومدة التدليك المناسبة يضاعف امتصاص المواد الفعالة بنسبة 40%.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
