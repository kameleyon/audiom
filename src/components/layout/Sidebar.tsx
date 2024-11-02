import { useState } from 'react';
import { Sun, Activity, Settings, Bell, HelpCircle, Info, LogOut, History } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useClerk } from '@clerk/clerk-react';

export function Sidebar() {
  const { toggleTheme } = useTheme();
  const { signOut } = useClerk();
  const [isExpanded, setIsExpanded] = useState(false);

  const sidebarItems = [
    { icon: Sun, label: 'Theme', onClick: toggleTheme },
    { icon: Activity, label: 'Activity' },
    { icon: Settings, label: 'Settings' },
    { icon: Bell, label: 'Announcements' },
    { icon: History, label: 'History' },
    { icon: HelpCircle, label: 'Help' },
    { icon: Info, label: 'About' },
    { icon: LogOut, label: 'Logout', onClick: () => signOut() },
  ];

  return (
    <div 
      className="fixed left-0 top-0 h-full z-20"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Expanded sidebar */}
      <div 
        className={cn(
          "absolute left-0 top-0 h-full w-64 bg-gradient-to-r from-[#1a2836]/95 to-[#213b55]/95 backdrop-blur-sm transition-transform duration-300 border-r border-[#c1e8e6]/10",
          isExpanded ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4 mt-16 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={item.onClick}
              className="w-full flex items-center gap-4 px-4 py-3 text-[#c1e8e6] hover:bg-[#c1e8e6]/10 rounded-xl transition-all duration-200 group"
            >
              <item.icon className="h-5 w-5 transition-transform duration-200 group-hover:scale-110" />
              <span className="font-light">{item.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Icon-only sidebar */}
      <div className="relative h-full w-16 bg-gradient-to-b from-[#1a2836]/50 to-[#213b55]/50 backdrop-blur-sm flex flex-col items-center pt-24 gap-2">
        {sidebarItems.map((item) => (
          <Tooltip key={item.label}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={item.onClick}
                className="text-[#c1e8e6] hover:bg-[#c1e8e6]/10 transition-transform duration-200 hover:scale-110"
              >
                <item.icon className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" className="bg-[#1a2836] text-[#c1e8e6] border-[#c1e8e6]/20">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}