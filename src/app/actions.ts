"use server";

import { GoogleGenAI, Type } from "@google/genai";

// Initialize SDK safely
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function parsePrescriptionAction(
  base64Data: string,
  mimeType: string,
  fileName: string,
) {
  try {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("Missing GEMINI_API_KEY environment variable.");
    }

    const systemInstruction =
      "You are an expert clinical data parsing engine. Analyze the provided medical document image or PDF. " +
      "Accurately extract and classify information into the requested JSON schema. Categorize medicines strictly into " +
      "'Antibiotics', 'Vitamins', 'Calcium', 'Gastric Medicine', or 'Others' based on medical classifications.";

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          inlineData: {
            data: base64Data,
            mimeType: mimeType,
          },
        },
        "Extract the clinical details from this prescription document.",
      ],
      config: {
        systemInstruction,
        // Enforce strict schema response output matching our TypeScript interface types
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            doctorName: { type: Type.STRING },
            date: {
              type: Type.STRING,
              description:
                "ISO date format YYYY-MM-DD. Use today's date if missing.",
            },
            patientCase: {
              type: Type.STRING,
              description:
                "Summary of clinical case history, symptoms, or reason for visit.",
            },
            vitals: {
              type: Type.OBJECT,
              properties: {
                respiratoryRate: { type: Type.STRING },
                bloodPressure: { type: Type.STRING },
              },
              required: ["respiratoryRate", "bloodPressure"],
            },
            medicines: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  name: { type: Type.STRING },
                  dosage: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  category: {
                    type: Type.STRING,
                    enum: [
                      "Antibiotics",
                      "Vitamins",
                      "Calcium",
                      "Gastric Medicine",
                      "Others",
                    ],
                  },
                },
                required: ["name", "dosage", "duration", "category"],
              },
            },
            testResults: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  testName: { type: Type.STRING },
                  value: {
                    type: Type.NUMBER,
                    description: "Extract the numeric result value clearly.",
                  },
                  unit: { type: Type.STRING },
                },
                required: ["testName", "value", "unit"],
              },
            },
          },
          required: [
            "doctorName",
            "date",
            "patientCase",
            "vitals",
            "medicines",
            "testResults",
          ],
        },
      },
    });

    const parsedText = response.text;
    if (!parsedText) {
      throw new Error("AI Engine returned an empty conversion structure.");
    }

    return { success: true, data: JSON.parse(parsedText) };
  } catch (error: unknown) {
    const msg =
      error instanceof Error
        ? error.message
        : "Unknown error during AI parsing execution.";
    return { success: false, error: msg };
  }
}
