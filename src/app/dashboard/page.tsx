import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { PredictiveRiskForm } from "./predictive-risk-form";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge className="bg-green-600 hover:bg-green-700 text-lg">
                SAFE
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground pt-2">
              All systems normal. No active threats.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Event</CardTitle>
            <Badge variant="secondary">Live</Badge>
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">Town Hall Meeting</div>
            <p className="text-xs text-muted-foreground">
              City Hall - 2:00 PM - 4:00 PM
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">On-Duty</div>
            <p className="text-xs text-muted-foreground">
              Alpha & Bravo teams are active.
            </p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Wearable</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Connected</div>
            <p className="text-xs text-muted-foreground">
              Smartwatch battery at 87%.
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>
              A log of recent security alerts and incidents.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Event</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Charity Gala</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      False alarm triggered.
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">Resolved</Badge>
                  </TableCell>
                  <TableCell>2023-06-23</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Press Conference</div>
                     <div className="hidden text-sm text-muted-foreground md:inline">
                      Manual check-in missed.
                    </div>
                  </TableCell>
                  <TableCell>
                     <Badge variant="outline">Resolved</Badge>
                  </TableCell>
                  <TableCell>2023-06-24</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Predictive Risk Assessment</CardTitle>
            <CardDescription>
              Use AI to analyze potential threats for an upcoming event.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <PredictiveRiskForm />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
