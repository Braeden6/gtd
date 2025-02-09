import { Link, useLocation } from 'react-router-dom';
import { 
  Inbox, 
  CheckSquare, 
  FolderKanban, 
  Clock, 
  Archive, 
  FileText,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon } from 'lucide-react';

type NavigationItem = {
  name: string;
  icon: React.ElementType;
  href: string;
  count?: number;
};

export function Sidebar() {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  
  const navigation: NavigationItem[] = [
    { name: 'Dashboard', icon: Home, href: '/' },
    { name: 'Inbox', icon: Inbox, count: 5, href: '/inbox' },
    { name: 'Next Actions', icon: CheckSquare, href: '/next-actions' },
    { name: 'Projects', icon: FolderKanban, href: '/projects' },
    { name: 'Waiting For', icon: Clock, href: '/waiting-for' },
    { name: 'Someday/Maybe', icon: Archive, href: '/someday' },
    { name: 'Reference', icon: FileText, href: '/reference' },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };


  return (
    <aside className="w-64 min-h-screen border-r bg-muted/10 flex flex-col">
      <nav className="flex flex-col gap-2 p-4 flex-1">
        {navigation.map((item) => (
          <NavLink key={item.name} item={item} isActive={location.pathname === item.href} />
        ))}
      </nav>
      
      {/* Theme toggle at bottom of sidebar */}
      <div className="p-4 border-t">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="w-full flex items-center justify-center gap-2"
        >
          {darkMode ? (
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
        'hover:bg-muted/50 transition-colors',
        isActive && 'bg-muted'
      )}
    >
      <item.icon className="h-5 w-5" />
      <span>{item.name}</span>
      {item.count && (
        <span className="ml-auto bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
          {item.count}
        </span>
      )}
    </Link>
  );
}