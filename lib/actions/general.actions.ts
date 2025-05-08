"use server";

import { feedbackSchema } from "@/constants";
import { auth, db } from "@/firebase/admin";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";

export async function getInterviewByUserId(
  userId: string
): Promise<Interview[] | null> {
  if (!userId) return null;
  const interviews = await db
    .collection("interviews")
    .where("userId", "==", userId)
    .orderBy("createdAt", "desc")
    .get();

  return interviews.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as Interview[];
}

// export async function getLatestInterview(
//   params: GetLatestInterviewsParams
// ): Promise<Interview[] | null> {
//   const { userId, limit = 6 } = params;
//   const interviews = await db
//     .collection("interviews")
//     .where("finalized", "==", true)
//     .where("userId", "!=", userId)
//     .limit(limit)
//     .get();

//   return interviews.docs.map((doc) => ({
//     ...doc.data(),
//     id: doc.id,
//   })) as Interview[];
// }

export async function getInterviewId(id: string): Promise<Interview | null> {
  const interview = await db.collection("interviews").doc(id).get();

  return interview.data() as Interview | null;
}

export async function createFeedback(params: CreateFeedbackParams) {
  const { interviewId, userId, transcript } = params;

  try {
    const formattedTranscript = transcript
      .map(
        (sentence: { role: string; content: string }) =>
          `${sentence.role}: ${sentence.content}\n`
      )
      .join("");

    const {
      object: {
        totalScore,
        categoryScores,
        strengths,
        areasForImprovement,
        finalAssessment,
      },
    } = await generateObject({
      model: google("gemini-2.0-flash-001", {
        structuredOutputs: false,
      }),
      schema: feedbackSchema,
      prompt: `
      You are an AI interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories. Be thorough and detailed in your analysis. Don't be lenient with the candidate. If there are mistakes or areas for improvement, point them out.
      Transcript:
      ${formattedTranscript}

      Please score the candidate from 0 to 100 in the following areas. Do not add categories other than the ones provided:
      - **Communication Skills**: Clarity, articulation, structured responses.
      - **Technical Knowledge**: Understanding of key concepts for the role.
      - **Problem-Solving**: Ability to analyze problems and propose solutions.
      - **Cultural & Role Fit**: Alignment with company values and job role.
      - **Confidence & Clarity**: Confidence in responses, engagement, and clarity.
      `,
      system:
        "You are a professional interviewer analyzing a mock interview. Your task is to evaluate the candidate based on structured categories",
    });

    const feedback = await db.collection("feedback").add({
      interviewId,
      userId,
      totalScore,
      categoryScores,
      strengths,
      areasForImprovement,
      finalAssessment,
      createdAt: new Date().toISOString(),
    });
    return {
      success: true,
      feedbackId: feedback.id,
    };
  } catch (error) {
    console.log("Error saving feedback", error);
    return {
      success: false,
      feedbackId: null,
    };
  }
}

export async function getFeedbackByInterviewId(
  params: GetFeedbackByInterviewIdParams
): Promise<Feedback | null> {
  const { interviewId, userId } = params;

  try {
    const feedback = await db
      .collection("feedback")
      .where("interviewId", "==", interviewId)
      .where("userId", "==", userId)
      .limit(1)
      .get();

    if (feedback.empty) return null;

    const feedbackDoc = feedback.docs[0];
    return {
      id: feedbackDoc.id,
      ...feedbackDoc.data(),
    } as Feedback;
  } catch (error) {
    console.log("Error fetching feedback", error);
    return null;
  }
}

//Get those interviews that have feedback
export async function getInterviewsWithFeedback(
  userId: string
): Promise<Interview[] | null> {
  if (!userId) return null;

  try {
    const interviewsSnapshot = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .where("finalized", "==", true)
      .get();

    if (interviewsSnapshot.empty) return [];

    const interviewDocs = interviewsSnapshot.docs;

    const interviewsWithFeedback: Interview[] = [];

    for (const doc of interviewDocs) {
      const interview = {
        ...doc.data(),
        id: doc.id,
      } as Interview;

      const feedbackSnapshot = await db
        .collection("feedback")
        .where("interviewId", "==", interview.id)
        .where("userId", "==", userId)
        .limit(1)
        .get();

      if (!feedbackSnapshot.empty) {
        interviewsWithFeedback.push(interview);
      }
    }

    return interviewsWithFeedback;
  } catch (error) {
    console.error("Error fetching interviews with feedback:", error);
    return null;
  }
}

//Interviews without feedback
export async function getInterviewsWithoutFeedback(
  userId: string
): Promise<Interview[] | null> {
  if (!userId) return null;

  try {
    const interviewsSnapshot = await db
      .collection("interviews")
      .where("userId", "==", userId)
      .where("finalized", "==", true)
      .get();

    if (interviewsSnapshot.empty) return [];

    const interviewDocs = interviewsSnapshot.docs;

    const interviewsWithoutFeedback: Interview[] = [];

    for (const doc of interviewDocs) {
      const interview = {
        ...doc.data(),
        id: doc.id,
      } as Interview;

      const feedbackSnapshot = await db
        .collection("feedback")
        .where("interviewId", "==", interview.id)
        .where("userId", "==", userId)
        .limit(1)
        .get();

      if (feedbackSnapshot.empty) {
        interviewsWithoutFeedback.push(interview);
      }
    }

    return interviewsWithoutFeedback;
  } catch (error) {
    console.error("Error fetching interviews without feedback:", error);
    return null;
  }
}