'use client';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div 
        className="absolute -top-1/2 left-0 w-[80rem] h-[80rem] bg-[#9b59b6]/10 dark:bg-[#9b59b6]/15 blur-[10rem] rounded-full will-change-transform contain-paint"
        style={{ animation: 'blob1 20s infinite linear', transform: 'translate3d(0, 0, 0)' }}
      />
      <div 
        className="absolute top-0 right-0 w-[60rem] h-[60rem] bg-[#27ae60]/10 dark:bg-[#27ae60]/15 blur-[10rem] rounded-full will-change-transform contain-paint"
        style={{ animation: 'blob2 25s infinite linear', transform: 'translate3d(0, 0, 0)' }}
      />
      <div 
        className="absolute bottom-0 left-1/2 w-[70rem] h-[70rem] bg-[#8e44ad]/10 dark:bg-[#8e44ad]/15 blur-[10rem] rounded-full will-change-transform contain-paint"
        style={{ animation: 'blob3 22s infinite linear', transform: 'translate3d(0, 0, 0)' }}
      />
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .absolute {
            animation: none !important;
            transform: none !important;
          }
        }

        @keyframes blob1 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate3d(10%, 10%, 0) rotate(120deg) scale(1.1);
          }
          66% {
            transform: translate3d(-10%, 20%, 0) rotate(240deg) scale(0.9);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(360deg) scale(1);
          }
        }
        
        @keyframes blob2 {
          0% {
            transform: translate3d(0, 0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate3d(-20%, 10%, 0) rotate(-120deg) scale(0.9);
          }
          66% {
            transform: translate3d(-10%, -10%, 0) rotate(-240deg) scale(1.1);
          }
          100% {
            transform: translate3d(0, 0, 0) rotate(-360deg) scale(1);
          }
        }
        
        @keyframes blob3 {
          0% {
            transform: translate3d(-50%, 0, 0) rotate(0deg) scale(1);
          }
          33% {
            transform: translate3d(-60%, -10%, 0) rotate(120deg) scale(1.1);
          }
          66% {
            transform: translate3d(-40%, 10%, 0) rotate(240deg) scale(0.9);
          }
          100% {
            transform: translate3d(-50%, 0, 0) rotate(360deg) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
