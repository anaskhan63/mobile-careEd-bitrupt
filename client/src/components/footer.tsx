import { Link } from "wouter";
import { Facebook, Linkedin, Youtube } from "lucide-react";
import mobileCareLogoPath from "@assets/logo_1750996009126.jpg";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <img 
                src={mobileCareLogoPath} 
                alt="Mobile Care Dentistry Logo" 
                className="h-8 w-auto mr-3 filter brightness-0 invert"
              />
              <span className="text-xl font-bold">Mobile Care Dentistry</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering dentists to provide exceptional care in the comfort of patients' homes 
              through comprehensive education and training.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary-blue transition-colors duration-200">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-blue transition-colors duration-200">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary-blue transition-colors duration-200">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/courses" className="hover:text-primary-blue transition-colors duration-200">
                  Courses
                </Link>
              </li>
              <li>
                <a href="#about" className="hover:text-primary-blue transition-colors duration-200">
                  About
                </a>
              </li>
              <li>
                <a href="#testimonials" className="hover:text-primary-blue transition-colors duration-200">
                  Testimonials
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-blue transition-colors duration-200">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-400">
              <li>(949) 274-9431</li>
              <li>kookarimidds@gmail.com</li>
              <li>www.mobilecaredentist.com</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Mobile Care Dentistry. All rights reserved. | California Dental Board Approved CE Provider</p>
        </div>
      </div>
    </footer>
  );
}
