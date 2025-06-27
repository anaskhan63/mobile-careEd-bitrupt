import { pgTable, text, serial, integer, boolean, timestamp, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  ceCredits: integer("ce_credits").notNull(),
  duration: integer("duration").notNull(), // in hours
  features: text("features").array().notNull(),
  imageUrl: text("image_url"),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const courseSchedules = pgTable("course_schedules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  startDate: timestamp("start_date").notNull(),
  endDate: timestamp("end_date").notNull(),
  schedule: text("schedule").notNull(), // e.g., "Weekend Intensive", "Evening Series"
  maxParticipants: integer("max_participants").default(20),
  currentParticipants: integer("current_participants").default(0),
  isActive: boolean("is_active").default(true),
});

export const registrations = pgTable("registrations", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  dentalLicenseNumber: text("dental_license_number").notNull(),
  courseId: integer("course_id").references(() => courses.id).notNull(),
  scheduleId: integer("schedule_id").references(() => courseSchedules.id),
  paymentStatus: text("payment_status").default("pending"),
  paymentId: text("payment_id"),
  totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
  registrationDate: timestamp("registration_date").defaultNow().notNull(),
  status: text("status").default("active"),
});

export const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  dentalLicenseNumber: text("dental_license_number"),
  message: text("message").notNull(),
  inquiryDate: timestamp("inquiry_date").defaultNow().notNull(),
  status: text("status").default("new"),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  doctorName: text("doctor_name").notNull(),
  location: text("location").notNull(),
  specialty: text("specialty"),
  testimonial: text("testimonial").notNull(),
  rating: integer("rating").default(5),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCourseSchema = createInsertSchema(courses).omit({
  id: true,
  createdAt: true,
});

export const insertCourseScheduleSchema = createInsertSchema(courseSchedules).omit({
  id: true,
});

export const insertRegistrationSchema = createInsertSchema(registrations).omit({
  id: true,
  registrationDate: true,
  status: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  inquiryDate: true,
  status: true,
});

export const insertTestimonialSchema = createInsertSchema(testimonials).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertCourse = z.infer<typeof insertCourseSchema>;
export type Course = typeof courses.$inferSelect;

export type InsertCourseSchedule = z.infer<typeof insertCourseScheduleSchema>;
export type CourseSchedule = typeof courseSchedules.$inferSelect;

export type InsertRegistration = z.infer<typeof insertRegistrationSchema>;
export type Registration = typeof registrations.$inferSelect;

export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Inquiry = typeof inquiries.$inferSelect;

export type InsertTestimonial = z.infer<typeof insertTestimonialSchema>;
export type Testimonial = typeof testimonials.$inferSelect;
