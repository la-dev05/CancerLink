
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero-gradient py-20 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Supporting Your Cancer Care Journey Together
            </h1>
            <p className="text-muted-foreground md:text-xl max-w-[600px]">
              Connect with survivors, find specialized care centers, access symptom resources, and receive AI-powered support—all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/symptom-care-locator">
                <Button size="lg" className="w-full sm:w-auto">Find Care Centers</Button>
              </Link>
              <Link to="/survivors">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Connect with Survivors
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-square rounded-full bg-cancer-purple-light flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-cancer-purple-light via-cancer-pink-light to-cancer-blue-light opacity-70"></div>
              <div className="relative z-10 p-8">
                <img 
                  src="/1.png" 
                  alt="Supportive community for cancer care" 
                  className="w-full h-auto rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
