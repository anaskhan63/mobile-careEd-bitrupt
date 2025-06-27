import { useParams } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { processPayment } from "@/lib/stax-payment";
import type { Course } from "@shared/schema";

const registrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  phone: z.string().optional(),
  dentalLicenseNumber: z.string().min(1, "Dental license number is required"),
  courseId: z.number().min(1, "Course selection is required"),
  scheduleId: z.number().optional(),
  cardNumber: z.string().min(16, "Valid card number is required"),
  expiryDate: z.string().min(5, "Valid expiry date is required"),
  cvv: z.string().min(3, "Valid CVV is required"),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

export default function Registration() {
  const { courseId } = useParams();
  const { toast } = useToast();

  const { data: courses = [], isLoading: coursesLoading } = useQuery<Course[]>({
    queryKey: ["/api/courses"],
  });

  const { data: schedules = [], isLoading: schedulesLoading } = useQuery({
    queryKey: ["/api/schedules"],
  });

  const form = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dentalLicenseNumber: "",
      courseId: courseId ? parseInt(courseId) : undefined,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const selectedCourse = courses.find(course => course.id === form.watch("courseId"));

  const onSubmit = async (data: RegistrationForm) => {
    try {
      // First create the registration
      const registrationData = {
        ...data,
        totalAmount: selectedCourse?.price || "0",
        paymentStatus: "pending",
      };

      const registration = await apiRequest("POST", "/api/registrations", registrationData);
      const registrationResult = await registration.json();

      // Process payment
      const paymentResult = await processPayment({
        amount: parseFloat(selectedCourse?.price || "0"),
        cardNumber: data.cardNumber,
        expiryDate: data.expiryDate,
        cvv: data.cvv,
        registrationId: registrationResult.id,
      });

      if (paymentResult.success) {
        toast({
          title: "Registration Successful!",
          description: "Your course registration has been completed. You will receive a confirmation email shortly.",
        });
        form.reset();
      } else {
        throw new Error(paymentResult.message || "Payment failed");
      }
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: error instanceof Error ? error.message : "An error occurred during registration",
        variant: "destructive",
      });
    }
  };

  if (coursesLoading || schedulesLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Course Registration
            </h1>
            <p className="text-xl text-secondary-gray">
              Register for your Mobile Care Dentistry CE course
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Registration Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john.doe@email.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(555) 123-4567" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="dentalLicenseNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CA Dental License Number *</FormLabel>
                        <FormControl>
                          <Input placeholder="CA License #" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="courseId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Course *</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} value={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Choose a course" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {courses.map((course) => (
                              <SelectItem key={course.id} value={course.id.toString()}>
                                {course.title} - ${course.price}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {selectedCourse && (
                    <Card className="bg-light-gray">
                      <CardContent className="pt-6">
                        <h3 className="font-semibold text-lg mb-2">{selectedCourse.title}</h3>
                        <p className="text-secondary-gray mb-4">{selectedCourse.description}</p>
                        <div className="flex justify-between items-center">
                          <div>
                            <span className="text-2xl font-bold text-primary-blue">${selectedCourse.price}</span>
                            <span className="text-secondary-gray ml-2">• {selectedCourse.ceCredits} CE Credits</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                    <p className="text-sm text-secondary-gray mb-4">Secure payment processing powered by STAX</p>
                    
                    <div className="space-y-4">
                      <FormField
                        control={form.control}
                        name="cardNumber"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Card Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="1234 5678 9012 3456" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="expiryDate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Expiry Date *</FormLabel>
                              <FormControl>
                                <Input placeholder="MM/YY" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="cvv"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>CVV *</FormLabel>
                              <FormControl>
                                <Input placeholder="123" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-6">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-primary-blue hover:bg-blue-600 text-white"
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Complete Registration & Payment`
                      )}
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => form.reset()}
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
}
