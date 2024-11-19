// 'use client';

// import { useEffect, useRef } from 'react';

// interface Particle {
//   x: number;
//   y: number;
//   dx: number;
//   dy: number;
//   alpha: number;
//   color: string;
//   size: number;
// }

// interface Letter {
//   x: number;
//   y: number;
//   char: string;
//   color: string;
//   visible: boolean;
//   width: number;
//   height: number;
//   particles: Particle[];
// }

// interface Ball {
//   x: number;
//   y: number;
//   dx: number;
//   dy: number;
//   radius: number;
//   visible: boolean;
// }

// interface Paddle {
//   x: number;
//   width: number;
//   height: number;
// }

// export function Hero() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const ballRef = useRef<Ball>({
//     x: 0,
//     y: 0,
//     dx: 4,
//     dy: 4,
//     radius: 8,
//     visible: true
//   });
//   const paddleRef = useRef<Paddle>({
//     x: 0,
//     width: 100,
//     height: 10,
//   });
//   const lettersRef = useRef<Letter[]>([]);

//   const colors = [
//     '#FF595E',
//     '#FFCA3A',
//     '#8AC926',
//     '#1982C4',
//     '#6A4C93',
//   ];

//   const createParticles = (x: number, y: number, color: string): Particle[] => {
//     const particles: Particle[] = [];
//     for (let i = 0; i < 8; i++) {
//       const angle = (Math.PI * 2 * i) / 8;
//       particles.push({
//         x,
//         y,
//         dx: Math.cos(angle) * (Math.random() * 2 + 2),
//         dy: Math.sin(angle) * (Math.random() * 2 + 2),
//         alpha: 1,
//         color,
//         size: Math.random() * 3 + 2
//       });
//     }
//     return particles;
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     // Set canvas size
//     const updateCanvasSize = () => {
//       canvas.width = Math.min(800, window.innerWidth - 40);
//       canvas.height = 600;
//     };
//     updateCanvasSize();
//     window.addEventListener('resize', updateCanvasSize);

//     // Initialize ball position
//     const ball = ballRef.current;
//     ball.x = canvas.width / 2;
//     ball.y = canvas.height - 30;

//     // Initialize paddle position
//     const paddle = paddleRef.current;
//     paddle.x = (canvas.width - paddle.width) / 2;

//     // Initialize letters
//     const message = "WEB DESIGN HAS NEVER BEEN THIS PLAYFUL";
//     const letters: Letter[] = [];
//     const fontSize = 32;
//     ctx.font = `${fontSize}px 'Geist'`;
    
//     let currentX = 20;
//     let currentY = 60;
//     const lineHeight = fontSize * 1.5;
//     const maxWidth = canvas.width - 40;
//     let lineStart = 0;
//     let words = message.split(' ');
    
//     words.forEach((word, wordIndex) => {
//       const wordWidth = ctx.measureText(word).width;
//       if (currentX + wordWidth > maxWidth) {
//         // Center the previous line
//         const lineWidth = currentX - lineStart;
//         const offset = (canvas.width - lineWidth) / 2;
//         for (let i = letters.length - 1; i >= 0 && letters[i].y === currentY - lineHeight; i--) {
//           letters[i].x += offset;
//         }
//         // Move to next line
//         currentY += lineHeight;
//         currentX = 20;
//         lineStart = currentX;
//       }

//       word.split('').forEach((char, charIndex) => {
//         const metrics = ctx.measureText(char);
//         const letterWidth = metrics.width;

//         letters.push({
//           x: currentX,
//           y: currentY,
//           char,
//           color: colors[(wordIndex + charIndex) % colors.length],
//           visible: true,
//           width: letterWidth,
//           height: fontSize,
//           particles: []
//         });

//         currentX += letterWidth + 2;
//       });

//       currentX += fontSize / 2; // Space between words
//     });

//     // Center the last line
//     const lineWidth = currentX - lineStart;
//     const offset = (canvas.width - lineWidth) / 2;
//     for (let i = letters.length - 1; i >= 0 && letters[i].y === currentY; i--) {
//       letters[i].x += offset;
//     }

//     lettersRef.current = letters;

//     // Handle mouse movement
//     const handleMouseMove = (e: MouseEvent) => {
//       const rect = canvas.getBoundingClientRect();
//       const relativeX = e.clientX - rect.left;
      
//       if (relativeX > 0 && relativeX < canvas.width) {
//         paddle.x = relativeX - paddle.width / 2;
        
