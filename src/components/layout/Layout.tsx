import { ReactNode } from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { TooltipProvider } from '@/components/ui/tooltip';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <TooltipProvider>
      <div className="min-h-screen">
        <Navbar />
        <Sidebar />
        <main className="pt-16 pl-16">
          <div className="max-w-[1440px] mx-auto px-8 py-6">
            {children}
          </div>
        </main>
      </div>
    </TooltipProvider>
  );
}