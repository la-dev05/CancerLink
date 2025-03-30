
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import SurvivorHighlights from "@/components/home/SurvivorHighlights";
import CareLocator from "@/components/home/CareLocator";
import AIAssistant from "@/components/home/AIAssistant";
import CallToAction from "@/components/home/CallToAction";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <Features />
      <SurvivorHighlights />
      <CareLocator />
      <AIAssistant />
      <CallToAction />
    </Layout>
  );
};

export default Index;
