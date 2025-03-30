import Layout from "@/components/layout/Layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Package2,
  Pill,
  Tag,
  TruckIcon,
  ShieldCheck,
  Clock,
  ExternalLink,
  PlusCircle
} from "lucide-react";

// Mock data for medications
const medications = {
  chemotherapy: [
    {
      name: "Paclitaxel (Taxol)",
      type: "Chemotherapy",
      description: "Used to treat various types of cancer including breast, ovarian, and lung cancer",
      marketPrice: 1200,
      ourPrice: 850,
      savings: "29%",
      availability: "In Stock",
      deliveryTime: "2-3 business days"
    },
    {
      name: "Docetaxel (Taxotere)",
      type: "Chemotherapy",
      description: "Treatment for breast, lung, prostate, stomach, and head/neck cancers",
      marketPrice: 1500,
      ourPrice: 1100,
      savings: "27%",
      availability: "In Stock",
      deliveryTime: "2-3 business days"
    }
  ],
  targeted: [
    {
      name: "Herceptin (Trastuzumab)",
      type: "Targeted Therapy",
      description: "Specifically for HER2-positive breast cancer treatment",
      marketPrice: 2200,
      ourPrice: 1650,
      savings: "25%",
      availability: "In Stock",
      deliveryTime: "2-3 business days"
    },
    {
      name: "Gleevec (Imatinib)",
      type: "Targeted Therapy",
      description: "Used for chronic myeloid leukemia and gastrointestinal stromal tumors",
      marketPrice: 1800,
      ourPrice: 1300,
      savings: "28%",
      availability: "Limited Stock",
      deliveryTime: "3-4 business days"
    }
  ],
  supportive: [
    {
      name: "Ondansetron (Zofran)",
      type: "Anti-nausea",
      description: "Prevents nausea and vomiting caused by cancer chemotherapy",
      marketPrice: 200,
      ourPrice: 140,
      savings: "30%",
      availability: "In Stock",
      deliveryTime: "1-2 business days"
    },
    {
      name: "Filgrastim (Neupogen)",
      type: "Growth Factor",
      description: "Helps prevent infection in patients receiving chemotherapy",
      marketPrice: 800,
      ourPrice: 580,
      savings: "27%",
      availability: "In Stock",
      deliveryTime: "2-3 business days"
    }
  ]
};

// Medication card component
const MedicationCard = ({ medication }: { medication: typeof medications.chemotherapy[0] }) => (
  <Card className="h-full">
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="text-xl">{medication.name}</CardTitle>
          <CardDescription className="mt-1">{medication.type}</CardDescription>
        </div>
        <Badge variant={medication.availability === "In Stock" ? "default" : "secondary"}>
          {medication.availability}
        </Badge>
      </div>
    </CardHeader>
    <CardContent>
      <p className="text-sm text-muted-foreground mb-4">{medication.description}</p>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
          <div>
            <p className="text-sm text-muted-foreground">Market Price</p>
            <p className="text-lg font-semibold line-through text-muted-foreground">
              ₹{medication.marketPrice}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">Our Price</p>
            <p className="text-lg font-semibold text-green-600">
              ₹{medication.ourPrice}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between text-sm">
          <div className="flex items-center">
            <TruckIcon className="h-4 w-4 mr-1 text-muted-foreground" />
            <span>{medication.deliveryTime}</span>
          </div>
          <Badge variant="outline" className="bg-green-50">
            Save {medication.savings}
          </Badge>
        </div>
        
        <Button className="w-full">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </div>
    </CardContent>
  </Card>
);

const GetMedicines = () => {
  return (
    <Layout>
      <div className="py-12 md:py-16 container">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-4">
            Cancer Medicines at Reduced Prices
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Get your cancer medications at significantly lower prices through our direct partnerships 
            with pharmaceutical companies. We eliminate unnecessary intermediary costs to make 
            your treatment more affordable.
          </p>
          <div className="grid gap-6 sm:grid-cols-3">
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-6">
                <Package2 className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-medium mb-2">Direct Sourcing</h3>
                <p className="text-sm text-muted-foreground">
                  We partner directly with pharmaceutical manufacturers to source medicines
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-6">
                <Tag className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-medium mb-2">Lower Prices</h3>
                <p className="text-sm text-muted-foreground">
                  Save up to 30% by cutting out middleman costs
                </p>
              </CardContent>
            </Card>
            <Card className="bg-primary/5 border-primary/10">
              <CardContent className="pt-6">
                <ShieldCheck className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-medium mb-2">Quality Assured</h3>
                <p className="text-sm text-muted-foreground">
                  All medicines are FDA-approved and quality verified
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Tabs defaultValue="chemotherapy" className="space-y-8">
          <TabsList className="justify-center">
            <TabsTrigger value="chemotherapy">Chemotherapy</TabsTrigger>
            <TabsTrigger value="targeted">Targeted Therapy</TabsTrigger>
            <TabsTrigger value="supportive">Supportive Care</TabsTrigger>
          </TabsList>

          <TabsContent value="chemotherapy">
            <div className="grid gap-6 md:grid-cols-2">
              {medications.chemotherapy.map((med, index) => (
                <MedicationCard key={index} medication={med} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="targeted">
            <div className="grid gap-6 md:grid-cols-2">
              {medications.targeted.map((med, index) => (
                <MedicationCard key={index} medication={med} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="supportive">
            <div className="grid gap-6 md:grid-cols-2">
              {medications.supportive.map((med, index) => (
                <MedicationCard key={index} medication={med} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <Card className="mt-12 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <Clock className="h-8 w-8 text-primary" />
                <div>
                  <h3 className="font-medium mb-1">Need Urgent Medicines?</h3>
                  <p className="text-sm text-muted-foreground">
                    We offer priority shipping for urgent requirements
                  </p>
                </div>
              </div>
              <Button>
                Contact Support
                <ExternalLink className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export { GetMedicines };
export default GetMedicines;
