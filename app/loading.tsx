export default function Loading() {
  const letters = "Tsona".split("");

  return (
    <div className="relative flex min-h-[80vh] w-full flex-col items-center justify-center gap-10 overflow-hidden px-6">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(228,124,72,0.12),transparent_60%)]" />

      <div className="relative flex h-44 w-44 items-center justify-center">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-customOrange/20" />
        <span
          className="absolute inline-flex h-32 w-32 animate-ping rounded-full bg-customOrange/30"
          style={{ animationDelay: "0.4s" }}
        />

        <div className="absolute inset-0 rounded-full border border-customOrange/30 Tsona-orbit">
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-customOrange shadow-[0_0_12px_rgba(228,124,72,0.9)]" />
        </div>
        <div className="absolute inset-3 rounded-full border border-customOrange/20 Tsona-orbit-reverse">
          <span className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-customOrange/80" />
        </div>

        <svg
          viewBox="0 0 120 60"
          className="relative z-10 h-20 w-20 text-customOrange Tsona-lift drop-shadow-[0_4px_18px_rgba(228,124,72,0.45)]"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="55" y="26" width="10" height="8" rx="2" />
          <rect x="30" y="20" width="8" height="20" rx="2" />
          <rect x="20" y="14" width="8" height="32" rx="3" />
          <rect x="82" y="20" width="8" height="20" rx="2" />
          <rect x="92" y="14" width="8" height="32" rx="3" />
        </svg>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-1 text-2xl font-bold tracking-[0.35em] text-neutral-900 md:text-3xl">
          {letters.map((letter, i) => (
            <span
              key={i}
              className="inline-block Tsona-wave"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {letter}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">Loading</span>
          <span className="flex gap-1">
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-customOrange [animation-delay:-0.3s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-customOrange [animation-delay:-0.15s]" />
            <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-customOrange" />
          </span>
        </div>

        <div className="relative mt-2 h-1 w-56 overflow-hidden rounded-full bg-neutral-200">
          <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gradient-to-r from-transparent via-customOrange to-transparent Tsona-progress" />
        </div>
      </div>

      <style>{`
        @keyframes Tsona-orbit {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes Tsona-orbit-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes Tsona-lift {
          0%, 100% { transform: translateY(0) rotate(-6deg); }
          50% { transform: translateY(-6px) rotate(6deg); }
        }
        @keyframes Tsona-wave {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.55; }
          30% { transform: translateY(-8px); opacity: 1; color: #e47c48; }
        }
        @keyframes Tsona-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
        .Tsona-orbit { animation: Tsona-orbit 3.2s linear infinite; }
        .Tsona-orbit-reverse { animation: Tsona-orbit-reverse 4.4s linear infinite; }
        .Tsona-lift { animation: Tsona-lift 1.4s ease-in-out infinite; transform-origin: center; }
        .Tsona-wave { animation: Tsona-wave 1.6s ease-in-out infinite; }
        .Tsona-progress { animation: Tsona-progress 1.6s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
