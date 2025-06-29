import { 
  users, courses, courseSchedules, registrations, inquiries, testimonials,
  type User, type InsertUser,
  type Course, type InsertCourse,
  type CourseSchedule, type InsertCourseSchedule,
  type Registration, type InsertRegistration,
  type Inquiry, type InsertInquiry,
  type Testimonial, type InsertTestimonial
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Courses
  getAllCourses(): Promise<Course[]>;
  getCourse(id: number): Promise<Course | undefined>;
  createCourse(course: InsertCourse): Promise<Course>;
  
  // Course Schedules
  getCourseSchedules(courseId?: number): Promise<CourseSchedule[]>;
  createCourseSchedule(schedule: InsertCourseSchedule): Promise<CourseSchedule>;
  
  // Registrations
  createRegistration(registration: InsertRegistration): Promise<Registration>;
  getRegistration(id: number): Promise<Registration | undefined>;
  updateRegistrationPayment(id: number, paymentStatus: string, paymentId: string): Promise<void>;
  
  // Inquiries
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
  
  // Testimonials
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private courses: Map<number, Course>;
  private courseSchedules: Map<number, CourseSchedule>;
  private registrations: Map<number, Registration>;
  private inquiries: Map<number, Inquiry>;
  private testimonials: Map<number, Testimonial>;
  private currentUserId: number;
  private currentCourseId: number;
  private currentScheduleId: number;
  private currentRegistrationId: number;
  private currentInquiryId: number;
  private currentTestimonialId: number;

  constructor() {
    this.users = new Map();
    this.courses = new Map();
    this.courseSchedules = new Map();
    this.registrations = new Map();
    this.inquiries = new Map();
    this.testimonials = new Map();
    this.currentUserId = 1;
    this.currentCourseId = 1;
    this.currentScheduleId = 1;
    this.currentRegistrationId = 1;
    this.currentInquiryId = 1;
    this.currentTestimonialId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed courses
    const coursesData: InsertCourse[] = [
      {
        title: "Mobile Dentistry Fundamentals",
        description: "Learn the essentials of mobile dental practice including equipment setup, infection control, and patient management in home settings.",
        price: "500.00",
        ceCredits: 10,
        duration: 20,
        features: ["Comprehensive equipment training", "CDC compliance guidelines", "Professional certification"],
        imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        isActive: true
      },
      {
        title: "Advanced Mobile Practice Management",
        description: "Master the business aspects of mobile dentistry including billing, insurance, marketing, and practice expansion strategies.",
        price: "1000.00",
        ceCredits: 12,
        duration: 24,
        features: ["Insurance billing & coding", "Marketing strategies", "Practice expansion planning", "Legal compliance"],
        imageUrl: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        isActive: true
      },
      {
        title: "Complete Mobile Dentistry Certification",
        description: "Comprehensive certification program covering all aspects of mobile dental practice from setup to advanced clinical procedures.",
        price: "5000.00",
        ceCredits: 20,
        duration: 40,
        features: ["Full certification program", "Live patient demonstrations", "Complete starter kit", "1-year mentorship"],
        imageUrl: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=300",
        isActive: true
      }
    ];

    coursesData.forEach(course => {
      const id = this.currentCourseId++;
      this.courses.set(id, { ...course, id, createdAt: new Date() });
    });

    // Seed course schedules
    const schedulesData: InsertCourseSchedule[] = [
      {
        courseId: 1,
        startDate: new Date("2025-01-18T09:00:00"),
        endDate: new Date("2025-01-19T17:00:00"),
        schedule: "Weekend Intensive",
        maxParticipants: 20,
        currentParticipants: 0,
        isActive: true
      },
      {
        courseId: 2,
        startDate: new Date("2025-03-01T18:00:00"),
        endDate: new Date("2025-03-22T21:00:00"),
        schedule: "Evening Series",
        maxParticipants: 15,
        currentParticipants: 0,
        isActive: true
      },
      {
        courseId: 3,
        startDate: new Date("2025-05-10T09:00:00"),
        endDate: new Date("2025-05-11T17:00:00"),
        schedule: "Weekend Intensive",
        maxParticipants: 12,
        currentParticipants: 0,
        isActive: true
      }
    ];

    schedulesData.forEach(schedule => {
      const id = this.currentScheduleId++;
      this.courseSchedules.set(id, { ...schedule, id });
    });

    // Seed testimonials
    const testimonialsData: InsertTestimonial[] = [
      {
        doctorName: "Dr. Jennifer Rodriguez",
        location: "Los Angeles, CA",
        specialty: "General Dentist",
        testimonial: "Dr. Karimi's course transformed my practice. I've been able to serve homebound patients and increase my revenue by 40% within the first year.",
        rating: 5,
        isActive: true
      },
      {
        doctorName: "Dr. Michael Kim",
        location: "San Francisco, CA",
        specialty: "Pediatric Dentist",
        testimonial: "The hands-on training was invaluable. I now confidently provide mobile services to special needs children in their homes.",
        rating: 5,
        isActive: true
      },
      {
        doctorName: "Dr. Sarah Patel",
        location: "San Diego, CA",
        specialty: "Geriatric Dentist",
        testimonial: "Excellent course content and ongoing support. Mobile dentistry has become a rewarding part of my practice serving elderly patients.",
        rating: 5,
        isActive: true
      }
    ];

    testimonialsData.forEach(testimonial => {
      const id = this.currentTestimonialId++;
      this.testimonials.set(id, { ...testimonial, id, createdAt: new Date() });
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(user => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllCourses(): Promise<Course[]> {
    return Array.from(this.courses.values()).filter(course => course.isActive);
  }

  async getCourse(id: number): Promise<Course | undefined> {
    return this.courses.get(id);
  }

  async createCourse(course: InsertCourse): Promise<Course> {
    const id = this.currentCourseId++;
    const newCourse: Course = { ...course, id, createdAt: new Date() };
    this.courses.set(id, newCourse);
    return newCourse;
  }

  async getCourseSchedules(courseId?: number): Promise<CourseSchedule[]> {
    const schedules = Array.from(this.courseSchedules.values()).filter(schedule => schedule.isActive);
    if (courseId) {
      return schedules.filter(schedule => schedule.courseId === courseId);
    }
    return schedules;
  }

  async createCourseSchedule(schedule: InsertCourseSchedule): Promise<CourseSchedule> {
    const id = this.currentScheduleId++;
    const newSchedule: CourseSchedule = { ...schedule, id };
    this.courseSchedules.set(id, newSchedule);
    return newSchedule;
  }

  async createRegistration(registration: InsertRegistration): Promise<Registration> {
    const id = this.currentRegistrationId++;
    const newRegistration: Registration = { 
      ...registration, 
      id, 
      registrationDate: new Date(),
      status: "active"
    };
    this.registrations.set(id, newRegistration);
    return newRegistration;
  }

  async getRegistration(id: number): Promise<Registration | undefined> {
    return this.registrations.get(id);
  }

  async updateRegistrationPayment(id: number, paymentStatus: string, paymentId: string): Promise<void> {
    const registration = this.registrations.get(id);
    if (registration) {
      registration.paymentStatus = paymentStatus;
      registration.paymentId = paymentId;
      this.registrations.set(id, registration);
    }
  }

  async createInquiry(inquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const newInquiry: Inquiry = { 
      ...inquiry, 
      id, 
      inquiryDate: new Date(),
      status: "new"
    };
    this.inquiries.set(id, newInquiry);
    return newInquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }

  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values()).filter(testimonial => testimonial.isActive);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.currentTestimonialId++;
    const newTestimonial: Testimonial = { ...testimonial, id, createdAt: new Date() };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
}

export const storage = new MemStorage();
