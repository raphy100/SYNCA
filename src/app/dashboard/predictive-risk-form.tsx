"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { getPredictiveRiskAssessment } from "@/app/actions";
import type { PredictiveRiskAssessmentOutput } from "@/ai/flows/predictive-risk-assessment";
import { Loader2, AlertTriangle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  LabelList,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  eventData: z
    .string()
    .min(10, "Please provide more details about the event."),
  socialMediaActivity: z.string().optional(),
  newsFeeds: z.string().optional(),
});

export function PredictiveRiskForm() {
  const [result, setResult] =
    useState<PredictiveRiskAssessmentOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventData: "",
      socialMediaActivity: "",
      newsFeeds: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await getPredictiveRiskAssessment({
        eventData: values.eventData,
        socialMediaActivity: values.socialMediaActivity || "not provided",
        newsFeeds: values.newsFeeds || "not provided",
      });
      setResult(response);
    } catch (e) {
      setError("Failed to get risk assessment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const riskChartData = result
    ? [{ name: "Risk", value: result.riskScore, fill: "hsl(var(--destructive))" }]
    : [];

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="eventData"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Event Data</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Town hall at City Park, June 30th, 2-4pm, approx. 200 attendees."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="socialMediaActivity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Social Media Context (Optional)</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Recent negative comments on Twitter regarding the event."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Assess Risk"
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <div className="mt-4 text-center text-destructive flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4"/>
            {error}
        </div>
      )}

      {result && (
        <div className="mt-6 space-y-4">
          <Separator />
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Risk Score</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-20">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={riskChartData} layout="vertical" margin={{ left: -30 }}>
                        <XAxis type="number" domain={[0, 100]} hide />
                        <YAxis type="category" dataKey="name" hide />
                        <Bar dataKey="value" radius={[0, 5, 5, 0]}>
                            <LabelList dataKey="value" position="right" offset={10} className="fill-foreground font-bold" formatter={(value: number) => `${value}/100`}/>
                        </Bar>
                        </BarChart>
                    </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-lg">Contributing Factors</CardTitle>
            </CardHeader>
            <CardContent>
                 <ul className="list-disc space-y-1 pl-5 text-sm text-muted-foreground">
                    {result.riskFactors.map((factor, index) => (
                    <li key={index}>{factor}</li>
                    ))}
                </ul>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="pb-2">
                <CardTitle className="text-lg">Security Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">
                    {result.securityRecommendations}
                </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
