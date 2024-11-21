'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Suspense } from 'react';

const Icosahedron3D = dynamic(() => import('../components/Icosahedron3D'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse w-full h-full bg-muted rounded-xl" />
  ),
});

const TorusKnot3D = dynamic(() => import('./TorusKnot3D'), {
  ssr: false,
  loading: () => (
    <div className="animate-pulse w-full h-full bg-muted rounded-xl" />
  ),
});

const technologies = [
  {
    name: 'Next.js',
    description: 'React framework for production',
    icon: '/icons/nextjs.svg',
    color: 'bg-gradient-to-br from-black to-black/80 border border-white/10 hover:from-white/10 hover:to-black/80 transition ease-in duration-200',
    textColor: 'text-white',
    size: 'row-span-2 col-span-1',
  },
  {
    name: 'Tailwind CSS',
    description: 'A utility-first CSS framework packed with classes',
    icon: '/icons/tailwind.svg',
    color: 'bg-gradient-to-br from-[#38bdf8]/20 to-[#38bdf8]/5 border border-[#38bdf8]/20 hover:from-[#38bdf8]/30 hover:to-[#38bdf8]/10',
    textColor: 'text-[#38bdf8]',
    size: 'row-span-2 col-span-1',
  },
  {
    name: 'shadcn/ui',
    description: 'Re-usable components built with Radix UI and Tailwind CSS',
    icon: '/icons/shadcn.svg',
    color: 'bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 hover:from-zinc-800 hover:to-zinc-900',
    textColor: 'text-zinc-100',
    size: 'row-span-2 col-span-1',
  },
  {
    name: 'TypeScript',
    description: 'JavaScript with syntax for types',
    icon: '/icons/typescript.svg',
    color: 'bg-gradient-to-br from-[#3178c6]/20 to-[#3178c6]/5 border border-[#3178c6]/20 hover:from-[#3178c6]/30 hover:to-[#3178c6]/10',
    textColor: 'text-[#3178c6]',
    size: 'row-span-2 col-span-1',
  },
  {
    name: 'Three.js',
    description: '3D graphics library for the web',
    icon: '/icons/threejs.svg',
    color: 'bg-gradient-to-br from-[#663399]/20 to-[#663399]/5 border border-[#663399]/20 hover:from-[#663399]/30 hover:to-[#663399]/10',
    textColor: 'text-foreground',
    size: 'row-span-4 col-span-2',
    component: TorusKnot3D,
  },
  {
    name: 'Motion',
    description: 'Permormant and lightweight animation library for React',
    icon: '/icons/sanity.svg',
    color: 'bg-gradient-to-br from-[#ffd700]/20 to-[#ffd700]/5 border border-[#ffd700]/20 hover:from-[#ffd700]/30 hover:to-[#ffd700]/10',
    textColor: 'text-[#FF5733]',
    size: 'row-span-2 col-span-2',
  },
];

export function Hero() {
  return (
    <section className="container max-w-5xl mx-auto px-4 py-40">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[100px]">
        {/* Main Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative row-span-4 col-span-3 flex flex-col justify-center p-8 rounded-3xl bg-gradient-to-br from-background via-muted/50 to-background border overflow-hidden"
        >
          <div className="relative z-10 md:w-1/2">
            <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl mb-4">
              Modern Web Development
            </h1>
            <p className="text-xl font-mono text-muted-foreground">
              Building beautiful, responsive web applications
            </p>
          </div>
          <div className="absolute top-0 right-0 w-1/2 h-full z-0 hidden md:block">
            <Suspense fallback={<div className="w-full h-full bg-muted/20 rounded-lg animate-pulse" />}>
              <Icosahedron3D />
            </Suspense>
          </div>
        </motion.div>

        {/* Technology Cards */}
        {technologies.map((tech, index) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`relative flex flex-col justify-between p-6 rounded-3xl ${tech.color} ${tech.size} overflow-hidden`}
          >
            {tech.component && (
              <div className="absolute inset-0 z-0">
                <tech.component />
              </div>
            )}
            <div className="relative z-10 flex flex-col h-full">
              <div>
                <h2 className={`text-lg font-semibold ${tech.textColor}`}>{tech.name}</h2>
                <p className="text-md font-mono text-muted-foreground mt-2">
                  {tech.description}
                </p>
              </div>
            </div>
            <div 
              className="absolute inset-0 bg-gradient-to-br from-transparent to-foreground/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20" 
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
