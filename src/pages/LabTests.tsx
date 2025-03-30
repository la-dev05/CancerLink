import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { TestTube, ArrowRight } from "lucide-react";

const commonTests = [
  {
    name: "Complete Blood Count (CBC)",
    description: "Measures different components of blood including red cells, white cells, and platelets",
    price: "₹799",
    originalPrice: "₹1,299",
  },
  {
    name: "Tumor Marker Tests",
    description: "Specific proteins that may indicate the presence of cancer",
  },
  {
    name: "Comprehensive Metabolic Panel",
    description: "Assesses liver and kidney function, protein levels, and electrolyte balance",
  },
  {
    name: "Cancer Antigen Tests",
    description: "Including CA 125, CA 15-3, CA 19-9, and others specific to cancer types",
  },
  {
    name: "Biopsy Analysis",
    description: "Microscopic examination of tissue samples",
  },
].map(test => ({...test, price: test.price || "₹899", originalPrice: test.originalPrice || "₹1,499"}));

const LabTests = () => {
  return (
    <Layout>
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-6">
            <h1 className="text-4xl font-bold tracking-tight">Lab Tests</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get your essential cancer-related tests at reduced prices through our partner laboratories
            </p>
          </div>

          <Card className="bg-gradient-to-br from-purple-50 to-white border-2">
            <CardHeader className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-cancer-purple/10 p-3 rounded-full">
                  <TestTube className="h-6 w-6 text-cancer-purple" />
                </div>
                <CardTitle className="text-2xl">Why Choose Our Partner Labs?</CardTitle>
              </div>
              <CardDescription className="text-base">
                Our registered laboratory partners offer exclusive discounts to CancerLink patients
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium">Quality Assured</p>
                  <p className="text-sm text-muted-foreground">All labs are NABL accredited</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium">Save Up to 40%</p>
                  <p className="text-sm text-muted-foreground">Exclusive discounts for members</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium">Quick Results</p>
                  <p className="text-sm text-muted-foreground">24-48 hour turnaround time</p>
                </div>
                <div className="bg-white p-4 rounded-lg border">
                  <p className="font-medium">Home Collection</p>
                  <p className="text-sm text-muted-foreground">Available in select areas</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Available Tests</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {commonTests.map((test) => (
                <Card key={test.name} className="group hover:shadow-lg transition-all">
                  <CardHeader>
                    <CardTitle className="text-xl">{test.name}</CardTitle>
                    <CardDescription className="text-base">{test.description}</CardDescription>
                  </CardHeader>
                  <CardFooter className="flex items-center justify-between pt-6">
                    <div className="space-y-1">
                      <div className="text-xl font-semibold text-cancer-purple">{test.price}</div>
                      <div className="text-sm text-muted-foreground line-through">{test.originalPrice}</div>
                    </div>
                    <Button className="group-hover:translate-x-1 transition-transform">
                      Get Tested <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          <Card className="bg-cancer-purple/5 border-2">
            <CardHeader>
              <CardTitle className="text-2xl">Are you a Laboratory?</CardTitle>
              <CardDescription className="text-base">
                Partner with us to reach more patients and grow your business
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground">
                Join our network of trusted laboratories and provide valuable services to cancer patients
                while growing your business.
              </p>
              <Button size="lg" className="gap-2">
                Register as a Laboratory
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default LabTests;
