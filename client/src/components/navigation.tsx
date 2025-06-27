import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, User, Calendar, BookOpen, Phone } from "lucide-react";
import mobileCareLogoPath from "@assets/logo_1750996009126.jpg";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { name: "Courses", href: "/courses", icon: BookOpen },
    { name: "About", href: "#about", icon: User },
    { name: "Testimonials", href: "#testimonials", icon: Calendar },
    { name: "Contact", href: "#contact", icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img 
                src={mobileCareLogoPath} 
                alt="Mobile Care Dentistry Logo" 
                className="h-8 w-auto mr-3"
              />
              <span className="text-xl font-bold text-primary-blue">Mobile Care Dentistry</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-secondary-gray hover:text-primary-blue transition-colors duration-200 font-medium"
                >
                  {item.name}
                </Link>
              ))}
              <Button 
                className="bg-primary-blue text-white hover:bg-blue-600 transition-colors duration-200 font-medium"
                asChild
              >
                <Link href="/registration">Register Now</Link>
              </Button>
            </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-secondary-gray hover:text-primary-blue"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center px-3 py-2 text-secondary-gray hover:text-primary-blue transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-4 w-4 mr-2" />
                  {item.name}
                </Link>
              ))}
              <div className="px-3 py-2">
                <Button 
                  className="w-full bg-primary-blue text-white hover:bg-blue-600 transition-colors duration-200 font-medium"
                  asChild
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link href="/registration">Register Now</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
