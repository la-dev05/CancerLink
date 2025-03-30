import { useState } from "react";
import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Search,
  AlertCircle,
  ArrowRight,
  CheckCircle,
  XCircle,
  MapPin,
  FlaskConical,
  FileQuestion,
  Brain,
  Building2,
  Star,
  Clock,
  DollarSign,
  BadgePercent,
  Phone,
  Mail,
  Globe,
  ExternalLink,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  analyzeDisease,
  DiseaseAnalysisResponse,
} from "@/integrations/gemini/api";
import { useEffect } from "react";

// Mock data for symptom analysis
const mockAnalysisResult = {
  possibleConcerns: [
    {
      name: "Breast Cancer",
      matchScore: "Moderate",
      description:
        "Some symptoms align with possible breast cancer warning signs. This does not mean you have cancer, but these symptoms warrant discussion with a healthcare provider.",
      recommendedAction:
        "Schedule an appointment with your primary care physician or gynecologist for evaluation.",
    },
    {
      name: "Fibrocystic Breast Changes",
      matchScore: "High",
      description:
        "Your symptoms strongly align with fibrocystic breast changes, which are common, non-cancerous changes that many women experience.",
      recommendedAction:
        "Discuss with your healthcare provider at your next regular appointment.",
    },
    {
      name: "Mastitis",
      matchScore: "Low",
      description:
        "Some symptoms may indicate mastitis, an infection of breast tissue, especially if you're breastfeeding.",
      recommendedAction:
        "If you're experiencing pain, redness, warmth, or have a fever, contact your healthcare provider promptly.",
    },
  ],
  recommendations: [
    "Schedule a comprehensive breast examination with a healthcare provider",
    "Consider diagnostic imaging (mammogram, ultrasound) as recommended by your provider",
    "Track your symptoms, noting any changes or patterns",
    "Continue breast self-exams monthly",
  ],
};

// Mock data for cancer care facilities
const facilities = [
  {
    id: 1,
    name: "Memorial Cancer Center",
    type: "Private",
    location: "Boston, MA",
    address: "123 Medical Drive, Boston, MA 02118",
    phone: "(555) 123-4567",
    website: "https://www.memorialcancercenter.org",
    email: "info@memorialcancercenter.org",
    rating: 4.8,
    reviewCount: 235,
    yearsOperating: 25,
    costRating: 3, // 1-5 scale, 5 being most expensive
    specialties: [
      "Breast Cancer",
      "Prostate Cancer",
      "Lung Cancer",
      "Clinical Trials",
    ],
    treatments: [
      "Surgery",
      "Chemotherapy",
      "Radiation Therapy",
      "Immunotherapy",
    ],
    insuranceAccepted: ["Medicare", "Blue Cross", "Aetna", "UnitedHealthcare"],
    description:
      "A leading private cancer treatment center with state-of-the-art technology and a multidisciplinary approach to patient care.",
    relevance: 95, // Relevance score based on symptoms
  },
  {
    id: 2,
    name: "City General Hospital - Oncology",
    type: "Government",
    location: "Boston, MA",
    address: "456 Healthcare Avenue, Boston, MA 02215",
    phone: "(555) 987-6543",
    website: "https://www.citygeneralhospital.gov/oncology",
    email: "oncology@citygeneralhospital.gov",
    rating: 4.5,
    reviewCount: 189,
    yearsOperating: 35,
    costRating: 2,
    specialties: [
      "Colorectal Cancer",
      "Leukemia",
      "Lymphoma",
      "Pediatric Oncology",
      "Breast Cancer",
    ],
    treatments: [
      "Surgery",
      "Chemotherapy",
      "Radiation Therapy",
      "Stem Cell Transplant",
    ],
    insuranceAccepted: ["Medicare", "Medicaid", "Most Major Insurers"],
    description:
      "A comprehensive government-funded cancer care department within Boston's largest public hospital.",
    relevance: 82,
  },
  {
    id: 3,
    name: "Breakthrough Cancer Institute",
    type: "Private",
    location: "Cambridge, MA",
    address: "789 Research Parkway, Cambridge, MA 02142",
    phone: "(555) 456-7890",
    website: "https://www.breakthroughcancer.org",
    email: "info@breakthroughcancer.org",
    rating: 4.9,
    reviewCount: 156,
    yearsOperating: 12,
    costRating: 5,
    specialties: [
      "Precision Medicine",
      "Genomic Testing",
      "Rare Cancers",
      "Clinical Trials",
      "Breast Cancer",
    ],
    treatments: [
      "Targeted Therapy",
      "Immunotherapy",
      "Experimental Treatments",
      "Precision Radiation",
    ],
    insuranceAccepted: [
      "Blue Cross Premium",
      "Aetna Select",
      "UnitedHealthcare Elite",
      "Self-Pay Options",
    ],
    description:
      "A cutting-edge research institution focused on innovative cancer treatments and personalized medicine approaches.",
    relevance: 78,
  },
  {
    id: 4,
    name: "Community Cancer Network",
    type: "Non-profit",
    location: "Somerville, MA",
    address: "321 Hope Street, Somerville, MA 02143",
    phone: "(555) 789-0123",
    website: "https://www.communitycancer.org",
    email: "support@communitycancer.org",
    rating: 4.7,
    reviewCount: 205,
    yearsOperating: 18,
    costRating: 2,
    specialties: [
      "Breast Cancer",
      "Prostate Cancer",
      "Community Outreach",
      "Supportive Care",
    ],
    treatments: [
      "Standard Treatments",
      "Holistic Support",
      "Nutrition Therapy",
      "Support Groups",
    ],
    insuranceAccepted: [
      "All Major Insurance",
      "Medicare",
      "Medicaid",
      "Sliding Scale Options",
    ],
    description:
      "A community-based network that combines quality cancer care with comprehensive support services in an affordable setting.",
    relevance: 90,
  },
];

