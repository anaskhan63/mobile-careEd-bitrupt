import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { GraduationCap, Calendar } from "lucide-react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-blue to-blue-600 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Advanced Mobile Dentistry CE Courses
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              California Dental Board approved continuing education courses for mobile dental practice. 
              Learn from Dr. Koo Karimi and launch your in-home dentistry practice with confidence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-white text-primary-blue hover:bg-gray-100 transition-colors duration-200"
                size="lg"
                asChild
              >
                <Link href="/courses">
                  <GraduationCap className="mr-2 h-5 w-5" />
                  View Courses
                </Link>
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-primary-blue transition-colors duration-200"
                size="lg"
                asChild
              >
                <Link href="#contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule Consultation
                </Link>
              </Button>
            </div>
          </div>
          <div className="lg:text-right">
            <img 
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Professional dentist training session" 
              className="rounded-xl shadow-2xl w-full max-w-lg mx-auto lg:mx-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
