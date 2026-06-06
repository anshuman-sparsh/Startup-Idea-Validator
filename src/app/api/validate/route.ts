import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Ensure the API key is present
const apiKey = process.env.GEMINI_API_KEY;

export async function POST(req: NextRequest) {
  try {
    if (!apiKey) {
      console.error("GEMINI_API_KEY is not defined in the environment variables.");
      return NextResponse.json(
        { error: "API key configuration error. Please check your environment setup." },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { idea } = body;

    if (!idea || typeof idea !== "string" || idea.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter a valid startup idea to validate." },
        { status: 400 }
      );
    }

    // Initialize the Gemini SDK
    const genAI = new GoogleGenerativeAI(apiKey);
    
    // We use gemini-3.5-flash as requested
    const model = genAI.getGenerativeModel({
      model: "gemini-3.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const systemPrompt = `You are an elite startup analyst, venture capitalist, product strategist, and startup mentor.

Analyze the following startup idea in depth. Provide highly realistic, investor-grade, and strategic analytical evaluations. Fill in every field with realistic, qualitative details.

STARTUP IDEA:
"${idea}"

Return ONLY valid JSON matching this exact structure:
{
  "startup_name_suggestion": "A creative, catch name for this business concept",
  "one_line_summary": "A concise one-line value proposition",
  "viability_score": 75, // Integer from 0 to 100 representing overall success potential
  "market_opportunity": {
    "demand_level": "High/Medium/Low with brief rationale",
    "market_size": "Estimated target market size/TAM/SAM details",
    "timing": "Why now? Current market trends supporting this"
  },
  "target_audience": {
    "primary_users": ["Primary user segment 1", "Primary user segment 2"],
    "secondary_users": ["Secondary user segment 1", "Secondary user segment 2"],
    "customer_profile": "A description of the Ideal Customer Profile (ICP)"
  },
  "competitors": [
    {
      "name": "Competitor Name or 'Direct Competitors/Traditional Methods'",
      "strength": "What they do well",
      "weakness": "Their vulnerability or where they fall short"
    },
    {
      "name": "Second Competitor Name",
      "strength": "What they do well",
      "weakness": "Their vulnerability"
    }
  ],
  "revenue_models": ["Subscription / SaaS", "Freemium", "Usage-Based", "etc. (detail them)"],
  "risks": {
    "technical": "Specific technical hurdles or integration challenges",
    "business": "Business model risks, margins, or cost of customer acquisition (CAC)",
    "adoption": "User behavior change required, education hurdles, or onboarding friction"
  },
  "mvp_features": ["MVP feature 1 - Core functionality", "MVP feature 2", "MVP feature 3"],
  "swot": {
    "strengths": ["Strength 1", "Strength 2"],
    "weaknesses": ["Weakness 1", "Weakness 2"],
    "opportunities": ["Opportunity 1", "Opportunity 2"],
    "threats": ["Threat 1", "Threat 2"]
  },
  "roadmap": {
    "phase_1": ["Month 1-2 feature / focus", "Month 1-2 milestone"],
    "phase_2": ["Month 3-4 feature / focus", "Month 3-4 milestone"],
    "phase_3": ["Month 5-6 feature / focus", "Month 5-6 milestone"]
  },
  "verdict": "Strong Opportunity | Worth Testing | High Risk | Not Recommended (Use one of these four exactly)",
  "reasoning": "A brief strategic paragraph explaining this verdict"
}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: systemPrompt }] }],
    });

    const responseText = result.response.text();
    
    if (!responseText) {
      return NextResponse.json(
        { error: "Received an empty response from the AI model." },
        { status: 502 }
      );
    }

    // Attempt to parse JSON response from Gemini
    try {
      const parsedData = JSON.parse(responseText.trim());
      return NextResponse.json(parsedData);
    } catch (parseError) {
      console.error("Failed to parse JSON from Gemini response:", responseText, parseError);
      return NextResponse.json(
        { error: "AI output was not in the expected JSON format. Please try again." },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error("API Error in /api/validate:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred during analysis. Please try again." },
      { status: 500 }
    );
  }
}
