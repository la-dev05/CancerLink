
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  AlertCircle, 
  ArrowRight, 
  CheckCircle, 
  XCircle,
  MapPin,
  FlaskConical,
  FileQuestion,
  Brain
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for symptom analysis
const mockAnalysisResult = {
  possibleConcerns: [
    {
      name: "Breast Cancer",
      matchScore: "Moderate",
      description: "Some symptoms align with possible breast cancer warning signs. This does not mean you have cancer, but these symptoms warrant discussion with a healthcare provider.",
      recommendedAction: "Schedule an appointment with your primary care physician or gynecologist for evaluation."
    },
    {
      name: "Fibrocystic Breast Changes",
      matchScore: "High",
      description: "Your symptoms strongly align with fibrocystic breast changes, which are common, non-cancerous changes that many women experience.",
      recommendedAction: "Discuss with your healthcare provider at your next regular appointment."
    },
    {
      name: "Mastitis",
      matchScore: "Low",
      description: "Some symptoms may indicate mastitis, an infection of breast tissue, especially if you're breastfeeding.",
      recommendedAction: "If you're experiencing pain, redness, warmth, or have a fever, contact your healthcare provider promptly."
    }
  ],
  recommendations: [
    "Schedule a comprehensive breast examination with a healthcare provider",
    "Consider diagnostic imaging (mammogram, ultrasound) as recommended by your provider",
    "Track your symptoms, noting any changes or patterns",
    "Continue breast self-exams monthly"
  ],
  nearbyFacilities: [
    {
      name: "Memorial Cancer Center",
      distance: "3.2 miles",
      address: "123 Medical Drive, Boston, MA 02118",
      phone: "(555) 123-4567",
      specialties: ["Breast Cancer", "Diagnostic Imaging", "Surgical Oncology"]
    },
    {
      name: "City General Hospital - Breast Health Center",
      distance: "4.5 miles",
      address: "456 Healthcare Avenue, Boston, MA 02215",
      phone: "(555) 987-6543",
      specialties: ["Breast Cancer", "Women's Health", "Oncology"]
    }
  ],
  disclaimer: "This analysis is for informational purposes only and does not constitute medical advice, diagnosis, or treatment. Always consult qualified healthcare providers for medical concerns."
};

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

const AIAssistant = () => {
  const [symptoms, setSymptoms] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleAnalyze = () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };
  
  const resetAnalysis = () => {
    setShowResults(false);
  };

  return (
    <Layout>
      <div className="py-12 md:py-16 container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter mb-4">AI Symptom Analysis</h1>
          <p className="text-muted-foreground text-lg">
            Get preliminary guidance about your symptoms and find appropriate resources and care centers.
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className={showResults ? "hidden" : ""}>
              <CardHeader>
                <CardTitle>Symptom Analysis Tool</CardTitle>
                <CardDescription>
                  Describe your symptoms and get AI-powered guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="symptoms" className="text-sm font-medium">
                      Describe your symptoms <span className="text-red-500">*</span>
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
                  
                  <div className="grid gap-4 sm:grid-cols-3">
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
                        Location (optional)
                      </label>
                      <Input 
                        id="location" 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="City or Zip" 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="additional-info" className="text-sm font-medium">
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
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing Symptoms...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4 mr-2" />
                      Analyze Symptoms
                    </>
                  )}
                </Button>
                <div className="flex items-center text-xs text-muted-foreground">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  <p>This tool is not a substitute for professional medical advice, diagnosis, or treatment.</p>
                </div>
              </CardFooter>
            </Card>
            
            {showResults && (
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
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <Brain className="h-5 w-5 mr-2 text-cancer-purple" />
                        Possible Concerns
                      </h3>
                      <div className="space-y-4">
                        {mockAnalysisResult.possibleConcerns.map((concern, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-medium">{concern.name}</h4>
                              <MatchScoreBadge score={concern.matchScore} />
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">{concern.description}</p>
                            <div className="bg-muted rounded-lg p-3">
                              <p className="text-sm font-medium">Recommended Action:</p>
                              <p className="text-sm">{concern.recommendedAction}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
                        Recommendations
                      </h3>
                      <ul className="space-y-2">
                        {mockAnalysisResult.recommendations.map((recommendation, index) => (
                          <li key={index} className="flex items-center">
                            <ArrowRight className="h-4 w-4 mr-2 text-cancer-purple" />
                            <span className="text-sm">{recommendation}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3 flex items-center">
                        <MapPin className="h-5 w-5 mr-2 text-cancer-purple" />
                        Nearby Care Facilities
                      </h3>
                      <div className="space-y-3">
                        {mockAnalysisResult.nearbyFacilities.map((facility, index) => (
                          <div key={index} className="border rounded-lg p-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h4 className="font-medium">{facility.name}</h4>
                                <p className="text-xs text-muted-foreground">{facility.address}</p>
                              </div>
                              <Badge variant="outline">{facility.distance}</Badge>
                            </div>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {facility.specialties.map((specialty, i) => (
                                <Badge key={i} variant="secondary" className="text-xs font-normal">
                                  {specialty}
                                </Badge>
                              ))}
                            </div>
                            <Button variant="link" className="h-auto p-0 mt-1">
                              View Details
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
                        <p className="text-sm text-yellow-800">
                          {mockAnalysisResult.disclaimer}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={resetAnalysis}>
                    <XCircle className="h-4 w-4 mr-2" />
                    Start Over
                  </Button>
                  <Button>
                    <MapPin className="h-4 w-4 mr-2" />
                    Find More Care Centers
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>How It Works</CardTitle>
                <CardDescription>
                  Our AI-powered symptom analyzer uses advanced algorithms to provide preliminary guidance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium">Describe Your Symptoms</h4>
                      <p className="text-sm text-muted-foreground">
                        Enter detailed information about what you're experiencing, including symptom duration and severity.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium">AI Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Our AI compares your symptoms with medical knowledge to identify possible concerns.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium">Get Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive guidance on potential next steps and appropriate healthcare resources.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 h-7 w-7 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-medium">Find Care</h4>
                      <p className="text-sm text-muted-foreground">
                        Discover specialized care facilities near you that can address your specific needs.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Important Notice</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex">
                    <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 mr-2 flex-shrink-0" />
                    <div>
                      <h4 className="font-medium text-red-800">Medical Emergency?</h4>
                      <p className="text-sm text-red-800">
                        If you're experiencing a medical emergency, call 911 or your local emergency number immediately.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">This tool is not a replacement for:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                      <span className="text-sm">Professional medical diagnosis</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                      <span className="text-sm">Emergency medical services</span>
                    </li>
                    <li className="flex items-start">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5 mr-2" />
                      <span className="text-sm">Healthcare provider consultation</span>
                    </li>
                  </ul>
                </div>
                
                <div className="border-t pt-4">
                  <h4 className="text-sm font-medium mb-2">About Our AI:</h4>
                  <p className="text-sm text-muted-foreground">
                    Our system analyzes your symptoms based on current medical knowledge but has limitations. Always verify findings with healthcare professionals.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIAssistant;
