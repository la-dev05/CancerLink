
import { 
  Heart, 
  MapPin, 
  FileText, 
  BarChart3, 
  Search 
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: <Heart className="h-10 w-10" />,
    title: "Connect with Survivors",
    description: "Build meaningful connections with cancer survivors who understand your journey and can provide guidance and support.",
    color: "text-cancer-pink-light",
    fill: "#D946EF",
    bgColor: "bg-cancer-pink-light/20"
  },
  {
    icon: <MapPin className="h-10 w-10" />,
    title: "Find Specialized Care",
    description: "Locate and explore government and private cancer care facilities tailored to your specific needs and location.",
    color: "text-cancer-purple",
    fill: "#8B5CF6",
    bgColor: "bg-cancer-purple-light/20"
  },
  {
    icon: <FileText className="h-10 w-10" />,
    title: "Symptom Database",
    description: "Access a comprehensive database of cancer symptoms categorized by type to help you understand and recognize warning signs.",
    color: "text-cancer-blue",
    fill: "#0EA5E9",
    bgColor: "bg-cancer-blue-light/20"
  },
  {
    icon: <BarChart3 className="h-10 w-10" />,
    title: "Compare Care Facilities",
    description: "Make informed decisions by comparing cancer care centers based on reviews, treatments, costs, and services.",
    color: "text-cancer-purple",
    fill: "#7E69AB",
    bgColor: "bg-cancer-purple-light/20"
  },
  {
    icon: <Search className="h-10 w-10" />,
    title: "AI Symptom Analysis",
    description: "Get preliminary guidance on your symptoms through our AI-powered assistant and find appropriate care centers.",
    color: "text-cancer-blue",
    fill: "#0EA5E9",
    bgColor: "bg-cancer-blue-light/20"
  }
];

const Features = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12 md:mb-16 max-w-[800px] mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">Empowering Your Cancer Care Journey</h2>
          <p className="text-muted-foreground text-lg">
            Our platform offers comprehensive tools and resources designed to support you every step of the way.
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className={cn("feature-card", feature.bgColor)}>
              <div className={cn("w-14 h-14 rounded-full flex items-center justify-center mb-4", feature.color)}>
                {React.cloneElement(feature.icon, { fill: feature.fill, color: "white" })}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
