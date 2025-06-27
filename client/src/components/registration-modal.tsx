import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { processPayment } from "@/lib/stax-payment";

const quickRegistrationSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  dentalLicenseNumber: z.string().min(1, "Dental license number is required"),
  courseId: z.number().min(1, "Course selection is required"),
  cardNumber: z.string().min(16, "Valid card number is required"),
  expiryDate: z.string().min(5, "Valid expiry date is required"),
  cvv: z.string().min(3, "Valid CVV is required"),
});

type QuickRegistrationForm = z.infer<typeof quickRegistrationSchema>;

interface RegistrationModalProps {
  courses: Array<{
    id: number;
    title: string;
    price: string;
  }>;
  children: React.ReactNode;
}

export default function RegistrationModal({ courses, children }: RegistrationModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<QuickRegistrationForm>({
    resolver: zodResolver(quickRegistrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      dentalLicenseNumber: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  const selectedCourse = courses.find(course => course.id === form.watch("courseId"));

  const onSubmit = async (data: QuickRegistrationForm) => {
    try {
      // Create registration
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
        setIsOpen(false);
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

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Quick Course Registration</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                <CardContent className="pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{selectedCourse.title}</span>
                    <span className="text-xl font-bold text-primary-blue">${selectedCourse.price}</span>
                  </div>
                </CardContent>
              </Card>
            )}
            
            <div className="border-t pt-4">
              <h4 className="font-semibold mb-4">Payment Information</h4>
              <div className="space-y-3">
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
                <div className="grid grid-cols-2 gap-3">
                  <FormField
                    control={form.control}
                    name="expiryDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>MM/YY *</FormLabel>
                        <FormControl>
                          <Input placeholder="12/25" {...field} />
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
                        <FormLabel>CVC *</FormLabel>
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
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
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
                  "Complete Registration & Payment"
                )}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="flex-1"
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
