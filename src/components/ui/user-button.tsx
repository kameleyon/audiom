import { User } from 'lucide-react';
import { Button } from './button';

export function UserButton() {
  return (
    <Button variant="ghost" size="icon" className="rounded-full">
      <User className="h-6 w-6 text-white" />
    </Button>
  );
}