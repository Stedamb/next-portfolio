'use client';

export function Background() {
  return (
    <div className="fixed inset-0 -z-50">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/90" />
      
      {/* Grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15] dark:opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(to bottom, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.15] mix-blend-soft-light"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%' height='100%' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
      />

      {/* Radial gradient for subtle spotlight effect */}
      <div 
        className="absolute inset-0 dark:bg-[radial-gradient(circle_800px_at_50%_200px,rgb(255_255_255/0.08),transparent)] bg-[radial-gradient(circle_800px_at_50%_200px,rgb(0_0_0/0.08),transparent)]"
      />
    </div>
  );
}