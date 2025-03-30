import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Heart, MessageSquare, Filter } from "lucide-react";
import { useState, useMemo, ChangeEvent } from "react";

// Mock data for survivors
const survivors = [
  {
    id: 1,
    name: "Sarah Johnson",
    cancerType: "Breast Cancer",
    yearsAsSurvivor: 5,
    location: "Boston, MA",
    image: "/placeholder.svg",
    initials: "SJ",
    bio: "Diagnosed at 42, I underwent surgery and chemotherapy. I'm passionate about helping newly diagnosed patients navigate their treatment journey.",
    topics: ["Early Detection", "Chemotherapy", "Nutrition", "Support Groups"],
  },
  {
    id: 2,
    name: "Michael Chen",
    cancerType: "Prostate Cancer",
    yearsAsSurvivor: 3,
    location: "San Francisco, CA",
    image: "/placeholder.svg",
    initials: "MC",
    bio: "As an engineer and cancer survivor, I approach my journey with data and research. Happy to share resources on treatment options and clinical trials.",
    topics: [
      "Treatment Options",
      "Clinical Trials",
      "Side Effect Management",
      "Mental Health",
    ],
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    cancerType: "Colon Cancer",
    yearsAsSurvivor: 7,
    location: "Miami, FL",
    image: "/placeholder.svg",
    initials: "ER",
    bio: "My diagnosis at 35 came as a shock. After surgery and treatment, I'm committed to raising awareness about early screening for young adults.",
    topics: [
      "Young Adult Cancer",
      "Screening",
      "Family Support",
      "Life After Treatment",
    ],
  },
  {
    id: 4,
    name: "David Williams",
    cancerType: "Lung Cancer",
    yearsAsSurvivor: 2,
    location: "Chicago, IL",
    image: "/placeholder.svg",
    initials: "DW",
    bio: "Non-smoker diagnosed with stage 3 lung cancer. After immunotherapy and radiation, I'm advocating for increased research funding and awareness.",
    topics: ["Immunotherapy", "Radiation", "Advocacy", "Research"],
  },
  {
    id: 5,
    name: "Aisha Khan",
    cancerType: "Thyroid Cancer",
    yearsAsSurvivor: 4,
    location: "Atlanta, GA",
    image: "/placeholder.svg",
    initials: "AK",
    bio: "Thyroid cancer led me to completely reevaluate my life priorities. Now I help others navigate the complex emotional journey of survivorship.",
    topics: [
      "Hormone Balance",
      "Recovery",
      "Lifestyle Changes",
      "Work-Life Balance",
    ],
  },
  {
    id: 6,
    name: "Robert Garcia",
    cancerType: "Lymphoma",
    yearsAsSurvivor: 8,
    location: "Denver, CO",
    image: "/placeholder.svg",
    initials: "RG",
    bio: "Diagnosed with non-Hodgkin's lymphoma in my 20s, I've now dedicated my career to patient advocacy and healthcare access.",
    topics: [
      "Young Adult Cancer",
      "Financial Navigation",
      "Healthcare Policy",
      "Survivorship",
    ],
  },
];

