import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  DollarSign, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Building,
  HeartPulse,
  FileCheck
} from "lucide-react";

const plans = [
  {
    name: "ComprehensiveCare Plus",
    provider: "Guardian Life Insurance",
    category: "Comprehensive",
    coverage: "₹500,000 - ₹1,000,000",
    monthlyPremium: "₹250-450",
    waitingPeriod: "30 days",
    features: [
      "All types of cancer covered",
      "Includes experimental treatments",
      "Global coverage",
      "No claim limits",
      "Additional critical illness coverage"
    ],
    criticalIllnessCover: true,
    preExisting: "Covered after 12 months",
    networkHospitals: 2500
  },
  {
    name: "Essential Cancer Shield",
    provider: "Prudential Financial",
    category: "Basic",
    coverage: "₹250,000",
    monthlyPremium: "₹150-300",
    waitingPeriod: "60 days",
    features: [
      "Major cancers covered",
      "Chemotherapy coverage",
      "Radiation therapy",
      "Hospital cash benefit"
    ],
    criticalIllnessCover: false,
    preExisting: "Not covered",
    networkHospitals: 1800
  },
  {
    name: "Premium Cancer Protection",
    provider: "MetLife Insurance",
    category: "Premium",
    coverage: "₹750,000",
    monthlyPremium: "₹350-600",
    waitingPeriod: "15 days",
    features: [
      "All cancer stages covered",
      "Alternative therapy coverage",
      "Home care benefits",
      "Annual health checkups"
    ],
    criticalIllnessCover: true,
    preExisting: "Covered after 24 months",
    networkHospitals: 3000
  }
];

const InsurancePlanCard = ({ plan }: { plan: typeof plans[0] }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-xl mb-1">{plan.name}</CardTitle>
          <CardDescription className="flex items-center">
            <Building className="h-4 w-4 mr-1" />
            {plan.provider}
          </CardDescription>
        </div>
        <Badge variant={
          plan.category === "Premium" ? "destructive" : 
          plan.category === "Comprehensive" ? "default" : 
          "secondary"
        }>
          {plan.category}
        </Badge>
      </div>
    </CardHeader>
    <CardContent className="flex-grow space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-muted-foreground">Coverage</p>
          <p className="font-medium">{plan.coverage}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Monthly Premium</p>
          <p className="font-medium">{plan.monthlyPremium}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Waiting Period</p>
          <p className="font-medium">{plan.waitingPeriod}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Network Hospitals</p>
          <p className="font-medium">{plan.networkHospitals.toLocaleString()}</p>
        </div>
      </div>

      <div>
        <p className="text-sm font-medium mb-2">Key Features:</p>
        <ul className="space-y-2">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1 shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {plan.criticalIllnessCover && (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Includes Critical Illness Cover
        </Badge>
      )}
    </CardContent>
    <CardFooter className="flex gap-2">
      <Button variant="outline" className="flex-1">
        View Details
      </Button>
      <Button className="flex-1">Get Quote</Button>
    </CardFooter>
  </Card>
);

const CancerInsurance = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-6">Cancer Insurance Plans</h1>
          <p className="text-xl text-muted-foreground mb-8">
            Find comprehensive insurance coverage specifically designed for cancer patients
          </p>
        </div>

        {/* Critical Illness Rider Information */}
        <Card className="mb-12 bg-gradient-to-br from-purple-50 to-white">
          <CardHeader>
            <div className="flex items-center gap-3">
              <HeartPulse className="h-8 w-8 text-cancer-purple" />
              <div>
                <CardTitle>Understanding Critical Illness Rider</CardTitle>
                <CardDescription>Important additional coverage for cancer patients</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              A Critical Illness Rider provides additional financial protection beyond your standard cancer insurance policy. 
              It offers a lump sum payment upon diagnosis of covered critical illnesses, helping you manage treatment costs 
              and maintain financial stability.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                  <h3 className="font-medium">Key Benefits</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Immediate financial support upon diagnosis</li>
                  <li>• Coverage for multiple critical illnesses</li>
                  <li>• No restriction on fund usage</li>
                </ul>
              </div>
              
              <div className="bg-white p-4 rounded-lg border">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <h3 className="font-medium">Important Considerations</h3>
                </div>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Waiting period may apply</li>
                  <li>• Pre-existing conditions limitations</li>
                  <li>• Age restrictions for enrollment</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="all" className="space-y-8">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="all">All Plans</TabsTrigger>
              <TabsTrigger value="comprehensive">Comprehensive</TabsTrigger>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="premium">Premium</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {plans.map((plan, index) => (
                <InsurancePlanCard key={index} plan={plan} />
              ))}
            </div>
          </TabsContent>

          {["comprehensive", "basic", "premium"].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {plans
                  .filter(plan => plan.category.toLowerCase() === category)
                  .map((plan, index) => (
                    <InsurancePlanCard key={index} plan={plan} />
                  ))
                }
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </Layout>
  );
};

export default CancerInsurance;
