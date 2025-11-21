
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
import { Button } from '@/components/ui/button';
import { Download, Filter } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const reportData = [
  { id: '1', title: 'Q2 Security Summary', date: '2024-07-01', type: 'Quarterly' },
  { id: '2', title: 'Town Hall Incident Report', date: '2024-06-11', type: 'Incident' },
  { id: '3', title: 'Annual Security Review', date: '2024-01-15', type: 'Annual' },
];

const chartData = [
    { name: 'Jan', incidents: 4, falseAlarms: 2 },
    { name: 'Feb', incidents: 3, falseAlarms: 1 },
    { name: 'Mar', incidents: 5, falseAlarms: 3 },
    { name: 'Apr', incidents: 4, falseAlarms: 2 },
    { name: 'May', incidents: 6, falseAlarms: 4 },
    { name: 'Jun', incidents: 5, falseAlarms: 1 },
];


export default function ReportsPage() {
  return (
    <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle>Incident Analytics</CardTitle>
                <CardDescription>Monthly incident and false alarm trends.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={chartData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="incidents" fill="hsl(var(--destructive))" name="Incidents" />
                            <Bar dataKey="falseAlarms" fill="hsl(var(--primary))" name="False Alarms" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
      <Card>
        <CardHeader>
          <CardTitle>Security Reports</CardTitle>
          <CardDescription>
            View, generate, and download security reports.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-4 gap-2">
            <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select defaultValue="all">
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="quarterly">Quarterly</SelectItem>
                    <SelectItem value="incident">Incident</SelectItem>
                    <SelectItem value="annual">Annual</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <Button>Generate New Report</Button>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reportData.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
