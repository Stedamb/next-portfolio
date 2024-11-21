'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ThemeSwitch } from './ThemeSwitch';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Home, User, Code2, Mail, Menu, X } from 'lucide-react';

const menuItems = [
  { 
    href: '/', 
    label: 'Home',
    Icon: Home,
  },
  { 
    href: '/about', 
    label: 'About',
    Icon: User,
  },
  { 
    href: '/projects', 
    label: 'Projects',
    Icon: Code2,
  },
  { 
    href: '/contact', 
    label: 'Contact',
    Icon: Mail,
  },
] as const;

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        setIsVisible(false);
        setIsOpen(false);
      } else {
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 top-8 p-2 
        bg-white/60 dark:bg-background/60 backdrop-blur-md border border-border
        rounded-full shadow-sm transition-[transform,background-color] duration-300 ease-in-out
        ${isVisible ? 'translate-y-0' : '-translate-y-32'}`}
    >
      <div className="relative flex items-center justify-between sm:justify-start">
        {/* Mobile drawer */}
        <div className="sm:hidden">
          <Drawer open={isOpen} onOpenChange={setIsOpen}>
            <DrawerTrigger asChild>
              <button
                className="p-4 rounded-full hover:bg-foreground/5 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </DrawerTrigger>
            <DrawerContent>
              <div className="p-6">
                <ul className="flex flex-col gap-4">
                  {menuItems.map(({ href, label, Icon }) => (
                    <li key={href} className="w-full">
                      <Link 
                        href={href} 
                        className="w-full p-6 rounded-xl hover:bg-foreground/5 flex items-center gap-4 text-lg font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-6 h-6" />
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </DrawerContent>
          </Drawer>
        </div>

        {/* Desktop menu */}
        <ul className="hidden sm:flex items-center gap-2 text-lg font-mono">
          {menuItems.map(({ href, label, Icon }) => (
            <li key={href}>
              <Link 
                href={href} 
                className="rounded-full px-8 py-6 hover:bg-foreground/5 flex items-center gap-3"
              >
                <Icon className="w-6 h-6" />
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center">
          <div className="w-px h-8 bg-border/50 mx-4 hidden sm:block" />
          <ThemeSwitch />
        </div>
      </div>
    </nav>
  );
}
