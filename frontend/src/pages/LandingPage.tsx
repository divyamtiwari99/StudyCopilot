import {
  AIDashboard,
  Cta,
  Faq,
  Features,
  Hero,
  HowItWorks,
  KnowledgeGraph,
  LearningTimeline,
  Navbar,
  Footer,
  Pricing,
  Stats,
  Testimonials,
  WorkspacePreview,
} from "../features/landing";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-[#09090B]">
      <Navbar />
      <Hero />
      <Stats />
      <WorkspacePreview />
      <HowItWorks />
      <AIDashboard />
      <KnowledgeGraph />
      <LearningTimeline />
      <Features />
      <Testimonials />
      <Pricing />
      <Faq />
      <Cta />
      <Footer />
    </main>
  );
}