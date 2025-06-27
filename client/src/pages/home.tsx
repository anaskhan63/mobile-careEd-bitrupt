import Navigation from "@/components/navigation";
import Hero from "@/components/hero";
import CourseCatalog from "@/components/course-catalog";
import AboutSection from "@/components/about-section";
import Testimonials from "@/components/testimonials";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <CourseCatalog />
      <AboutSection />
      <Testimonials />
      <ContactSection />
      <Footer />
    </div>
  );
}
