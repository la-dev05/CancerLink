
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, AlertCircle, ChevronRight, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data for cancer symptoms
const cancerSymptoms = [
  {
    id: "breast",
    name: "Breast Cancer",
    earlySymptoms: [
      "Lump in the breast or underarm (armpit)",
      "Swelling of all or part of the breast",
      "Skin irritation or dimpling",
      "Breast or nipple pain",
      "Nipple retraction (turning inward)",
      "Redness, scaliness, or thickening of the nipple or breast skin",
      "Nipple discharge (other than breast milk)"
    ],
    advancedSymptoms: [
      "Bone pain",
      "Breast discomfort",
      "Skin ulcers",
      "Swelling of the arm (lymphedema)",
      "Weight loss"
    ],
    riskFactors: [
      "Being female",
      "Increasing age",
      "Personal history of breast cancer",
      "Family history of breast cancer",
      "Inherited genes (BRCA1 and BRCA2)",
      "Radiation exposure",
      "Obesity",
      "Beginning menstruation at a younger age",
      "Beginning menopause at an older age",
      "Having first child at an older age",
      "Postmenopausal hormone therapy"
    ],
    whenToSeeDoctor: [
      "If you find a new breast lump or thickening",
      "If you notice any changes to your breast appearance or texture",
      "If you have nipple discharge, especially if it's bloody",
      "If you feel a lump in your underarm"
    ]
  },
  {
    id: "lung",
    name: "Lung Cancer",
    earlySymptoms: [
      "Persistent cough",
      "Coughing up blood, even a small amount",
      "Shortness of breath",
      "Chest pain",
      "Hoarseness",
      "Losing weight without trying",
      "Bone pain",
      "Headache"
    ],
    advancedSymptoms: [
      "Severe shortness of breath",
      "Severe chest pain",
      "Bone pain, especially in the back, ribs, or hips",
      "Nervous system changes (headache, weakness, dizziness, balance problems, seizures)",
      "Yellowing of the skin and eyes (jaundice)",
      "Lumps in the neck or collarbone region"
    ],
    riskFactors: [
      "Smoking",
      "Exposure to secondhand smoke",
      "Exposure to radon gas",
      "Exposure to asbestos and other carcinogens",
      "Family history of lung cancer",
      "Personal history of lung disease"
    ],
    whenToSeeDoctor: [
      "If you have a persistent cough that worsens or doesn't go away",
      "If you cough up blood",
      "If you have chronic chest pain",
      "If you're short of breath",
      "If you're wheezing",
      "If you have unexplained weight loss"
    ]
  },
  {
    id: "colorectal",
    name: "Colorectal Cancer",
    earlySymptoms: [
      "Change in bowel habits (diarrhea, constipation)",
      "Rectal bleeding or blood in stool",
      "Persistent abdominal discomfort (cramps, gas, pain)",
      "Feeling that your bowel doesn't empty completely",
      "Weakness or fatigue",
      "Unexplained weight loss"
    ],
    advancedSymptoms: [
      "Severe abdominal pain",
      "Iron deficiency anemia",
      "Bowel obstruction",
      "Jaundice (if cancer spreads to liver)",
      "Enlarged liver",
      "Ascites (fluid in the abdomen)"
    ],
    riskFactors: [
      "Older age (50+)",
      "African-American race",
      "Personal history of colorectal cancer or polyps",
      "Inflammatory intestinal conditions",
      "Family history of colorectal cancer",
      "Low-fiber, high-fat diet",
      "Sedentary lifestyle",
      "Diabetes",
      "Obesity",
      "Smoking",
      "Alcohol consumption"
    ],
    whenToSeeDoctor: [
      "If you notice persistent changes in your bowel habits",
      "If you have rectal bleeding or blood in your stool",
      "If you experience persistent abdominal discomfort",
      "If you feel like your bowels never empty completely",
      "If you experience weakness, fatigue, or unexplained weight loss"
    ]
  },
  {
    id: "prostate",
    name: "Prostate Cancer",
    earlySymptoms: [
      "Trouble urinating",
      "Decreased force in the stream of urine",
      "Blood in semen",
      "Discomfort in the pelvic area",
      "Bone pain",
      "Erectile dysfunction"
    ],
    advancedSymptoms: [
      "Bone pain, especially in back, hips, or pelvis",
      "Swelling in legs or feet",
      "Weight loss",
      "Fatigue",
      "Change in bladder or bowel habits",
      "Blood in urine"
    ],
    riskFactors: [
      "Increasing age (65+)",
      "Race (more common in Black men)",
      "Family history",
      "Obesity",
      "Genetic factors"
    ],
    whenToSeeDoctor: [
      "If you have trouble urinating or a decreased urine flow",
      "If you see blood in your semen",
      "If you have new onset erectile dysfunction",
      "If you have pain in your pelvic region, back, or hips",
      "Men over 50 should discuss prostate cancer screening with their doctor"
    ]
  },
  {
    id: "skin",
    name: "Skin Cancer",
    earlySymptoms: [
      "A new spot on the skin",
      "A spot that's changing in size, shape, or color",
      "A sore that doesn't heal",
      "A mole with irregular borders",
      "A mole with varied colors",
      "A mole larger than a pencil eraser",
      "A mole that's evolving or changing"
    ],
    advancedSymptoms: [
      "Large growth on the skin",
      "Sore that bleeds or doesn't heal",
      "Change in existing mole",
      "Spread of pigment from the border of a spot to surrounding skin",
      "Redness or swelling beyond the border of a mole",
      "Change in sensation (itchiness, tenderness, pain)",
      "Change in the surface (scaliness, oozing, bleeding, appearance of a bump)"
    ],
    riskFactors: [
      "Fair skin",
      "History of sunburns",
      "Excessive sun exposure",
      "Sunny or high-altitude climates",
      "Moles",
      "Family history of skin cancer",
      "Personal history of skin cancer",
      "Weakened immune system",
      "Exposure to radiation",
      "Exposure to certain substances (arsenic)"
    ],
    whenToSeeDoctor: [
      "If you notice a new spot on your skin",
      "If you have a spot that's changing in size, shape, or color",
      "If you have a spot that looks different from your other spots",
      "If you have a spot that itches or is painful",
      "If you have a sore that doesn't heal"
    ]
  }
];

