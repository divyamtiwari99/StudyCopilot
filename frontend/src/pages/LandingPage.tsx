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

    <main

      className="
        min-h-screen
        transition-colors
        duration-300
      "

      style={{

        background:
          "var(--background)",

        color:
          "var(--text)",

      }}

    >

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