//         if (paddle.x < 0) {
//           paddle.x = 0;
//         } else if (paddle.x + paddle.width > canvas.width) {
//           paddle.x = canvas.width - paddle.width;
//         }
//       }
//     };
//     canvas.addEventListener('mousemove', handleMouseMove);

//     const resetBall = () => {
//       ball.visible = false;
//       setTimeout(() => {
//         ball.x = canvas.width / 2;
//         ball.y = canvas.height;
//         ball.dy = -4;
//         ball.visible = true;
//       }, 1000);
//     };

//     // Game loop
//     function draw() {
//       // Clear canvas
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       // Draw letters
//       ctx.font = `${fontSize}px 'Geist'`;
//       ctx.textBaseline = 'top';
//       lettersRef.current.forEach(letter => {
//         if (letter.visible) {
//           ctx.fillStyle = letter.color;
//           ctx.fillText(letter.char, letter.x, letter.y);
//         }

//         // Update and draw particles
//         letter.particles = letter.particles.filter(particle => {
//           particle.x += particle.dx;
//           particle.y += particle.dy;
//           particle.alpha *= 0.96;
//           particle.size *= 0.97;

//           if (particle.alpha > 0.1) {
//             ctx.beginPath();
//             ctx.fillStyle = `rgba(${hexToRgb(particle.color)},${particle.alpha})`;
//             ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
//             ctx.fill();
//             return true;
//           }
//           return false;
//         });
//       });

//       // Draw ball only if visible
//       if (ball.visible) {
//         ctx.beginPath();
//         ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
//         ctx.fillStyle = '#fff';
//         ctx.fill();
//         ctx.closePath();
//       }

//       // Draw paddle
//       ctx.beginPath();
//       ctx.rect(paddle.x, canvas.height - paddle.height - 10, paddle.width, paddle.height);
//       ctx.fillStyle = '#fff';
//       ctx.fill();
//       ctx.closePath();

//       // Ball collision with walls
//       if (ball.x + ball.dx > canvas.width - ball.radius || ball.x + ball.dx < ball.radius) {
//         ball.dx = -ball.dx;
//       }
//       if (ball.y + ball.dy < ball.radius) {
//         ball.dy = -ball.dy;
//       }

//       // Ball collision with paddle
//       const paddleTop = canvas.height - paddle.height - 10;
//       if (ball.y + ball.dy > paddleTop - ball.radius && 
//           ball.y + ball.dy < paddleTop + paddle.height &&
//           ball.x > paddle.x && 
//           ball.x < paddle.x + paddle.width) {
//         const hitPosition = (ball.x - paddle.x) / paddle.width;
//         const angle = (hitPosition - 0.5) * Math.PI / 1.5;
//         const speed = Math.sqrt(ball.dx * ball.dx + ball.dy * ball.dy);
//         ball.dx = speed * Math.sin(angle);
//         ball.dy = -speed * Math.cos(angle);
//       } else if (ball.y > canvas.height + ball.radius && ball.visible) {
//         resetBall();
//       }

//       // Ball collision with letters
//       lettersRef.current.forEach(letter => {
//         if (!letter.visible || !ball.visible) return;

//         if (ball.x > letter.x && 
//             ball.x < letter.x + letter.width && 
//             ball.y > letter.y && 
//             ball.y < letter.y + letter.height) {
//           ball.dy = -ball.dy;
//           letter.visible = false;
//           // Add explosion particles
//           letter.particles = createParticles(
//             letter.x + letter.width / 2,
//             letter.y + letter.height / 2,
//             letter.color
//           );
//         }
//       });

//       // Move ball if visible
//       if (ball.visible) {
//         ball.x += ball.dx;
//         ball.y += ball.dy;
//       }

//       requestAnimationFrame(draw);
//     }

//     // Helper function to convert hex to rgb
//     function hexToRgb(hex: string): string {
//       const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
//       return result
//         ? `${parseInt(result[1], 16)},${parseInt(result[2], 16)},${parseInt(result[3], 16)}`
//         : '255,255,255';
//     }

//     draw();

//     return () => {
//       window.removeEventListener('resize', updateCanvasSize);
//       canvas.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <section className="flex items-center justify-center min-h-screen">
//       <canvas
//         ref={canvasRef}
//         className="bg-background border border-border rounded-lg shadow-lg"
//       />
//     </section>
//   );
// }
