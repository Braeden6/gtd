import { Link, useLocation } from '@tanstack/react-router';
import { 
  Inbox, 
  CheckSquare, 
  FolderKanban, 
  Home
} from 'lucide-react';
import { Sun, Moon } from 'lucide-react';
import { useInboxItems } from '@/hooks/useInboxItems';
import { Theme, useTheme } from '@gtd/shared/hooks/useTheme';
import { Button } from '@gtd/shared/components/ui/button';
import { cn } from '@gtd/shared/lib/utils';

type NavigationItem = {
  name: string;
  icon: React.ElementType;
  href: string;
  count?: number;
};

export function Sidebar() {
  const location = useLocation();
  const { items } = useInboxItems();
  const { toggleTheme, theme } = useTheme();
  
  const navigation: NavigationItem[] = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Inbox', icon: Inbox, count: 2, href: '/inbox' },
    { name: 'Projects', icon: FolderKanban, href: '/projects' },
    { name: 'Completed', icon: CheckSquare, href: '/completed' },
  ];


  return (
    <aside className="w-64 h-[calc(100vh-3.5rem)] border flex flex-col">
      <nav className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto">
        {navigation.map((item) => (
          <NavLink key={item.name} item={item} isActive={location.pathname === item.href} />
        ))}
      </nav>
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2 cursor-pointer"
        >
          {theme === Theme.Light ? (
            <>
              <Sun className="h-5 w-5" />
              <span>Light Mode</span>
            </>
          ) : (
            <>
              <Moon className="h-5 w-5" />
              <span>Dark Mode</span>
            </>
          )}
        </Button>
      </div>
    </aside>
  );
}

function NavLink({ 
  item, 
  isActive 
}: { 
  item: NavigationItem; 
  isActive: boolean;
}) {
  return (
    <Link
      to={item.href}
      className={cn(
        'flex items-center gap-3 px-3 py-2 rounded-md',
        'text-sm font-medium',
        'hover:bg-card transition-colors',
        isActive && 'bg-primary text-primary-foreground hover:bg-primary'
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
      {item.count && (
        <span className="ml-auto bg-purple-500 text-white px-2 py-1 rounded-full text-xs">
          {item.count}
        </span>
      )}
    </Link>
  );
}