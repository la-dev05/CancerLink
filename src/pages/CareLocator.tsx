
import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  MapPin, 
  Search, 
  Building2, 
  Star, 
  Clock, 
  DollarSign, 
  BadgePercent,
  Phone, 
  Mail, 
  Globe,
  ExternalLink
} from "lucide-react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

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
    specialties: ["Breast Cancer", "Prostate Cancer", "Lung Cancer", "Clinical Trials"],
    treatments: ["Surgery", "Chemotherapy", "Radiation Therapy", "Immunotherapy"],
    insuranceAccepted: ["Medicare", "Blue Cross", "Aetna", "UnitedHealthcare"],
    description: "A leading private cancer treatment center with state-of-the-art technology and a multidisciplinary approach to patient care."
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
    specialties: ["Colorectal Cancer", "Leukemia", "Lymphoma", "Pediatric Oncology"],
    treatments: ["Surgery", "Chemotherapy", "Radiation Therapy", "Stem Cell Transplant"],
    insuranceAccepted: ["Medicare", "Medicaid", "Most Major Insurers"],
    description: "A comprehensive government-funded cancer care department within Boston's largest public hospital."
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
    specialties: ["Precision Medicine", "Genomic Testing", "Rare Cancers", "Clinical Trials"],
    treatments: ["Targeted Therapy", "Immunotherapy", "Experimental Treatments", "Precision Radiation"],
    insuranceAccepted: ["Blue Cross Premium", "Aetna Select", "UnitedHealthcare Elite", "Self-Pay Options"],
    description: "A cutting-edge research institution focused on innovative cancer treatments and personalized medicine approaches."
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
    specialties: ["Breast Cancer", "Prostate Cancer", "Community Outreach", "Supportive Care"],
    treatments: ["Standard Treatments", "Holistic Support", "Nutrition Therapy", "Support Groups"],
    insuranceAccepted: ["All Major Insurance", "Medicare", "Medicaid", "Sliding Scale Options"],
    description: "A community-based network that combines quality cancer care with comprehensive support services in an affordable setting."
  }
];

// Stars display component
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<Star key={`full-${i}`} className="h-4 w-4 fill-yellow-400 text-yellow-400" />);
  }
  
  if (halfStar) {
    stars.push(
      <svg key="half" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4 text-yellow-400">
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
          className={`h-4 w-4 ${num <= level ? "text-green-600" : "text-gray-300"}`}
        />
      ))}
    </div>
  );
};

// Facility card component
const FacilityCard = ({ facility }: { facility: typeof facilities[0] }) => {
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
          <span className="px-3 py-1 bg-muted text-xs rounded-full">
            {facility.specialties.length} specialties
          </span>
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
                className="px-2 py-1 bg-muted text-xs rounded-full"
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
        <Button size="sm">
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

const CareLocator = () => {
  const [location, setLocation] = useState("");
  const [cancerType, setCancerType] = useState("");
  const [treatment, setTreatment] = useState("");
  const [selectedTab, setSelectedTab] = useState("map");
  
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
          <h1 className="text-3xl font-bold tracking-tighter mb-4">Find Specialized Cancer Care</h1>
          <p className="text-muted-foreground text-lg">
            Locate and compare cancer care facilities to find the best treatment options for your needs.
          </p>
        </div>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Search Cancer Care Facilities</CardTitle>
            <CardDescription>
              Filter by location, cancer type, and available treatments
            </CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>
              <Search className="h-4 w-4 mr-2" />
              Search Facilities
            </Button>
          </CardFooter>
        </Card>
        
        <Tabs defaultValue="list" onValueChange={setSelectedTab} value={selectedTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="map">Map View</TabsTrigger>
              <TabsTrigger value="compare">Compare</TabsTrigger>
            </TabsList>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">Sort by:</span>
              <Select defaultValue="rating">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="cost-low">Cost: Low to High</SelectItem>
                  <SelectItem value="cost-high">Cost: High to Low</SelectItem>
                  <SelectItem value="distance">Distance</SelectItem>
                  <SelectItem value="years">Years Operating</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <TabsContent value="list" className="mt-0">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {facilities.map((facility) => (
                <FacilityCard key={facility.id} facility={facility} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="map" className="mt-0">
            <div className="bg-muted rounded-lg flex items-center justify-center min-h-[400px]">
              <div className="text-center p-8">
                <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">Interactive Map View</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  The interactive map would display cancer care facilities based on your search criteria, allowing you to explore options geographically.
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compare" className="mt-0">
            <Card>
              <CardHeader>
                <CardTitle>Compare Cancer Care Facilities</CardTitle>
                <CardDescription>
                  Select up to 3 facilities to compare side by side
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[200px]">Comparison Criteria</TableHead>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableHead key={facility.id}>{facility.name}</TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Type</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`type-${facility.id}`}>{facility.type}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Location</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`location-${facility.id}`}>{facility.location}</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rating</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`rating-${facility.id}`}>
                          <div className="flex items-center">
                            <StarRating rating={facility.rating} />
                            <span className="ml-2">({facility.reviewCount})</span>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Cost Level</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`cost-${facility.id}`}>
                          <CostIndicator level={facility.costRating} />
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Years Operating</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`years-${facility.id}`}>{facility.yearsOperating} years</TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Key Specialties</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`specialties-${facility.id}`}>
                          <ul className="list-disc list-inside">
                            {facility.specialties.slice(0, 3).map((specialty, index) => (
                              <li key={index} className="text-sm">{specialty}</li>
                            ))}
                          </ul>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Available Treatments</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`treatments-${facility.id}`}>
                          <ul className="list-disc list-inside">
                            {facility.treatments.slice(0, 3).map((treatment, index) => (
                              <li key={index} className="text-sm">{treatment}</li>
                            ))}
                          </ul>
                        </TableCell>
                      ))}
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Contact</TableCell>
                      {facilities.slice(0, 3).map((facility) => (
                        <TableCell key={`contact-${facility.id}`}>
                          <div className="space-y-1">
                            <div className="flex items-center">
                              <Phone className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm">{facility.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="h-4 w-4 mr-1 text-muted-foreground" />
                              <span className="text-sm">{facility.email}</span>
                            </div>
                            <div className="flex items-center">
                              <Globe className="h-4 w-4 mr-1 text-muted-foreground" />
                              <a 
                                href={facility.website} 
                                className="text-sm text-cancer-purple hover:underline flex items-center"
                              >
                                Website <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </div>
                          </div>
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default CareLocator;
