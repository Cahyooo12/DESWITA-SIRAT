
import React, { useEffect, useState } from 'react';

const Preloader: React.FC<{ onFinish: () => void }> = ({ onFinish }) => {
  const [fading, setFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1; // Smoother progress
      });
    }, 20); // 2 seconds total (100 * 20ms)

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onFinish, 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onFinish]);

  return (
    <div className={`fixed inset-0 z-[100] bg-white flex items-center justify-center transition-opacity duration-500 ${fading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
      <div className="relative flex flex-col items-center gap-8 px-6 w-full max-w-sm">
        {/* Logo */}
        <div className="size-40 rounded-3xl overflow-hidden bg-white shadow-xl">
          <img src="https://uploads.onecompiler.io/43w9rf9r9/44brtpuy2/image_2026-01-27_002804190.png" alt="Logo" className="w-full h-full object-cover" />
        </div>

        <div className="text-center flex flex-col items-center gap-4 w-full">
          <h1 className="text-2xl font-black text-slate-800 tracking-tight">Desa Wisata <br /> <span className="text-primary">Bunga Telang</span></h1>

          {/* Progress Bar Container */}
          <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-primary transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Percentage Text */}
          <span className="text-primary font-bold text-sm tracking-widest">{progress}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