// Additional resources for each cancer type
const cancerResources = [
  {
    id: "breast",
    resources: [
      {
        name: "American Cancer Society - Breast Cancer",
        url: "https://www.cancer.org/cancer/breast-cancer.html"
      },
      {
        name: "National Breast Cancer Foundation",
        url: "https://www.nationalbreastcancer.org/"
      },
      {
        name: "Breast Cancer Research Foundation",
        url: "https://www.bcrf.org/"
      }
    ]
  },
  {
    id: "lung",
    resources: [
      {
        name: "American Lung Association",
        url: "https://www.lung.org/lung-health-diseases/lung-disease-lookup/lung-cancer"
      },
      {
        name: "GO2 Foundation for Lung Cancer",
        url: "https://go2foundation.org/"
      },
      {
        name: "LUNGevity Foundation",
        url: "https://lungevity.org/"
      }
    ]
  },
  {
    id: "colorectal",
    resources: [
      {
        name: "Colorectal Cancer Alliance",
        url: "https://www.ccalliance.org/"
      },
      {
        name: "Fight Colorectal Cancer",
        url: "https://fightcolorectalcancer.org/"
      },
      {
        name: "Colon Cancer Coalition",
        url: "https://coloncancercoalition.org/"
      }
    ]
  },
  {
    id: "prostate",
    resources: [
      {
        name: "Prostate Cancer Foundation",
        url: "https://www.pcf.org/"
      },
      {
        name: "ZERO - The End of Prostate Cancer",
        url: "https://zerocancer.org/"
      },
      {
        name: "Us TOO International Prostate Cancer Education & Support",
        url: "https://ustoo.org/"
      }
    ]
  },
  {
    id: "skin",
    resources: [
      {
        name: "Skin Cancer Foundation",
        url: "https://www.skincancer.org/"
      },
      {
        name: "American Academy of Dermatology - Skin Cancer",
        url: "https://www.aad.org/public/diseases/skin-cancer"
      },
      {
        name: "Melanoma Research Foundation",
        url: "https://melanoma.org/"
      }
    ]
  }
];

