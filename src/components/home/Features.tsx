import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Search, MapPin, MessageSquare, FileText } from "lucide-react";

const Features = () => {
  const features = [
    {
      title: "Connect with Survivors",
      description:
        "Find and connect with cancer survivors who understand what you're going through.",
      icon: Heart,
      path: "/survivors",
    },
    {
      title: "AI-Powered Symptom Checker",
      description:
        "Use our AI assistant to understand your symptoms and find potential solutions.",
      icon: Search,
      path: "/ai-assistant",
    },
    {
      title: "Find Local Care",
      description:
        "Locate specialized cancer care centers and professionals near you.",
      icon: MapPin,
      path: "/care-locator",
    },
    {
      title: "Join the Community",
      description:
        "Participate in community forums and discussions to share experiences and get support.",
      icon: MessageSquare,
      path: "/community",
    },
    {
      title: "Symptom Database",
      description:
        "Access a comprehensive database of cancer-related symptoms and their management.",
      icon: FileText,
      path: "/symptoms",
    },
  ];

  return (
    <section className="py-12 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <feature.icon className="h-5 w-5 text-cancer-purple" />
                  {feature.title}
                </CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
