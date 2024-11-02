import { UserButton } from '@clerk/clerk-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  return (
    <nav className={cn(
      'fixed top-0 left-0 right-0 z-50',
      'bg-gradient-to-r from-[#213b55]/80 to-[#071523]/80 backdrop-blur-sm',
      'border-b border-white/10'
    )}>
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-2xl font-bold text-white">AUDIOMAX</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
}