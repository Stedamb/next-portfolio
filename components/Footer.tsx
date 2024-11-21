import Link from 'next/link';
import { Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t bg-background/60 backdrop-blur-md">
      <div className="container max-w-4xl mx-auto flex flex-col items-center gap-8 px-4 py-8 lg:flex-row lg:items-center lg:justify-between lg:py-12">
        <div className="flex flex-col items-center lg:items-start gap-2">
          <p className="text-sm text-foreground">
            {currentYear} © Stefano D'Ambrosio. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Built with Next.js, Tailwind CSS, and Lucide Icons
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="GitHub"
          >
            <Github className="size-5" />
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="LinkedIn"
          >
            <Linkedin className="size-5" />
          </Link>
          <Link
            href="mailto:your.email@example.com"
            className="rounded-lg p-2 hover:bg-accent hover:text-accent-foreground"
            aria-label="Email"
          >
            <Mail className="size-5" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
