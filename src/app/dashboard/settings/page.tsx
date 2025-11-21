
"use client";

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useAuth } from '@/firebase';
import { updateProfile, updateEmail, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function SettingsPage() {
  const auth = useAuth();
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [reauthOpen, setReauthOpen] = useState(false);
  const [reauthPassword, setReauthPassword] = useState('');
  const [reauthLoading, setReauthLoading] = useState(false);

  useEffect(() => {
    if (!auth) return;
    const user = auth.currentUser;
    if (user) {
      setName(user.displayName ?? '');
      setEmail(user.email ?? '');
    }
  }, [auth]);

  const handleUpdateProfile = async () => {
    if (!auth) {
      toast({ variant: 'destructive', title: 'Error', description: 'Auth not available' });
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      toast({ variant: 'destructive', title: 'Error', description: 'No signed-in user' });
      return;
    }

    const emailChanged = email !== (user.email ?? '');

    // If email changed, require re-authentication before calling updateEmail
    if (emailChanged) {
      setReauthOpen(true);
      return;
    }

    setLoading(true);
    try {
      // Update displayName only
      await updateProfile(user, { displayName: name });
      toast({ title: 'Profile Updated', description: 'Your display name has been updated.' });
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Update Failed', description: err.message || String(err) });
    } finally {
      setLoading(false);
    }
  };

  const confirmEmailChange = async () => {
    if (!auth) return;
    const user = auth.currentUser;
    if (!user) return;

    setReauthLoading(true);
    try {
      // Reauthenticate with current email + password
      await reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email || '', reauthPassword));
      // Now update the email
      await updateEmail(user, email);
      // Also update displayName if changed
      await updateProfile(user, { displayName: name });
      toast({ title: 'Profile Updated', description: 'Email and display name updated.' });
      setReauthOpen(false);
      setReauthPassword('');
    } catch (err: any) {
      toast({ variant: 'destructive', title: 'Re-auth Failed', description: err.message || String(err) });
    } finally {
      setReauthLoading(false);
    }
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Settings</CardTitle>
          <CardDescription>
            Manage your personal information and account details.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled />
            </div>
          </div>
          <Button onClick={handleUpdateProfile} disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </CardContent>
      </Card>

      <Dialog open={reauthOpen} onOpenChange={setReauthOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Email Change</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" value={reauthPassword} onChange={(e) => setReauthPassword(e.target.value)} />
            </div>
            <div className="flex gap-2">
              <Button className="ml-auto" onClick={confirmEmailChange} disabled={reauthLoading}>
                {reauthLoading ? 'Confirming...' : 'Confirm Email Change'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      

      <Separator />

      <Card>
        <CardHeader>
          <CardTitle>Notification Settings</CardTitle>
          <CardDescription>
            Control how you receive alerts and updates.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive alerts via email.</p>
            </div>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <p className="text-sm text-muted-foreground">Receive critical alerts via SMS.</p>
            </div>
            <Switch />
          </div>
          <div className="space-y-2">
            <Label>Notification Sound</Label>
            <Select defaultValue="default">
              <SelectTrigger>
                <SelectValue placeholder="Select a sound" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default Beep</SelectItem>
                <SelectItem value="chime">Chime</SelectItem>
                <SelectItem value="alarm">Alarm</SelectItem>
              </SelectContent>
            </Select>
          </div>
           <Button>Save Preferences</Button>
        </CardContent>
      </Card>
      
      <Separator />

       <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
          <CardDescription>
            Manage your password and security preferences.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
           <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
             <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
           <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="space-y-0.5">
              <Label>Two-Factor Authentication (2FA)</Label>
              <p className="text-sm text-muted-foreground">Add an extra layer of security to your account.</p>
            </div>
            <Button variant="outline">Enable 2FA</Button>
          </div>
          <Button>Update Security</Button>
        </CardContent>
      </Card>
    </div>
  );
}