const SurvivorCard = ({ survivor }: { survivor: (typeof survivors)[0] }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex items-start gap-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={survivor.image} alt={survivor.name} />
            <AvatarFallback className="bg-cancer-purple text-white">
              {survivor.initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-lg">{survivor.name}</CardTitle>
            <CardDescription>
              {survivor.cancerType} • {survivor.yearsAsSurvivor}{" "}
              {survivor.yearsAsSurvivor === 1 ? "year" : "years"} •{" "}
              {survivor.location}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm mb-4">{survivor.bio}</p>
        <div className="mt-2">
          <h4 className="text-sm font-medium mb-2">Topics of expertise:</h4>
          <div className="flex flex-wrap gap-2">
            {survivor.topics.map((topic, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs rounded-full"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t pt-4 flex justify-between">
        <Button variant="outline" size="sm">
          <Heart className="h-4 w-4 mr-2" />
          Add to Favorites
        </Button>
        <Button size="sm">
          <MessageSquare className="h-4 w-4 mr-2" />
          Connect
        </Button>
      </CardFooter>
    </Card>
  );
};

const Survivors = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredSurvivors = useMemo(() => {
    if (!searchTerm.trim()) {
      // If no search term, just filter by the active tab
      if (activeTab === "all") return survivors;
      else if (activeTab === "other") {
        return survivors.filter(
          (s) =>
            ![
              "Breast Cancer",
              "Prostate Cancer",
              "Colon Cancer",
              "Lung Cancer",
            ].includes(s.cancerType)
        );
      } else {
        const cancerTypeMap: Record<string, string> = {
          breast: "Breast Cancer",
          prostate: "Prostate Cancer",
          colon: "Colon Cancer",
          lung: "Lung Cancer",
        };
        return survivors.filter(
          (s) => s.cancerType === cancerTypeMap[activeTab]
        );
      }
    }

    // If there is a search term, search across all fields
    const term = searchTerm.toLowerCase();
    let filtered = survivors.filter(
      (survivor) =>
        survivor.name.toLowerCase().includes(term) ||
        survivor.cancerType.toLowerCase().includes(term) ||
        survivor.location.toLowerCase().includes(term) ||
        survivor.bio.toLowerCase().includes(term) ||
        survivor.topics.some((topic) => topic.toLowerCase().includes(term))
    );

    // Apply tab filtering on top of search
    if (activeTab !== "all") {
      if (activeTab === "other") {
        filtered = filtered.filter(
          (s) =>
            ![
              "Breast Cancer",
              "Prostate Cancer",
              "Colon Cancer",
              "Lung Cancer",
            ].includes(s.cancerType)
        );
      } else {
        const cancerTypeMap: Record<string, string> = {
          breast: "Breast Cancer",
          prostate: "Prostate Cancer",
          colon: "Colon Cancer",
          lung: "Lung Cancer",
        };
        filtered = filtered.filter(
          (s) => s.cancerType === cancerTypeMap[activeTab]
        );
      }
    }

    return filtered;
  }, [searchTerm, activeTab]);

  return (
    <Layout>
      <div className="py-12 md:py-16 container">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tighter mb-4">
            Connect with Cancer Survivors
          </h1>
          <p className="text-muted-foreground text-lg">
            Build meaningful connections with survivors who understand your
            journey and can provide guidance and support.
          </p>
        </div>

        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, cancer type, or location"
                className="pl-9"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
          </div>

          <Tabs
            defaultValue="all"
            onValueChange={(value) => setActiveTab(value)}
          >
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Types</TabsTrigger>
              <TabsTrigger value="breast">Breast</TabsTrigger>
              <TabsTrigger value="prostate">Prostate</TabsTrigger>
              <TabsTrigger value="colon">Colon</TabsTrigger>
              <TabsTrigger value="lung">Lung</TabsTrigger>
              <TabsTrigger value="other">Other</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSurvivors.length > 0 ? (
                  filteredSurvivors.map((survivor) => (
                    <SurvivorCard key={survivor.id} survivor={survivor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                      No survivors found matching your search criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="breast" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSurvivors.length > 0 ? (
                  filteredSurvivors.map((survivor) => (
                    <SurvivorCard key={survivor.id} survivor={survivor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                      No breast cancer survivors found matching your search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="prostate" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSurvivors.length > 0 ? (
                  filteredSurvivors.map((survivor) => (
                    <SurvivorCard key={survivor.id} survivor={survivor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                      No prostate cancer survivors found matching your search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="colon" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSurvivors.length > 0 ? (
                  filteredSurvivors.map((survivor) => (
                    <SurvivorCard key={survivor.id} survivor={survivor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                      No colon cancer survivors found matching your search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="lung" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSurvivors.length > 0 ? (
                  filteredSurvivors.map((survivor) => (
                    <SurvivorCard key={survivor.id} survivor={survivor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                      No lung cancer survivors found matching your search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="other" className="mt-0">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredSurvivors.length > 0 ? (
                  filteredSurvivors.map((survivor) => (
                    <SurvivorCard key={survivor.id} survivor={survivor} />
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-muted-foreground">
                      No other cancer survivors found matching your search
                      criteria.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">
            Don't see what you're looking for? We're constantly adding new
            survivor partners.
          </p>
          <Button>Become a Survivor Volunteer</Button>
        </div>
      </div>
    </Layout>
  );
};

export default Survivors;
