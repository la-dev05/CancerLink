
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, AlertCircle } from "lucide-react";

const AIAssistant = () => {
  const [symptoms, setSymptoms] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!symptoms.trim()) return;
    
    setIsAnalyzing(true);
    
    // This would typically trigger an API call to an AI service
    // For now, we're just simulating the loading state
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-cancer-purple-light/30 to-background">
      <div className="container px-4 md:px-6">
        <div className="grid gap-12 md:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tighter mb-4">AI-Powered Symptom Analysis</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Our AI assistant can help you understand your symptoms and guide you to appropriate care resources.
            </p>
            <div className="space-y-4 bg-card rounded-xl p-6 shadow-sm border">
              <div>
                <label htmlFor="symptoms" className="text-sm font-medium block mb-2">
                  Describe your symptoms
                </label>
                <Textarea
                  id="symptoms"
                  placeholder="Example: I've been experiencing persistent headaches and fatigue for the past two weeks..."
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  rows={5}
                  className="resize-none"
                />
              </div>
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
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-4 w-4 mr-2" />
                    Analyze Symptoms
                  </>
                )}
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                <AlertCircle className="h-3 w-3 inline-block mr-1" />
                This is not a medical diagnosis. Always consult healthcare professionals.
              </p>
            </div>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle>How Our AI Assistant Helps</CardTitle>
                <CardDescription>
                  Our AI uses advanced algorithms to analyze symptoms and provide preliminary guidance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">1</div>
                    <div>
                      <h4 className="font-medium">Symptom Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Enter your symptoms for a preliminary analysis based on medical knowledge.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">2</div>
                    <div>
                      <h4 className="font-medium">Resource Recommendations</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive curated educational resources related to your specific symptoms.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">3</div>
                    <div>
                      <h4 className="font-medium">Care Center Suggestions</h4>
                      <p className="text-sm text-muted-foreground">
                        Get recommendations for appropriate specialists and care centers near you.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="flex-shrink-0 h-6 w-6 rounded-full bg-cancer-purple flex items-center justify-center text-white text-sm font-bold">4</div>
                    <div>
                      <h4 className="font-medium">Follow-up Guidance</h4>
                      <p className="text-sm text-muted-foreground">
                        Receive suggestions on appropriate next steps for your healthcare journey.
                      </p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
