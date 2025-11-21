
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { LogOut, User, Settings, LifeBuoy } from "lucide-react";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useAuth } from '@/firebase';
import { onAuthStateChanged, signOut as firebaseSignOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export function UserNav() {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');
  const auth = useAuth();
  const [user, setUser] = useState<null | { displayName?: string | null; email?: string | null; photoURL?: string | null }>(null);
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;
    const unsub = onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser({ displayName: u.displayName, email: u.email, photoURL: u.photoURL });
      } else {
        setUser(null);
      }
    });
    return () => unsub();
  }, [auth]);

  const handleSignOut = async () => {
    if (!auth) return router.push('/');
    await firebaseSignOut(auth);
    router.push('/');
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src={user?.photoURL ?? userAvatar?.imageUrl} alt={user?.displayName ?? '@user'} data-ai-hint={userAvatar?.imageHint} />
            <AvatarFallback>{(user?.displayName || 'SC').slice(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.displayName ?? 'Guest'}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email ?? 'Not signed in'}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard/help-and-support">
            <LifeBuoy className="mr-2 h-4 w-4" />
            <span>Help & Support</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onSelect={handleSignOut}>
          <div className="flex items-center">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
