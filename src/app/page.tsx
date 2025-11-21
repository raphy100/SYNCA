
"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SyncaLogo } from '@/components/icons';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handleBiometricLogin = () => {
    toast({
      title: "Biometric Login",
      description: "This feature is not yet implemented.",
    });
  };

  const handleSignUp = () => {
     toast({
      title: "Sign Up",
      description: "This feature is not yet implemented.",
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mb-4 flex justify-center">
            <SyncaLogo className="h-12 w-12" />
          </div>
          <CardTitle className="text-2xl font-headline">Welcome to SYNCA</CardTitle>
          <CardDescription>
            Enter your credentials to access your security dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="#"
                  className="ml-auto inline-block text-sm underline"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Forgot Password",
                      description: "This feature is not yet implemented.",
                    });
                  }}
                >
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full" onClick={handleLogin}>
              Login
            </Button>
            <Button variant="outline" className="w-full" onClick={handleBiometricLogin}>
              Login with Biometrics
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline" onClick={(e) => { e.preventDefault(); handleSignUp(); }}>
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
