import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>View and generate security reports.</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Reports content will be displayed here.</p>
      </CardContent>
    </Card>
  );
}
