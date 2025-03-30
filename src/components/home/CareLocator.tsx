
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Search } from "lucide-react";

// Mock data for cancer types
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

// Mock data for treatments
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

const CareLocator = () => {
  const [location, setLocation] = useState("");
  const [cancerType, setCancerType] = useState("");
  const [treatment, setTreatment] = useState("");

  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 max-w-[800px] mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Find Specialized Cancer Care</h2>
          <p className="text-muted-foreground text-lg">
            Locate the best treatment centers based on your needs, cancer type, and location.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-4 p-6 rounded-xl bg-card shadow-sm border">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <h3 className="text-lg font-medium">Care Center Locator</h3>
            </div>
            
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-2">
                <label htmlFor="location" className="text-sm font-medium">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="City, State or Zip"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="cancer-type" className="text-sm font-medium">
                  Cancer Type
                </label>
                <Select
                  value={cancerType}
                  onValueChange={setCancerType}
                >
                  <SelectTrigger id="cancer-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {cancerTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="treatment" className="text-sm font-medium">
                  Treatment
                </label>
                <Select
                  value={treatment}
                  onValueChange={setTreatment}
                >
                  <SelectTrigger id="treatment">
                    <SelectValue placeholder="Select treatment" />
                  </SelectTrigger>
                  <SelectContent>
                    {treatmentTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button className="w-full sm:w-auto">
              <Search className="h-4 w-4 mr-2" />
              Search Care Centers
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              Our database includes over 500 cancer treatment centers across the country.
            </p>
          </div>
          
          <div className="mt-8 text-center">
            <a href="/care-locator" className="text-cancer-purple hover:text-cancer-purple-dark inline-flex items-center font-medium">
              View detailed care center comparison
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="ml-1 h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CareLocator;
