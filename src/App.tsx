import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Survivors from "./pages/Survivors";
import Community from "./pages/Community";
import SymptomCareLocator from "./pages/SymptomCareLocator";
import Symptoms from "./pages/Symptoms";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfUse from './pages/TermsOfUse';
import About from './pages/About';
import Contact from './pages/Contact';
import { GetMedicines } from "@/pages/GetMedicines";
import LabTests from "./pages/LabTests";
import DoctorRegistration from "./pages/DoctorRegistration";
import DoctorApplicationForm from "./pages/DoctorApplicationForm";
import OnlineConsultation from "./pages/OnlineConsultation";
import Accommodations from "./pages/Accommodations";
import CancerInsurance from "./pages/CancerInsurance";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/survivors" element={<Survivors />} />
            <Route path="/community" element={<Community />} />
            <Route path="/symptom-care-locator" element={<SymptomCareLocator />} />
            <Route path="/symptoms" element={<Symptoms />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/get-medicines" element={<GetMedicines />} />
            <Route path="/lab-tests" element={<LabTests />} />
            <Route path="/doctor-registration" element={<DoctorRegistration />} />
            <Route path="/doctor-application" element={<DoctorApplicationForm />} />
            <Route path="/online-consultation" element={<OnlineConsultation />} />
            <Route path="/accommodations" element={<Accommodations />} />
            <Route path="/cancer-insurance" element={<CancerInsurance />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
