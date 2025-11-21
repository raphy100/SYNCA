
'use client';

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
import { Calendar as CalendarIcon, PlusCircle, Edit, Trash2, FileText } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { useState } from 'react';

const initialUpcoming = [
  { id: '1', name: 'Annual Charity Gala', date: '2024-08-15', location: 'Grand Ballroom', status: 'Planned' },
  { id: '2', name: 'Tech Conference 2024', date: '2024-09-20', location: 'Convention Center', status: 'Planned' },
];

const initialPast = [
  { id: '3', name: 'Town Hall Meeting', date: '2024-06-10', location: 'City Hall', status: 'Completed' },
  { id: '4', name: 'Summer Festival', date: '2024-07-22', location: 'Central Park', status: 'Completed' },
];

export default function EventsPage() {
  const [upcomingEvents, setUpcomingEvents] = useState(initialUpcoming);
  const [pastEvents] = useState(initialPast);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');

  const createEvent = () => {
    if (!name || !date) return;

    const newEvent = {
      id: Date.now().toString(),
      name,
      date,
      location,
      status: 'Planned',
    };

    setUpcomingEvents((s) => [newEvent, ...s]);
    // reset form
    setName('');
    setDate('');
    setLocation('');
    setDescription('');
    setOpen(false);
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Events</CardTitle>
            <CardDescription>Manage upcoming and past events.</CardDescription>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => setOpen(true)}>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Event
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a New Event</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="eventName">Event Name</Label>
                  <Input id="eventName" placeholder="e.g., Annual Charity Gala" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="eventDate">Date</Label>
                  <Input id="eventDate" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="eventLocation">Location</Label>
                  <Input id="eventLocation" placeholder="e.g., Grand Ballroom" value={location} onChange={(e) => setLocation(e.target.value)} />
                </div>
                 <div className="grid gap-2">
                  <Label htmlFor="eventDescription">Description</Label>
                  <Textarea id="eventDescription" placeholder="Provide a brief description of the event." value={description} onChange={(e) => setDescription(e.target.value)} />
                </div>
                <Button className="w-full" onClick={createEvent}>Create Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="upcoming">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {upcomingEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell><Badge variant="secondary">{event.status}</Badge></TableCell>
                      <TableCell className="text-right">
                         <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                           <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="past" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Event</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                     <TableHead className="text-right">Report</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pastEvents.map((event) => (
                    <TableRow key={event.id}>
                      <TableCell className="font-medium">{event.name}</TableCell>
                      <TableCell>{event.date}</TableCell>
                      <TableCell>{event.location}</TableCell>
                      <TableCell><Badge variant="outline">{event.status}</Badge></TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm"><FileText className="mr-2 h-4 w-4" />View</Button>
                      </TableCell>
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
