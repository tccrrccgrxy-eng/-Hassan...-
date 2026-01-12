
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const MatiRainDrop: React.FC<{ left: string; size: string; duration: string; delay: string; opacity: number; color: string }> = ({ left, size, duration, delay, opacity, color }) => (
  <div 
    className="mati-rain animate-fall"
    style={{ 
      left, 
      fontSize: size,
      '--fall-duration': duration,
      '--fall-delay': delay,
      opacity: opacity,
      color: color,
      filter: 'drop-shadow(0 0 8px currentColor)'
    } as React.CSSProperties}
  >
    مطي
  </div>
);

const FloatingEmoji: React.FC<{ emoji: string; delay: number; left: string; top: string }> = ({ emoji, delay, left, top }) => (
  <div 
    className="emoji-bg animate-float" 
    style={{ 
      left, 
      top, 
      animationDelay: `${delay}s`,
      fontSize: `${Math.random() * 4 + 2}rem` 
    }}
  >
    {emoji}
  </div>
);

const App: React.FC = () => {
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('أنت الآن في منطقة المطايا 🚧');

  const bgEmojis = ['😂', '🫏', '🤣', '🐴', '✨', '🔥', '🤪', '🤡'];
  const colors = ['#ffffff', '#fffbeb', '#fef3c7', '#fde68a', '#fcd34d'];
  
  const floatingElements = useMemo(() => Array.from({ length: 20 }).map((_, i) => ({
    emoji: bgEmojis[Math.floor(Math.random() * bgEmojis.length)],
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5
  })), []);

  const rainDrops = useMemo(() => Array.from({ length: 50 }).map((_, i) => ({
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 3.5 + 1}rem`,
    duration: `${Math.random() * 5 + 2}s`,
    delay: `${Math.random() * 8}s`,
    opacity: Math.random() * 0.6 + 0.3,
    color: colors[Math.floor(Math.random() * colors.length)]
  })), []);

  const handleEscape = useCallback(() => {
    const newX = (Math.random() - 0.5) * (window.innerWidth < 640 ? 250 : 500);
    const newY = (Math.random() - 0.5) * (window.innerHeight < 640 ? 250 : 500);
    setBtnPos({ x: newX, y: newY });
    setCount(prev => {
      const newCount = prev + 1;
      if (newCount === 5) setMessage('باقي تحاول؟ 😂');
      if (newCount === 15) setMessage('يا مطي استسلم خلاص 💀');
      if (newCount === 30) setMessage('أنت أسطورة في التمطي! 🏆');
      return newCount;
    });
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center justify-center p-4 overflow-hidden select-none bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

      {/* The Rain of "Mati" */}
      {rainDrops.map((drop, i) => (
        <MatiRainDrop key={`rain-${i}`} {...drop} />
      ))}

      {/* Decorative Background Emojis */}
      {floatingElements.map((el, i) => (
        <FloatingEmoji key={`float-${i}`} {...el} />
      ))}

      {/* Main Container */}
      <div className="z-20 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[2.5rem] p-8 md:p-16 shadow-[0_0_100px_rgba(0,0,0,0.5)] text-center flex flex-col items-center gap-8 max-w-xl w-full transform hover:scale-[1.02] transition-all duration-700">
        <div className="flex gap-6 mb-2">
          <span className="text-8xl md:text-9xl animate-bounce drop-shadow-2xl" style={{ animationDelay: '0s' }}>🫏</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-t from-yellow-300 to-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] leading-none italic">
            يااا مطييي
          </h1>
          <div className="h-1.5 w-3/4 mx-auto bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full shadow-[0_0_15px_#facc15]"></div>
        </div>

        <p className="text-white text-2xl md:text-4xl font-bold drop-shadow-lg tracking-tight">
          {message}
        </p>

        {/* The Prank Button */}
        <div className="relative h-32 w-full flex items-center justify-center">
          <button
            onMouseEnter={handleEscape}
            onClick={() => alert('تحاول تهرب من مصيرك؟ يا مطي!')}
            style={{ 
              transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
              transition: 'transform 0.1s cubic-bezier(0.2, 1, 0.3, 1)'
            }}
            className="absolute bg-gradient-to-b from-white to-gray-200 text-purple-900 font-black px-12 py-5 rounded-2xl shadow-[0_15px_30px_rgba(0,0,0,0.4)] hover:shadow-yellow-400/50 hover:scale-110 active:scale-90 transition-all text-3xl whitespace-nowrap border-b-8 border-gray-400"
          >
            اضغط للخروج 🚪
          </button>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
            <div className="text-yellow-400 text-xl font-black bg-black/40 px-6 py-2 rounded-2xl border border-yellow-400/30 backdrop-blur-md">
              عداد التمطي: {count}
            </div>
            {count > 0 && <span className="text-white/40 text-sm animate-pulse">لن تستطيع النقر أبداً..</span>}
        </div>
      </div>

      <footer className="absolute bottom-8 text-white/50 text-sm font-bold tracking-[0.3em] uppercase flex items-center gap-2">
        <span className="w-8 h-[1px] bg-white/30"></span>
        The Official Mati Club 🏆
        <span className="w-8 h-[1px] bg-white/30"></span>
      </footer>
    </div>
  );
};

export default App;
