
'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Send, PlusCircle, Trash2 } from 'lucide-react';

const initialTeams = [
  { id: '1', name: 'Alpha Team', status: 'Active' },
  { id: '2', name: 'Bravo Team', status: 'Standby' },
  { id: '3', name: 'Charlie Team', status: 'Offline' },
];

const messageLogs = [
  { id: '1', to: 'Alpha Team', message: 'Proceed to Checkpoint 1.', timestamp: '10:30 AM', status: 'Sent' },
  { id: '2', from: 'Bravo Team', message: 'Area clear.', timestamp: '10:32 AM', status: 'Received' },
  { id: '3', to: 'All Teams', message: 'Event start in 5 minutes.', timestamp: '10:35 AM', status: 'Sent' },
];

export default function CommunicationsPage() {
  const [recipients, setRecipients] = useState<string[]>([]);
  const [teams, setTeams] = useState(initialTeams);
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [teamStatus, setTeamStatus] = useState('Active');

  const createTeam = () => {
    if (!teamName.trim()) return;
    const newTeam = { id: Date.now().toString(), name: teamName.trim(), status: teamStatus };
    setTeams((s) => [newTeam, ...s]);
    setTeamName('');
    setTeamStatus('Active');
    setOpen(false);
  };

  const deleteTeam = (id: string) => {
    setTeams((s) => s.filter((t) => t.id !== id));
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Team Communications</CardTitle>
          <CardDescription>
            Send messages, manage teams, and view communication logs.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="send">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="send">Send Message</TabsTrigger>
              <TabsTrigger value="teams">Manage Teams</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
            </TabsList>
            <TabsContent value="send" className="pt-4">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="recipients">Recipients</Label>
                  <Select onValueChange={(value) => setRecipients(value ? [value] : [])}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select team or member" />
                    </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Teams</SelectItem>
                        {teams.map((member) => (
                          <SelectItem key={member.id} value={member.name}>{member.name}</SelectItem>
                        ))}
                      </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    placeholder="Type your message here..."
                    className="min-h-[120px]"
                  />
                </div>
                <Button className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="teams">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Security Teams</h3>
                <Dialog open={open} onOpenChange={setOpen}>
                  <DialogTrigger asChild>
                    <Button size="sm" onClick={() => setOpen(true)}>
                      <PlusCircle className="mr-2 h-4 w-4" /> Add Team
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Create Team</DialogTitle>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="teamName">Team Name</Label>
                        <Input id="teamName" placeholder="e.g., Delta Team" value={teamName} onChange={(e) => setTeamName(e.target.value)} />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="teamStatus">Status</Label>
                        <Select onValueChange={(v) => setTeamStatus(v)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Active" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Active">Active</SelectItem>
                            <SelectItem value="Standby">Standby</SelectItem>
                            <SelectItem value="Offline">Offline</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex gap-2">
                        <Button className="ml-auto" onClick={createTeam}>Create Team</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Team Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teams.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant={member.status === 'Active' ? 'default' : member.status === 'Standby' ? 'secondary' : 'destructive'}
                          className={member.status === 'Active' ? 'bg-green-600' : ''}
                        >
                          {member.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="icon" onClick={() => deleteTeam(member.id)}>
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="logs">
                <h3 className="text-lg font-medium mb-4">Message Log</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Direction</TableHead>
                    <TableHead>Recipient/Sender</TableHead>
                    <TableHead>Message</TableHead>
                    <TableHead>Timestamp</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messageLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>
                        <Badge variant={log.status === 'Sent' ? 'default' : 'outline'}>
                            {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{log.to || log.from}</TableCell>
                      <TableCell>{log.message}</TableCell>
                      <TableCell>{log.timestamp}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
