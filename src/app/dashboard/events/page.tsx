import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function EventsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Events</CardTitle>
        <CardDescription>Manage upcoming and past events.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Event management content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
