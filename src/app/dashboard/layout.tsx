import Link from 'next/link';
import {
  Calendar,
  LayoutGrid,
  MessageSquare,
  BarChart3,
  Settings,
  ShieldAlert,
  PanelLeft,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { UserNav } from '@/components/layout/user-nav';
import { SyncaLogo } from '@/components/icons';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: '/dashboard', icon: LayoutGrid, label: 'Dashboard' },
    { href: '#', icon: Calendar, label: 'Events' },
    { href: '#', icon: MessageSquare, label: 'Communications' },
    { href: '#', icon: BarChart3, label: 'Reports' },
    { href: '#', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-60 flex-col border-r bg-sidebar sm:flex">
        <nav className="flex flex-col h-full text-sidebar-foreground">
          <div className="flex h-16 items-center border-b px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <SyncaLogo className="h-8 w-8" />
              <span className="text-lg text-primary-foreground font-headline">SYNCA</span>
            </Link>
          </div>
          <div className="flex-1 overflow-auto py-2">
            <ul className="grid items-start px-4 text-sm font-medium">
              {navItems.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground/80 transition-all hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs bg-sidebar text-sidebar-foreground p-0">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="#"
                  className="group flex h-16 shrink-0 items-center justify-center gap-2 border-b text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <SyncaLogo className="h-8 w-8" />
                  <span className="text-lg font-headline">SYNCA</span>
                </Link>
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="flex items-center gap-4 px-2.5 text-sidebar-foreground/80 hover:text-sidebar-accent-foreground"
                  >
                    <item.icon className="h-5 w-5" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="relative ml-auto flex-1 md:grow-0">
            {/* Can be used for a search bar later */}
          </div>
          <Button variant="destructive" className="gap-2">
            <ShieldAlert className="h-5 w-5" />
            <span className="hidden md:inline">Panic</span>
          </Button>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </div>
  );
}
