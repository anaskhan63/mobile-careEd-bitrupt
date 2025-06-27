import Navigation from "@/components/navigation";
import CourseCatalog from "@/components/course-catalog";
import Footer from "@/components/footer";

export default function Courses() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-16">
        <CourseCatalog />
      </div>
      <Footer />
    </div>
  );
}
