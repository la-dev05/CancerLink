
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Mock data for survivor testimonials
const survivors = [
  {
    id: "breast",
    name: "Sarah Johnson",
    type: "Breast Cancer",
    years: 5,
    image: "/placeholder.svg",
    initials: "SJ",
    quote: "Finding a supportive community of survivors was crucial to my healing journey. Being able to connect with others who truly understood what I was going through made all the difference."
  },
  {
    id: "prostate",
    name: "Michael Chen",
    type: "Prostate Cancer",
    years: 3,
    image: "/placeholder.svg",
    initials: "MC",
    quote: "This platform helped me find the right specialists and treatment center for my condition. The comparison tool was invaluable in making an informed decision about my care."
  },
  {
    id: "colon",
    name: "Elena Rodriguez",
    type: "Colon Cancer",
    years: 7,
    image: "/placeholder.svg",
    initials: "ER",
    quote: "The symptom database helped me recognize early warning signs, which led to early detection. I'm grateful for the resources that empowered me to advocate for myself."
  },
  {
    id: "lung",
    name: "David Williams",
    type: "Lung Cancer",
    years: 2,
    image: "/placeholder.svg",
    initials: "DW",
    quote: "Having access to the AI symptom analyzer gave me peace of mind during my treatment. It helped me understand what symptoms were normal and when I needed to contact my doctor."
  }
];

const SurvivorHighlights = () => {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 max-w-[800px] mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Survivor Stories</h2>
          <p className="text-muted-foreground text-lg">
            Hear from cancer survivors who have navigated their journey and are now sharing their experiences to help others.
          </p>
        </div>
        
        <Tabs defaultValue="breast" className="w-full">
          <div className="flex justify-center mb-8">
            <TabsList>
              <TabsTrigger value="breast">Breast</TabsTrigger>
              <TabsTrigger value="prostate">Prostate</TabsTrigger>
              <TabsTrigger value="colon">Colon</TabsTrigger>
              <TabsTrigger value="lung">Lung</TabsTrigger>
            </TabsList>
          </div>
          
          {survivors.map((survivor) => (
            <TabsContent key={survivor.id} value={survivor.id} className="mt-0">
              <Card className="border-none shadow-sm bg-card">
                <CardContent className="p-6">
                  <div className="grid gap-8 md:grid-cols-12">
                    <div className="flex flex-col items-center text-center md:items-start md:text-left md:col-span-4">
                      <Avatar className="h-24 w-24 mb-4">
                        <AvatarImage src={survivor.image} alt={survivor.name} />
                        <AvatarFallback className="bg-cancer-purple text-white text-xl">
                          {survivor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-bold">{survivor.name}</h3>
                        <p className="text-sm text-muted-foreground">{survivor.type} Survivor</p>
                        <p className="text-sm text-muted-foreground">{survivor.years} years</p>
                      </div>
                    </div>
                    <div className="md:col-span-8">
                      <blockquote className="text-lg italic border-l-4 border-cancer-purple pl-4 py-2">
                        "{survivor.quote}"
                      </blockquote>
                      <div className="mt-6 flex justify-end">
                        <a href="/survivors" className="text-cancer-purple hover:text-cancer-purple-dark font-medium">
                          Connect with {survivor.name.split(" ")[0]} &rarr;
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SurvivorHighlights;