// Stars display component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        className="h-4 w-4 fill-yellow-400 text-yellow-400"
      />
    );
  }

  if (halfStar) {
    stars.push(
      <svg
        key="half"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4 text-yellow-400"
      >
        <path d="M12 17.8 5.8 21 7 14.1 2 9.3l7-1L12 2" fill="#FBBF24" />
        <path d="M12 2v15.8l3.2 3.2L18 15.1l5-4.8-7-1L12 2Z" />
      </svg>
    );
  }

  const emptyStarsCount = 5 - stars.length;
  for (let i = 0; i < emptyStarsCount; i++) {
    stars.push(<Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />);
  }

  return <div className="flex">{stars}</div>;
};

// Cost indicator component
const CostIndicator = ({ level }: { level: number }) => {
  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((num) => (
        <DollarSign
          key={num}
          className={`h-4 w-4 ${
            num <= level ? "text-green-600" : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

// Match score badge component
const MatchScoreBadge = ({ score }: { score: string }) => {
  let variant: "outline" | "default" | "secondary" | "destructive" = "outline";
  let icon = null;

  switch (score) {
    case "High":
      variant = "destructive";
      icon = <AlertCircle className="h-3 w-3 mr-1" />;
      break;
    case "Moderate":
      variant = "secondary";
      icon = <FileQuestion className="h-3 w-3 mr-1" />;
      break;
    case "Low":
      variant = "outline";
      icon = <CheckCircle className="h-3 w-3 mr-1" />;
      break;
    default:
      break;
  }

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {score} match
    </Badge>
  );
};

// Facility relevance badge component
const RelevanceBadge = ({ score }: { score: number }) => {
  let variant: "outline" | "default" | "secondary" | "destructive" = "outline";
  let label = "Low Match";

  if (score >= 90) {
    variant = "destructive";
    label = "High Match";
  } else if (score >= 80) {
    variant = "secondary";
    label = "Good Match";
  } else if (score >= 70) {
    variant = "default";
    label = "Moderate Match";
  }

  return (
    <Badge variant={variant} className="flex items-center">
      {score}% - {label}
    </Badge>
  );
};

// Facility card component
const FacilityCard = ({ facility }: { facility: (typeof facilities)[0] }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{facility.name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building2 className="h-4 w-4 mr-1" /> {facility.type} •
              <MapPin className="h-4 w-4 ml-1 mr-1" /> {facility.location}
            </CardDescription>
          </div>
          <RelevanceBadge score={facility.relevance} />
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Rating</p>
            <div className="flex items-center">
              <StarRating rating={facility.rating} />
              <span className="text-sm ml-2">({facility.reviewCount})</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Cost Level</p>
            <CostIndicator level={facility.costRating} />
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Experience</p>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{facility.yearsOperating} years</span>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Insurance</p>
            <div className="flex items-center">
              <BadgePercent className="h-4 w-4 mr-1 text-muted-foreground" />
              <span>{facility.insuranceAccepted.length} plans</span>
            </div>
          </div>
        </div>

        <p className="text-sm mb-4">{facility.description}</p>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Top specialties:</h4>
          <div className="flex flex-wrap gap-2">
            {facility.specialties.slice(0, 3).map((specialty, index) => (
              <span
                key={index}
                className={`px-2 py-1 text-xs rounded-full ${
                  specialty.toLowerCase().includes("breast")
                    ? "bg-cancer-purple/20 text-cancer-purple font-medium"
                    : "bg-muted"
                }`}
              >
                {specialty}
              </span>
            ))}
            {facility.specialties.length > 3 && (
              <span className="px-2 py-1 bg-muted text-xs rounded-full">
                +{facility.specialties.length - 3} more
              </span>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm">
          <Phone className="h-4 w-4 mr-2" />
          Contact
        </Button>
        <Button size="sm">View Details</Button>
      </CardFooter>
    </Card>
  );
};

const SymptomCareLocator = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [activeTab, setActiveTab] = useState("recommendations");
  const [dynamicAnalysisResult, setDynamicAnalysisResult] =
    useState<DiseaseAnalysisResponse | null>(null);

  const handleAnalyze = async () => {
    if (!symptoms.trim()) return;

    setIsAnalyzing(true);

    try {
      const analysisResult = await analyzeDisease({
        symptoms,
        age,
        gender,
        location,
        additionalInfo,
      });

      console.log(analysisResult);

      setDynamicAnalysisResult(analysisResult);
      setShowResults(true);
    } catch (error) {
      console.error("Error analyzing disease:", error);
      alert("Failed to analyze symptoms. Please try again later.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Function to display formatted results in the output box
  const displayFormattedResults = (results: DiseaseAnalysisResponse): void => {
    const outputBox = document.getElementById("output-box");
    if (!outputBox) return;

    // Make sure we have possible concerns before trying to access them
    if (!results.possibleConcerns || results.possibleConcerns.length === 0) {
      outputBox.innerHTML =
        '<div class="p-4">No analysis results available.</div>';
      return;
    }

    // Create formatted HTML content with hospital reviews and ratings
    let htmlContent = `
        <div class="p-4">
          <h3 class="text-lg font-medium mb-2">Analysis Summary</h3>
          <p class="mb-4">Based on your symptoms and personal information, we've analyzed potential health concerns and matched you with appropriate care facilities.</p>
          
          <div class="mb-4">
            <h4 class="font-medium mb-1">Primary Concern:</h4>
            <p>${results.possibleConcerns[0].name} (${results.possibleConcerns[0].matchScore} match)</p>
            <p class="text-sm text-muted-foreground">${results.possibleConcerns[0].description}</p>
          </div>`;

    // Only add the hospitals section if there are facilities to display
    if (results.nearbyFacilities && results.nearbyFacilities.length > 0) {
      htmlContent += `
          <div class="mb-4">
            <h4 class="font-medium mb-1">Best Matched Hospitals:</h4>
            <ul class="list-disc pl-5">
              ${results.nearbyFacilities
                .map((facility, index) => {
                  // Skip after top 3 facilities
                  if (index >= 3) return "";

                  // Generate stars for ratings
                  const rating = facility.rating || 4.5;
                  const fullStars = Math.floor(rating);
                  const halfStar = rating % 1 >= 0.5;
                  let starsHtml = "";

                  for (let i = 0; i < fullStars; i++) {
                    starsHtml += "★";
                  }
                  if (halfStar) {
                    starsHtml += "½";
                  }

                  const reviewCount = facility.reviewCount || "N/A";
                  const specialties = facility.specialties
                    ? facility.specialties.join(", ")
                    : "General Care";

                  return `
                  <li class="mb-2">
                    <div><strong>${facility.name}</strong> - ${facility.distance}</div>
                    <div class="text-xs text-yellow-500">${starsHtml} (${reviewCount} reviews)</div>
                    <div class="text-xs">Specialties: ${specialties}</div>
                  </li>
                `;
                })
                .join("")}
            </ul>
          </div>`;
    }

    htmlContent += `
          <div class="text-xs text-muted-foreground">
            <p class="mb-2">Note: Hospital recommendations are based on specialties, ratings, and proximity to your location.</p>
            <p>${results.disclaimer}</p>
          </div>
        </div>
      `;

    // Set the HTML content
    outputBox.innerHTML = htmlContent;

    // Make the output box visible and styled
    outputBox.classList.remove("hidden");
    outputBox.classList.add(
      "bg-muted",
      "border",
      "rounded-lg",
      "mb-6",
      "shadow-sm"
    );
  };

  useEffect(() => {
    if (showResults && dynamicAnalysisResult) {
      displayFormattedResults(dynamicAnalysisResult);
    }
  }, [showResults, dynamicAnalysisResult]);

  const resetAnalysis = () => {
    setShowResults(false);
  };

  // Mock data for filters
  const cancerTypes = [
    "All Types",
    "Breast Cancer",
    "Prostate Cancer",
    "Lung Cancer",
    "Colorectal Cancer",
    "Leukemia",
    "Lymphoma",
    "Melanoma",
    "Thyroid Cancer",
    "Bladder Cancer",
    "Kidney Cancer",
  ];

  const treatmentTypes = [
    "All Treatments",
    "Surgery",
    "Chemotherapy",
    "Radiation Therapy",
    "Immunotherapy",
    "Targeted Therapy",
    "Hormone Therapy",
    "Stem Cell Transplant",
    "Precision Medicine",
  ];

  return (
    <Layout>
      <div className="py-12 md:py-16 container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter mb-4">
            AI-Powered Symptom & Care Finder
          </h1>
          <p className="text-muted-foreground text-lg">
            Describe your symptoms and we'll analyze them to find the most
            appropriate care centers for your needs.
          </p>
        </div>

        <div className="grid gap-10">
          {!showResults ? (
            <Card>
              <CardHeader>
                <CardTitle>Symptom Analysis & Care Finder</CardTitle>
                <CardDescription>
                  Describe your symptoms and get AI-powered guidance on
                  potential concerns and specialized care centers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="symptoms" className="text-sm font-medium">
                      Describe your symptoms{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      id="symptoms"
                      value={symptoms}
                      onChange={(e) => setSymptoms(e.target.value)}
                      placeholder="Example: I've noticed a painless lump in my left breast that wasn't there a month ago. It doesn't move much when I touch it. No skin changes or nipple discharge."
                      rows={5}
                      className="resize-none"
                    />
                  </div>

                  <div className="grid gap-6 md:grid-cols-3">
                    <div className="space-y-2">
                      <label htmlFor="age" className="text-sm font-medium">
                        Age
                      </label>
                      <Input
                        id="age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        placeholder="e.g., 45"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="gender" className="text-sm font-medium">
                        Gender
                      </label>
                      <select
                        id="gender"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 h-10"
                      >
                        <option value="">Select</option>
                        <option value="female">Female</option>
                        <option value="male">Male</option>
                        <option value="non-binary">Non-binary</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="location" className="text-sm font-medium">
                        Location
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          id="location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          placeholder="City or Zip"
                          className="pl-9"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="additional-info"
                      className="text-sm font-medium"
                    >
                      Additional Information (optional)
                    </label>
                    <Textarea
                      id="additional-info"
                      value={additionalInfo}
                      onChange={(e) => setAdditionalInfo(e.target.value)}
                      placeholder="Any relevant medical history, medications, or recent changes in health..."
                      rows={3}
                      className="resize-none"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-4">
                <Button
                  onClick={handleAnalyze}
                  disabled={!symptoms.trim() || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Analyzing Symptoms & Finding Care...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze Symptoms & Find Care
                    </>
                  )}
                </Button>
                <div className="flex items-center text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <p>
                    This tool is not a substitute for professional medical
                    advice, diagnosis, or treatment.
                  </p>
                </div>
              </CardFooter>
            </Card>
          ) : (
            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>Symptom Analysis Results</CardTitle>
                      <CardDescription>
                        AI-generated assessment based on your reported symptoms
                      </CardDescription>
                    </div>
                    <Button variant="outline" size="sm" onClick={resetAnalysis}>
                      Start New Analysis
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <Brain className="h-5 w-5 mr-2 text-cancer-purple" />
                      Possible Concerns
                    </h3>
                    <div className="space-y-4">
                      {mockAnalysisResult.possibleConcerns.map(
                        (concern, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{concern.name}</h4>
                              <MatchScoreBadge score={concern.matchScore} />
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {concern.description}
                            </p>
                            <div className="bg-muted rounded-lg p-3">
                              <p className="text-sm font-medium">
                                Recommended Action:
                              </p>
                              <p className="text-sm">
                                {concern.recommendedAction}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3 flex items-center">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                      Recommendations
                    </h3>
                    <ul className="space-y-2">
                      {mockAnalysisResult.recommendations.map(
                        (recommendation, index) => (
                          <li key={index} className="flex items-center">
                            <ArrowRight className="h-4 w-4 mr-2 text-cancer-purple" />
                            <span className="text-sm">{recommendation}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">
                    Recommended Care Centers
                  </h2>
                </div>
                <Tabs
                  defaultValue="recommendations"
                  onValueChange={setActiveTab}
                  value={activeTab}
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="recommendations">
                      Recommendations
                    </TabsTrigger>
                    <TabsTrigger value="map">Map View</TabsTrigger>
                    <TabsTrigger value="compare">Compare</TabsTrigger>
                  </TabsList>

                  <div>
                    <TabsContent value="recommendations" className="mt-0">
                      <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                          <p className="text-sm text-muted-foreground">
                            <strong>4</strong> care centers match your needs
                          </p>
                          <Badge
                            variant="outline"
                            className="flex items-center"
                          >
                            <MapPin className="h-3 w-3 mr-1" />
                            Near: {location || "Boston, MA"}
                          </Badge>
                        </div>
                        <Select defaultValue="relevance">
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="relevance">
                              Relevance to Symptoms
                            </SelectItem>
                            <SelectItem value="rating">
                              Highest Rated
                            </SelectItem>
                            <SelectItem value="cost-low">
                              Cost: Low to High
                            </SelectItem>
                            <SelectItem value="cost-high">
                              Cost: High to Low
                            </SelectItem>
                            <SelectItem value="distance">Distance</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {facilities
                          .sort((a, b) => b.relevance - a.relevance)
                          .map((facility) => (
                            <FacilityCard
                              key={facility.id}
                              facility={facility}
                            />
                          ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="map" className="mt-0">
                      <div className="bg-muted rounded-lg flex items-center justify-center min-h-[400px]">
                        <div className="text-center p-8">
                          <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                          <h3 className="text-lg font-medium mb-2">
                            Interactive Map View
                          </h3>
                          <p className="text-muted-foreground max-w-md mx-auto">
                            The interactive map would display care centers that
                            specialize in treating the conditions identified in
                            your symptom analysis.
                          </p>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="compare" className="mt-0">
                      <Card>
                        <CardHeader>
                          <CardTitle>Compare Care Centers</CardTitle>
                          <CardDescription>
                            Top facilities that match your symptom profile
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                              <thead>
                                <tr className="border-b">
                                  <th className="text-left py-3 px-4 font-medium">
                                    Criteria
                                  </th>
                                  {facilities
                                    .sort((a, b) => b.relevance - a.relevance)
                                    .slice(0, 3)
                                    .map((facility) => (
                                      <th
                                        key={facility.id}
                                        className="text-left py-3 px-4 font-medium"
                                      >
                                        <div className="flex items-center gap-2">
                                          {facility.name}
                                          <RelevanceBadge
                                            score={facility.relevance}
                                          />
                                        </div>
                                      </th>
                                    ))}
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b">
                                  <td className="py-3 px-4 font-medium">
                                    Specialties
                                  </td>
                                  {facilities
                                    .sort((a, b) => b.relevance - a.relevance)
                                    .slice(0, 3)
                                    .map((facility) => (
                                      <td
                                        key={`specialties-${facility.id}`}
                                        className="py-3 px-4"
                                      >
                                        <div className="flex flex-wrap gap-1">
                                          {facility.specialties
                                            .filter((s) =>
                                              s.toLowerCase().includes("breast")
                                            )
                                            .map((specialty, i) => (
                                              <Badge
                                                key={i}
                                                variant="secondary"
                                                className="bg-cancer-purple/20 text-cancer-purple"
                                              >
                                                {specialty}
                                              </Badge>
                                            ))}
                                          {facility.specialties
                                            .filter(
                                              (s) =>
                                                !s
                                                  .toLowerCase()
                                                  .includes("breast")
                                            )
                                            .slice(0, 2)
                                            .map((specialty, i) => (
                                              <Badge
                                                key={i}
                                                variant="outline"
                                                className="text-xs"
                                              >
                                                {specialty}
                                              </Badge>
                                            ))}
                                        </div>
                                      </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4 font-medium">
                                    Treatments
                                  </td>
                                  {facilities
                                    .sort((a, b) => b.relevance - a.relevance)
                                    .slice(0, 3)
                                    .map((facility) => (
                                      <td
                                        key={`treatments-${facility.id}`}
                                        className="py-3 px-4"
                                      >
                                        {facility.treatments
                                          .slice(0, 3)
                                          .join(", ")}
                                      </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4 font-medium">
                                    Cost Level
                                  </td>
                                  {facilities
                                    .sort((a, b) => b.relevance - a.relevance)
                                    .slice(0, 3)
                                    .map((facility) => (
                                      <td
                                        key={`cost-${facility.id}`}
                                        className="py-3 px-4"
                                      >
                                        <CostIndicator
                                          level={facility.costRating}
                                        />
                                      </td>
                                    ))}
                                </tr>
                                <tr className="border-b">
                                  <td className="py-3 px-4 font-medium">
                                    Insurance
                                  </td>
                                  {facilities
                                    .sort((a, b) => b.relevance - a.relevance)
                                    .slice(0, 3)
                                    .map((facility) => (
                                      <td
                                        key={`insurance-${facility.id}`}
                                        className="py-3 px-4"
                                      >
                                        {facility.insuranceAccepted.join(", ")}
                                      </td>
                                    ))}
                                </tr>
                                <tr>
                                  <td className="py-3 px-4 font-medium">
                                    Contact
                                  </td>
                                  {facilities
                                    .sort((a, b) => b.relevance - a.relevance)
                                    .slice(0, 3)
                                    .map((facility) => (
                                      <td
                                        key={`contact-${facility.id}`}
                                        className="py-3 px-4"
                                      >
                                        <Button
                                          variant="outline"
                                          size="sm"
                                          className="w-full"
                                        >
                                          Contact
                                        </Button>
                                      </td>
                                    ))}
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="pt-6">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h3 className="font-medium text-yellow-800 mb-2">
                        Important Medical Notice
                      </h3>
                      <p className="text-sm text-yellow-800">
                        This analysis is for informational purposes only and
                        does not constitute medical advice, diagnosis, or
                        treatment. Always consult qualified healthcare providers
                        for medical concerns. If you're experiencing a medical
                        emergency, call 911 or your local emergency number
                        immediately.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {!showResults && (
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>
                  Our AI analyzes your symptoms and helps you find the most
                  appropriate care
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-8 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-medium">Describe Your Symptoms</h4>
                        <p className="text-sm text-muted-foreground">
                          Enter detailed information about your symptoms,
                          including location, severity, and duration.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-medium">AI Symptom Analysis</h4>
                        <p className="text-sm text-muted-foreground">
                          Our AI compares your symptoms with medical knowledge
                          to identify possible concerns.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-medium">Care Centers Matching</h4>
                        <p className="text-sm text-muted-foreground">
                          We find specialized care centers that focus on
                          treating your potential condition.
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">
                        4
                      </div>
                      <div>
                        <h4 className="font-medium">Compare Options</h4>
                        <p className="text-sm text-muted-foreground">
                          Review and compare care centers based on specialties,
                          insurance, cost, and other factors.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SymptomCareLocator;
