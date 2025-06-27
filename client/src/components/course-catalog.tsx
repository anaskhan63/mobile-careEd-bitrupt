import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, Users } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Course } from "@shared/schema";

export default function CourseCatalog() {
  const { data: courses = [], isLoading, error } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: schedules = [] } = useQuery({
    queryKey: ["/api/schedules"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-full max-w-3xl mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <div className="space-y-2 mb-6">
                    {[...Array(4)].map((_, j) => (
                      <Skeleton key={j} className="h-4 w-full" />
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-10 w-24" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Courses</h2>
            <p className="text-secondary-gray">Please try again later or contact support.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="courses" className="py-20 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            California Dental Board CE Courses
          </h2>
          <p className="text-xl text-secondary-gray max-w-3xl mx-auto">
            Comprehensive training programs designed to help dentists launch and operate successful mobile dental practices
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => (
            <Card key={course.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative">
                <img 
                  src={course.imageUrl || "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300"} 
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Badge className="bg-primary-blue text-white">
                    {course.ceCredits} CE Credits
                  </Badge>
                  <span className="text-secondary-gray text-sm flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    {course.duration} Hours
                  </span>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {course.title}
                </h3>
                
                <p className="text-secondary-gray mb-4 line-clamp-3">
                  {course.description}
                </p>
                
                <ul className="text-sm text-secondary-gray mb-6 space-y-2">
                  {course.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-primary-blue">
                      ${course.price}
                    </span>
                    <span className="text-secondary-gray text-sm ml-2">per dentist</span>
                  </div>
                  <Button 
                    className="bg-primary-blue hover:bg-blue-600 text-white"
                    asChild
                  >
                    <Link href={`/registration/${course.id}`}>
                      Register
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Course Schedule */}
        <Card className="mt-16">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Upcoming Course Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-primary-blue font-bold text-lg mb-2">January 2025</div>
                <div className="text-secondary-gray">Weekend Intensive</div>
                <div className="text-sm text-secondary-gray mt-2">Sat-Sun 9AM-5PM</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-primary-blue font-bold text-lg mb-2">March 2025</div>
                <div className="text-secondary-gray">Evening Series</div>
                <div className="text-sm text-secondary-gray mt-2">4 Evenings 6PM-9PM</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-primary-blue font-bold text-lg mb-2">May 2025</div>
                <div className="text-secondary-gray">Weekend Intensive</div>
                <div className="text-sm text-secondary-gray mt-2">Sat-Sun 9AM-5PM</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
