import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Layout from "@/components/layout/Layout";
import { Calendar, Star, Video, User2 } from "lucide-react";
import ConsultationScheduler from "@/components/consultation/ConsultationScheduler";

const cancerTypes = [
  "Breast Cancer",
  "Lung Cancer",
  "Prostate Cancer",
  "Colorectal Cancer",
  "Blood Cancer",
  "Other",
];

interface DoctorProfile {
  id: string;
  name: string;
  specialty: string;
  experience: string;
  hospital: string;
  image: string;
  rating: number;
  consultationFee: string;
  nextAvailable: string;
  languages: string[];
  cancerTypes: string[];
}

const doctorsData: DoctorProfile[] = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Medical Oncologist",
    experience: "15+ years",
    hospital: "Memorial Cancer Center",
    image: "",
    rating: 4.9,
    consultationFee: "$150",
    nextAvailable: "Today",
    languages: ["English", "Spanish"],
    cancerTypes: ["Breast Cancer", "Lung Cancer"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Surgical Oncologist",
    experience: "20+ years",
    hospital: "City Cancer Institute",
    image: "",
    rating: 4.8,
    consultationFee: "$180",
    nextAvailable: "Tomorrow",
    languages: ["English", "Mandarin"],
    cancerTypes: ["Lung Cancer", "Colorectal Cancer"],
  },
  {
    id: "3",
    name: "Dr. Emily Williams",
    specialty: "Hematologist-Oncologist",
    experience: "12+ years",
    hospital: "Blood Cancer Research Center",
    image: "",
    rating: 4.7,
    consultationFee: "$160",
    nextAvailable: "In 2 days",
    languages: ["English"],
    cancerTypes: ["Blood Cancer"],
  },
  {
    id: "4",
    name: "Dr. Robert Martinez",
    specialty: "Medical Oncologist",
    experience: "18+ years",
    hospital: "Advanced Cancer Care",
    image: "",
    rating: 4.9,
    consultationFee: "$170",
    nextAvailable: "Today",
    languages: ["English", "Spanish"],
    cancerTypes: ["Prostate Cancer", "Colorectal Cancer"],
  },
  {
    id: "5",
    name: "Dr. Lisa Anderson",
    specialty: "Radiation Oncologist",
    experience: "14+ years",
    hospital: "Comprehensive Cancer Center",
    image: "",
    rating: 4.8,
    consultationFee: "$155",
    nextAvailable: "Tomorrow",
    languages: ["English"],
    cancerTypes: ["Breast Cancer", "Prostate Cancer"],
  }
];

const OnlineConsultation = () => {
  const [selectedCancerType, setSelectedCancerType] = useState<string>("");
  const [schedulerOpen, setSchedulerOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<DoctorProfile | null>(null);

  const filteredDoctors = selectedCancerType
    ? doctorsData.filter((doctor) => doctor.cancerTypes.includes(selectedCancerType))
    : doctorsData;

  return (
    <Layout>
      <div className="container py-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Online Consultation</h1>
          <p className="text-muted-foreground">
            Get expert second opinions from leading oncologists from the comfort of your home.
            Our specialists are available for virtual consultations within 24-48 hours.
          </p>
        </div>

        <div className="mb-8 w-full max-w-sm mx-auto">
          <Select onValueChange={setSelectedCancerType}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Select cancer type for specialized care" />
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

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-4 mb-4">
                <div className="bg-muted rounded-full p-4">
                  <User2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{doctor.name}</h3>
                  <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  <span className="text-sm font-medium">{doctor.rating}</span>
                </div>
                <p className="text-sm flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  Next Available: {doctor.nextAvailable}
                </p>
                <p className="text-sm">Experience: {doctor.experience}</p>
                <p className="text-sm">Hospital: {doctor.hospital}</p>
                <div className="flex flex-wrap gap-2">
                  {doctor.languages.map((lang) => (
                    <Badge key={lang} variant="secondary" className="text-xs">
                      {lang}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm border-t pt-4">
                  <span className="text-muted-foreground">Consultation Fee</span>
                  <span className="font-semibold">{doctor.consultationFee}</span>
                </div>
                <Button 
                  className="w-full gap-2"
                  onClick={() => {
                    setSelectedDoctor(doctor);
                    setSchedulerOpen(true);
                  }}
                >
                  <Video className="h-4 w-4" />
                  Schedule Consultation
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {selectedDoctor && (
          <ConsultationScheduler
            isOpen={schedulerOpen}
            onClose={() => {
              setSchedulerOpen(false);
              setSelectedDoctor(null);
            }}
            doctorName={selectedDoctor.name}
            consultationFee={selectedDoctor.consultationFee}
          />
        )}
      </div>
    </Layout>
  );
};

export default OnlineConsultation;
