import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Configure your application settings.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Settings content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
