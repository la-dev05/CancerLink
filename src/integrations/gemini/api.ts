// Types for request and response
export interface DiseaseAnalysisRequest {
  symptoms: string;
  age?: string;
  gender?: string;
  location?: string;
  additionalInfo?: string;
}

export interface NearbyFacility {
  name: string;
  distance: string;
  address: string;
  phone: string;
  specialties: string[];
  rating?: number;
  reviewCount?: number;
}

export interface PossibleConcern {
  name: string;
  matchScore: string;
  description: string;
  recommendedAction: string;
}

export interface DiseaseAnalysisResponse {
  possibleConcerns: PossibleConcern[];
  recommendations: string[];
  nearbyFacilities: NearbyFacility[];
  disclaimer: string;
}

/**
 * Analyzes disease based on user inputs using the Gemini API
 */
export async function analyzeDisease(
  request: DiseaseAnalysisRequest
): Promise<DiseaseAnalysisResponse> {
  // Replace with your actual API key or use environment variable

  const apiKey =
    process.env.NEXT_PUBLIC_GEMINI_API_KEY || "Please enter your API key here";


  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

  // Format the prompt for better results
  const promptText = `
    As a medical AI assistant, analyze these symptoms and provide possible concerns, recommendations, and nearby care facilities:

    SYMPTOMS: ${request.symptoms}
    ${request.age ? `AGE: ${request.age}` : ""}
    ${request.gender ? `GENDER: ${request.gender}` : ""}
    ${request.location ? `LOCATION: ${request.location}` : ""}
    ${
      request.additionalInfo ? `ADDITIONAL INFO: ${request.additionalInfo}` : ""
    }

    Respond with a JSON object that has the following structure:
    {
      "possibleConcerns": [
        {
          "name": "Condition Name",
          "matchScore": "High/Moderate/Low",
          "description": "Brief description of this possible condition",
          "recommendedAction": "What the patient should do about this"
        }
      ],
      "recommendations": [
        "First recommendation",
        "Second recommendation"
      ],
      "nearbyFacilities": [
        {
          "name": "Hospital Name",
          "distance": "X miles",
          "address": "Full address",
          "phone": "Phone number",
          "specialties": ["Specialty 1", "Specialty 2"]
        }
      ],
      "disclaimer": "Medical disclaimer text"
    }

    Base your hospital recommendations on facilities with high reviews and ratings that specialize in treating the identified conditions.
  `;

  try {
    const response = await fetch(`${endpoint}?key=${apiKey}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: promptText }],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }

    const data = await response.json();

    // Extract the actual text response from Gemini
    const responseText = data.candidates[0].content.parts[0].text;

    // Find the JSON object in the response text
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Could not parse JSON from Gemini response");
    }

    // Parse the JSON response
    const parsedResponse = JSON.parse(jsonMatch[0]) as DiseaseAnalysisResponse;

    // Add default values if any sections are missing
    return {
      possibleConcerns: parsedResponse.possibleConcerns || [],
      recommendations: parsedResponse.recommendations || [],
      nearbyFacilities: parsedResponse.nearbyFacilities || [],
      disclaimer:
        parsedResponse.disclaimer ||
        "This analysis is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.",
    };
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // Return mock data in case of error to prevent UI breaking
    return {
      possibleConcerns: [
        {
          name: "API Error",
          matchScore: "Low",
          description:
            "We encountered an error processing your request. Please try again later.",
          recommendedAction:
            "Please try again or contact support if the problem persists.",
        },
      ],
      recommendations: ["Try again later", "Refresh your browser"],
      nearbyFacilities: [],
      disclaimer:
        "This analysis is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns.",
    };
  }
}
