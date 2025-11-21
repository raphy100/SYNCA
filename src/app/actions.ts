"use server";

import {
  predictiveRiskAssessment,
  type PredictiveRiskAssessmentInput,
  type PredictiveRiskAssessmentOutput,
} from "@/ai/flows/predictive-risk-assessment";

export async function getPredictiveRiskAssessment(
  input: PredictiveRiskAssessmentInput
): Promise<PredictiveRiskAssessmentOutput> {
  try {
    const result = await predictiveRiskAssessment(input);
    return result;
  } catch (error) {
    console.error("Error in predictiveRiskAssessment flow:", error);
    throw new Error("Failed to get predictive risk assessment.");
  }
}
