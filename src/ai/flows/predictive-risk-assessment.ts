'use server';

/**
 * @fileOverview An AI-powered tool that analyzes event data, social media activity, and news feeds to identify potential threats.
 *
 * - predictiveRiskAssessment - A function that provides a risk score for upcoming events.
 * - PredictiveRiskAssessmentInput - The input type for the predictiveRiskAssessment function.
 * - PredictiveRiskAssessmentOutput - The return type for the predictiveRiskAssessment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PredictiveRiskAssessmentInputSchema = z.object({
  eventData: z.string().describe('Detailed information about the event, including location, time, expected attendees, and planned activities.'),
  socialMediaActivity: z.string().describe('Recent social media posts and trends related to the event or organizers.'),
  newsFeeds: z.string().describe('Relevant news articles and reports about the event, organizers, or potential risks.'),
});
export type PredictiveRiskAssessmentInput = z.infer<typeof PredictiveRiskAssessmentInputSchema>;

const PredictiveRiskAssessmentOutputSchema = z.object({
  riskScore: z.number().describe('A numerical risk score from 0 to 100, indicating the potential threat level for the event.'),
  riskFactors: z.array(z.string()).describe('A list of factors contributing to the risk score, such as potential security threats or negative sentiment.'),
  securityRecommendations: z.string().describe('Specific recommendations for security measures to mitigate identified risks.'),
});
export type PredictiveRiskAssessmentOutput = z.infer<typeof PredictiveRiskAssessmentOutputSchema>;

export async function predictiveRiskAssessment(input: PredictiveRiskAssessmentInput): Promise<PredictiveRiskAssessmentOutput> {
  return predictiveRiskAssessmentFlow(input);
}

const predictiveRiskAssessmentPrompt = ai.definePrompt({
  name: 'predictiveRiskAssessmentPrompt',
  input: {schema: PredictiveRiskAssessmentInputSchema},
  output: {schema: PredictiveRiskAssessmentOutputSchema},
  prompt: `You are an AI-powered security analyst tasked with assessing the risk level of upcoming events. Analyze the provided event data, social media activity, and news feeds to identify potential threats and provide a risk score, contributing factors, and security recommendations.

Event Data: {{{eventData}}}

Social Media Activity: {{{socialMediaActivity}}}

News Feeds: {{{newsFeeds}}}

Based on this information, provide a riskScore (0-100), a list of riskFactors, and securityRecommendations to mitigate potential risks.
`,
});

const predictiveRiskAssessmentFlow = ai.defineFlow(
  {
    name: 'predictiveRiskAssessmentFlow',
    inputSchema: PredictiveRiskAssessmentInputSchema,
    outputSchema: PredictiveRiskAssessmentOutputSchema,
  },
  async input => {
    const {output} = await predictiveRiskAssessmentPrompt(input);
    return output!;
  }
);
