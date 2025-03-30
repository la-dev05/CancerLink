import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsOfUse: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow bg-background">
        <div className="container mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Use</h1>
          
          <div className="space-y-8">
            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using CancerLink, you agree to comply with and be bound by these Terms of Use. If you do not agree with any part of these terms, you should not use our services.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">2. User Responsibilities</h2>
              <p className="text-muted-foreground leading-relaxed">
                As a user of CancerLink, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide accurate and complete registration information.</li>
                <li>Keep your account credentials confidential and secure.</li>
                <li>Respect the privacy and rights of other users.</li>
                <li>Abide by all community guidelines and platform policies.</li>
                <li>Use the platform only for lawful and intended purposes.</li>
              </ul>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">3. Medical Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                CancerLink is an informational platform and does not provide medical advice, diagnosis, or treatment. The content on this platform is not a substitute for professional medical consultation. Always seek the advice of qualified healthcare providers for medical concerns.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">4. Intellectual Property</h2>
              <p className="text-muted-foreground leading-relaxed">
                All content, features, and branding on CancerLink—including text, graphics, logos, and software—are owned by CancerLink and protected under copyright, trademark, and other intellectual property laws. Unauthorized use is strictly prohibited.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">5. User-Generated Content</h2>
              <p className="text-muted-foreground leading-relaxed">
                By submitting content to CancerLink, you grant us a worldwide, non-exclusive, royalty-free license to use, modify, display, and distribute your content in connection with the platform. You are solely responsible for the content you share and must ensure it complies with applicable laws and platform policies.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">6. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                CancerLink is provided "as is" without any warranties, express or implied. We are not liable for any indirect, incidental, or consequential damages arising from your use of our services, including but not limited to reliance on platform content or technical malfunctions.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">7. Account Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We reserve the right to suspend or terminate your account if you violate these terms or engage in unlawful or disruptive behavior. We may also remove content that breaches our guidelines without prior notice.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">8. Modifications to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                CancerLink reserves the right to update or modify these Terms of Use at any time. We will notify users of material changes. Your continued use of the platform after updates signifies your acceptance of the revised terms.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">9. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These Terms of Use shall be governed by and construed in accordance with the laws of [Your Country/State], without regard to conflict of law principles.
              </p>
            </section>

            <section className="bg-card rounded-lg p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-foreground mb-4">10. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have any questions regarding these Terms of Use, please contact us at:{' '}
                <a href="mailto:lakshya.gupta.ug24@plaksha.edu.in" className="text-cancer-purple hover:text-cancer-purple/80 transition-colors">
                  lakshya.gupta.ug24@plaksha.edu.in
                </a>
              </p>
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

export default TermsOfUse;