import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          
          <div className="space-y-8">
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to CancerLink. Your privacy is of utmost importance to us. 
                This Privacy Policy outlines how we collect, use, protect, and share your personal information 
                when you use our platform.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">We may collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Personal identification information (name, date of birth, etc.)</li>
                <li>Contact information (email address, phone number, etc.)</li>
                <li>Health-related information (if voluntarily provided)</li>
                <li>Usage data (interactions with the website, preferences, etc.)</li>
                <li>Device and browser information (IP address, operating system, etc.)</li>
              </ul>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information collected to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide, personalize, and improve our services</li>
                <li>Facilitate communication and support</li>
                <li>Ensure security and prevent fraud</li>
                <li>Comply with legal and regulatory requirements</li>
                <li>Conduct research and development to enhance user experience</li>
              </ul>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">How We Share Your Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell your personal information. However, we may share it with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Healthcare professionals (with your consent)</li>
                <li>Third-party service providers (for platform maintenance and analytics)</li>
                <li>Legal authorities (when required by law)</li>
              </ul>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Data Protection & Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We employ industry-standard security measures such as encryption, access controls, and regular audits
                to protect your personal data from unauthorized access or breaches.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Cookies & Tracking Technologies</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar technologies to enhance user experience, track usage patterns, 
                and improve our services. You can manage cookie preferences through your browser settings.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Your Rights & Choices</h2>
              <p className="text-muted-foreground leading-relaxed">
                You have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Access, update, or delete your personal data</li>
                <li>Opt-out of certain communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent for data processing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed">
                To exercise your rights, please contact us using the details below.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us at:
              </p>
              <a href="mailto:lakshya.gupta.ug24@plaksha.edu.in" 
                 className="text-cancer-purple hover:text-cancer-purple/80 transition-colors">
                lakshya.gupta.ug24@plaksha.edu.in
              </a>
            </section>
          </div>

          <div className="mt-12 text-sm text-muted-foreground text-center">
            <p>Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
