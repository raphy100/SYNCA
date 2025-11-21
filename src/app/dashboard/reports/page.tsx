
"use client";

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

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

const initialReportData = [
  { id: '1', title: 'Q2 Security Summary', date: '2024-07-01', type: 'Quarterly', content: 'Summary of Q2 incidents and actions.' },
  { id: '2', title: 'Town Hall Incident Report', date: '2024-06-11', type: 'Incident', content: 'Details of the Town Hall incident.' },
  { id: '3', title: 'Annual Security Review', date: '2024-01-15', type: 'Annual', content: 'Comprehensive annual security review.' },
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
  const [reports, setReports] = useState(initialReportData);
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const generateReport = () => {
    // Create a simple mock report entry
    const now = new Date();
    const id = Date.now().toString();
    const title = `Generated Report ${now.toLocaleString()}`;
    const date = now.toISOString().split('T')[0];
    const type = 'Generated';
    const content = `Auto-generated report at ${now.toLocaleString()}`;

    const newReport = { id, title, date, type, content };
    setReports((s) => [newReport, ...s]);
    toast({ title: 'Report Generated', description: `Created "${title}"` });
  };

  const downloadReport = (report: { id: string; title: string; date: string; type: string; content?: string }) => {
    // Create CSV content for the report
    const headers = ['Title', 'Date', 'Type', 'Content'];
    const rows = [
      [report.title, report.date, report.type, report.content ?? ''],
    ];

    const csv = [headers.join(','), ...rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${report.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    toast({ title: 'Download started', description: `Downloading ${report.title}` });
  };

  const filteredReports = reports.filter((r) => filter === 'all' ? true : (r.type || '').toLowerCase() === filter);

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
                <Select onValueChange={(v) => setFilter(v)} defaultValue="all">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="incident">Incident</SelectItem>
                  <SelectItem value="annual">Annual</SelectItem>
                  <SelectItem value="generated">Generated</SelectItem>
                </SelectContent>
                </Select>
            </div>
            <Button onClick={generateReport}>Generate New Report</Button>
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
              {filteredReports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell className="font-medium">{report.title}</TableCell>
                  <TableCell>{report.date}</TableCell>
                  <TableCell>{report.type}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm" onClick={() => downloadReport(report)}>
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
