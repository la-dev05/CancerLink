import Layout from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";

interface SubscriptionPlan {
  name: string;
  price: number;
  features: string[];
  description: string;
}

interface Doctor {
  name: string;
  specialization: string;
  experience: number;
  location: string;
  image: string;
  cancerTypes: string[];
}

const subscriptionPlans: SubscriptionPlan[] = [
  {
    name: "Basic",
    price: 1000,
    description: "Perfect for getting started with online consultations",
    features: [
      "Up to 20 consultations/month",
      "Basic profile listing",
      "Email support",
      "Basic analytics"
    ]
  },
  {
    name: "Professional",
    price: 3000,
    description: "For established doctors with regular online practice",
    features: [
      "Unlimited consultations",
      "Featured profile listing",
      "Priority support",
      "Advanced analytics",
      "Custom availability settings"
    ]
  },
  {
    name: "Enterprise",
    price: 5000,
    description: "Complete solution for medical institutions",
    features: [
      "Multiple doctor profiles",
      "Institution branding",
      "24/7 priority support",
      "Custom integration options",
      "Dedicated account manager",
      "Team collaboration tools"
    ]
  }
];

const sampleDoctors: Doctor[] = [
  {
    name: "Dr. Sarah Johnson",
    specialization: "Medical Oncologist",
    experience: 15,
    location: "New York, NY",
    image: "/doctors/sarah.jpg",
    cancerTypes: ["Breast Cancer", "Lung Cancer"]
  },
  {
    name: "Dr. Michael Chen",
    specialization: "Radiation Oncologist",
    experience: 12,
    location: "San Francisco, CA",
    image: "/doctors/michael.jpg",
    cancerTypes: ["Brain Tumors", "Prostate Cancer"]
  },
  {
    name: "Dr. Emily Martinez",
    specialization: "Surgical Oncologist",
    experience: 18,
    location: "Houston, TX",
    image: "/doctors/emily.jpg",
    cancerTypes: ["Breast Cancer"]
  },
  {
    name: "Dr. James Wilson",
    specialization: "Medical Oncologist",
    experience: 20,
    location: "Boston, MA",
    image: "/doctors/james.jpg",
    cancerTypes: ["Lung Cancer", "Breast Cancer"]
  },
  {
    name: "Dr. Lisa Park",
    specialization: "Neuro-Oncologist",
    experience: 14,
    location: "Chicago, IL",
    image: "/doctors/lisa.jpg",
    cancerTypes: ["Brain Tumors"]
  },
  {
    name: "Dr. Robert Thompson",
    specialization: "Urologic Oncologist",
    experience: 16,
    location: "Seattle, WA",
    image: "/doctors/robert.jpg",
    cancerTypes: ["Prostate Cancer"]
  }
];

const verificationSteps = [
  {
    title: "Submit Application",
    description: "Fill out our comprehensive application form with your professional details and credentials."
  },
  {
    title: "Document Verification",
    description: "Our team verifies your medical license, certifications, and professional background."
  },
  {
    title: "Background Check",
    description: "We conduct thorough checks of your practice history and professional standing."
  },
  {
    title: "Profile Activation",
    description: "Once verified, choose a subscription plan to activate your profile on CancerLink."
  }
];

const DoctorRegistration = () => {
  return (
    <Layout>
      <div className="container py-10 space-y-16">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Join Our Medical Network</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Connect with cancer patients worldwide through our trusted healthcare platform.
          </p>
        </div>

        {/* Verification Process Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Our Verification Process</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              To maintain the highest standards of care, all doctors go through our verification process before joining the platform.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {verificationSteps.map((step, index) => (
              <div key={step.title} className="relative">
                <div className="p-6 bg-muted rounded-lg space-y-2 min-h-[180px] h-full flex flex-col">
                  <div className="text-4xl font-bold text-cancer-purple shrink-0">{index + 1}</div>
                  <div className="flex-grow flex flex-col justify-between">
                    <h3 className="font-semibold">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                {index < verificationSteps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-[2px] bg-muted-foreground/20" />
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center">
            <Link to="/doctor-application">
              <Button size="lg" className="mt-8">
                Apply Now - Free Application
              </Button>
            </Link>
          </div>
        </div>

        {/* Current Doctors Section */}
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-center">Our Verified Cancer Specialists</h2>
          
          <Tabs defaultValue="breast" className="w-full">
            <TabsList className="w-full justify-start">
              <TabsTrigger value="breast">Breast Cancer</TabsTrigger>
              <TabsTrigger value="lung">Lung Cancer</TabsTrigger>
              <TabsTrigger value="brain">Brain Tumors</TabsTrigger>
              <TabsTrigger value="prostate">Prostate Cancer</TabsTrigger>
            </TabsList>

            {["breast", "lung", "brain", "prostate"].map((cancerType) => (
              <TabsContent key={cancerType} value={cancerType}>
                <div className="grid md:grid-cols-4 gap-4">
                  {sampleDoctors
                    .filter(doctor => doctor.cancerTypes.some(type => 
                      type.toLowerCase().includes(cancerType.toLowerCase())))
                    .map((doctor) => (
                      <Card key={doctor.name} className="overflow-hidden">
                        <CardHeader className="space-y-2 p-4">
                          <div className="aspect-square w-16 rounded-full bg-muted mx-auto" />
                          <div className="space-y-1 text-center">
                            <CardTitle className="text-base">{doctor.name}</CardTitle>
                            <CardDescription className="text-xs">{doctor.specialization}</CardDescription>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <div className="space-y-1 text-xs text-center">
                            <p>{doctor.experience} years of experience</p>
                            <p className="text-muted-foreground">{doctor.location}</p>
                          </div>
                        </CardContent>
                        <CardFooter className="p-2">
                          <Button variant="outline" size="sm" className="w-full text-xs">
                            View Profile
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Subscription Plans Section */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Subscription Plans</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose your subscription plan after verification to activate your profile and start connecting with patients.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {subscriptionPlans.map((plan) => (
              <Card key={plan.name} className="flex flex-col">
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="text-3xl font-bold mb-6">₹{plan.price}/year</div>
                  <ul className="space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 mr-2 text-green-500" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorRegistration;
