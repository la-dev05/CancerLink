
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const CallToAction = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tighter mb-4">
            Join Our Supportive Cancer Care Community
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Whether you're a patient, survivor, caregiver, or medical professional, join us in creating a network of support, resources, and hope.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button size="lg">Join the Community</Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">Learn More About Us</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