const Symptoms = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  // Filter symptoms based on search term
  const filteredCancers = cancerSymptoms.filter(cancer => 
    cancer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cancer.earlySymptoms.some(symptom => 
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    ) ||
    cancer.advancedSymptoms.some(symptom => 
      symptom.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setActiveTab("all");
  };

  return (
    <Layout>
      <div className="py-12 md:py-16 container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter mb-4">Cancer Symptom Database</h1>
          <p className="text-muted-foreground text-lg">
            Understand common symptoms associated with different types of cancer to recognize early warning signs.
          </p>
        </div>
        
        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search for cancer types or symptoms..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10 py-6 text-lg"
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                onClick={() => setSearchTerm("")}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="flex items-center mt-4 text-sm text-muted-foreground">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>
              This information is for educational purposes only. Consult a healthcare professional for medical advice.
            </p>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="breast">Breast</TabsTrigger>
              <TabsTrigger value="lung">Lung</TabsTrigger>
              <TabsTrigger value="colorectal">Colorectal</TabsTrigger>
              <TabsTrigger value="prostate">Prostate</TabsTrigger>
              <TabsTrigger value="skin">Skin</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCancers.map((cancer) => (
                <Card key={cancer.id} className="h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{cancer.name}</CardTitle>
                    <CardDescription>Common symptoms and warning signs</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <h3 className="text-sm font-medium mb-2">Early Warning Signs:</h3>
                    <ul className="list-disc list-inside mb-4 space-y-1">
                      {cancer.earlySymptoms.slice(0, 4).map((symptom, index) => (
                        <li key={index} className="text-sm">{symptom}</li>
                      ))}
                      {cancer.earlySymptoms.length > 4 && (
                        <li className="text-sm text-muted-foreground">
                          +{cancer.earlySymptoms.length - 4} more symptoms...
                        </li>
                      )}
                    </ul>
                    <Button 
                      variant="link" 
                      className="px-0 h-auto text-cancer-purple" 
                      onClick={() => setActiveTab(cancer.id)}
                    >
                      View detailed information
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          {cancerSymptoms.map((cancer) => (
            <TabsContent key={cancer.id} value={cancer.id} className="mt-0">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{cancer.name}</CardTitle>
                      <CardDescription>Comprehensive symptom guide and resources</CardDescription>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setActiveTab("all")}
                    >
                      Back to All Types
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-8 md:grid-cols-3">
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Early Warning Signs</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {cancer.earlySymptoms.map((symptom, index) => (
                            <li key={index} className="text-sm">{symptom}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">Advanced Symptoms</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {cancer.advancedSymptoms.map((symptom, index) => (
                            <li key={index} className="text-sm">{symptom}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-medium mb-3">Risk Factors</h3>
                        <ul className="list-disc list-inside space-y-2">
                          {cancer.riskFactors.map((factor, index) => (
                            <li key={index} className="text-sm">{factor}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-3">When to See a Doctor</h3>
                        <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                          <ul className="list-disc list-inside space-y-2">
                            {cancer.whenToSeeDoctor.map((advice, index) => (
                              <li key={index} className="text-sm">{advice}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Related Resources</h3>
                      <div className="space-y-3">
                        {cancerResources.find(r => r.id === cancer.id)?.resources.map((resource, index) => (
                          <a 
                            key={index} 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                          >
                            <div className="flex-grow">
                              <h4 className="font-medium text-sm">{resource.name}</h4>
                              <p className="text-xs text-muted-foreground truncate">{resource.url}</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-muted-foreground" />
                          </a>
                        ))}
                      </div>
                      
                      <div className="mt-6 bg-muted p-4 rounded-lg">
                        <h3 className="text-lg font-medium mb-3">Find Care Centers</h3>
                        <p className="text-sm mb-4">
                          Find specialized treatment centers for {cancer.name.toLowerCase()} in your area.
                        </p>
                        <Button className="w-full">Search Care Centers</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 border-t pt-6">
                    <h3 className="text-lg font-medium mb-4">Frequently Asked Questions</h3>
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>
                          How are symptoms different in early vs. advanced stages?
                        </AccordionTrigger>
                        <AccordionContent>
                          Early-stage {cancer.name.toLowerCase()} may present with subtle symptoms that are often mistaken for other conditions. As the cancer advances, symptoms typically become more pronounced and may affect multiple body systems. Early detection through screening and prompt attention to warning signs is key to successful treatment.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>
                          Are these symptoms always indicative of cancer?
                        </AccordionTrigger>
                        <AccordionContent>
                          No, many symptoms associated with {cancer.name.toLowerCase()} can also be caused by less serious conditions. However, persistent symptoms should never be ignored. If you experience any concerning symptoms, especially those that persist for more than two weeks, consult with a healthcare professional for proper evaluation.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>
                          What screening options are available?
                        </AccordionTrigger>
                        <AccordionContent>
                          Screening recommendations for {cancer.name.toLowerCase()} vary based on age, gender, family history, and risk factors. Common screening methods include mammograms (breast), colonoscopies (colorectal), PSA tests (prostate), low-dose CT scans (lung), and skin examinations (skin). Discuss with your doctor which screening tests are appropriate for you and how often you should have them.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default Symptoms;
