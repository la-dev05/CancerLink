import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Heart, Users, Building2, Stethoscope, Pill, HomeIcon, UtensilsCrossed, Shield, Building } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
  <div className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-start space-x-4">
      <div className="mt-1">
        <Icon className="h-6 w-6 text-cancer-purple" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  </div>
);

const About: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <Heart className="h-12 w-12 text-cancer-purple" fill="#E5DEFF" />
            </div>
            <h1 className="text-4xl font-bold text-foreground mb-4">About CancerLink</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Empowering cancer patients and their families with comprehensive support, resources, and connections throughout their healthcare journey.
            </p>
          </div>

          {/* Mission Section */}
          <section className="bg-card rounded-lg p-8 shadow-sm mb-12">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              CancerLink is dedicated to transforming the cancer care experience by creating an integrated ecosystem that connects patients, healthcare providers, and support services. We believe in making quality cancer care more accessible, affordable, and comprehensive.
            </p>
          </section>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <FeatureCard
              icon={Stethoscope}
              title="Expert Medical Network"
              description="Connect with registered oncologists and specialists for online consultations and second opinions. Doctors can join our platform through a subscription-based model."
            />

            <FeatureCard
              icon={Building}
              title="Diagnostic Lab Network"
              description="Access discounted laboratory tests through our partner network. We collaborate with certified labs to ensure quality diagnostics at reduced costs."
            />

            <FeatureCard
              icon={Pill}
              title="Medicine Discounts"
              description="Benefit from partnerships with pharmaceutical companies to receive discounts on essential medications and cancer treatments."
            />

            <FeatureCard
              icon={Shield}
              title="Insurance Support"
              description="Browse and compare cancer insurance plans from trusted providers. Get assistance in understanding coverage options and claims processes."
            />

            <FeatureCard
              icon={HomeIcon}
              title="Accommodation Solutions"
              description="Find comfortable and affordable stay options near treatment centers. We partner with verified properties to ensure a comfortable experience for patients and families."
            />

            <FeatureCard
              icon={UtensilsCrossed}
              title="Specialized Meal Services"
              description="Order customized meals from partner cloud kitchens that cater to specific dietary requirements during cancer treatment."
            />
          </div>

          {/* Statistics Section */}
          <section className="bg-muted/40 rounded-lg p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="text-3xl font-bold text-cancer-purple mb-2">500+</h3>
                <p className="text-muted-foreground">Registered Doctors</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-cancer-purple mb-2">100+</h3>
                <p className="text-muted-foreground">Partner Labs</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-cancer-purple mb-2">50+</h3>
                <p className="text-muted-foreground">Partner Cloud Kitchens</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <h2 className="text-2xl font-semibold text-foreground mb-4">Get in Touch</h2>
            <p className="text-muted-foreground mb-4">
              Have questions about our services or want to partner with us?
            </p>
            <a 
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-cancer-purple px-4 py-2 text-sm font-medium text-white hover:bg-cancer-purple/90 transition-colors"
            >
              Contact Us
            </a>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;
