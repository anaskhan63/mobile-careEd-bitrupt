import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Download, Phone } from "lucide-react";
import mobileCareLogoPath from "@assets/logo_1750996009126.jpg";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="bg-light-gray rounded-xl shadow-lg p-8 w-full">
              <img 
                src={mobileCareLogoPath} 
                alt="Mobile Care Dentistry Logo" 
                className="w-full h-auto max-w-sm mx-auto"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Learn from Dr. Koo Karimi
            </h2>
            <p className="text-lg text-secondary-gray mb-6">
              Dr. Koo Karimi is a pioneer in mobile dentistry and the author of the comprehensive 
              "Mobile Care Dentistry: A Comprehensive Guide to Launching Your Mobile Practice."
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-start">
                <CheckCircle className="text-primary-blue mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">California Dental Board Approved</h4>
                  <p className="text-secondary-gray">All courses meet California CE requirements</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary-blue mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Hands-On Training</h4>
                  <p className="text-secondary-gray">Practical experience with real mobile equipment</p>
                </div>
              </div>
              <div className="flex items-start">
                <CheckCircle className="text-primary-blue mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-gray-900">Ongoing Support</h4>
                  <p className="text-secondary-gray">Mentorship and guidance after course completion</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="bg-primary-blue text-white hover:bg-blue-600 transition-colors duration-200">
                <Download className="mr-2 h-4 w-4" />
                Download Course Guide
              </Button>
              <Button 
                variant="outline"
                className="border-2 border-primary-blue text-primary-blue hover:bg-primary-blue hover:text-white transition-colors duration-200"
                asChild
              >
                <Link href="#contact">
                  <Phone className="mr-2 h-4 w-4" />
                  Contact Dr. Karimi
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
