import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: varchar("id").primaryKey(),
  logoUrl: text("logo_url"),
  divisionName: text("division_name").notNull(),
});

export const heroSlides = pgTable("hero_slides", {
  id: varchar("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  order: text("order").notNull(),
});

export const collaborationLogos = pgTable("collaboration_logos", {
  id: varchar("id").primaryKey(),
  imageUrl: text("image_url").notNull(),
  name: text("name").notNull(),
  order: text("order").notNull(),
});

export const news = pgTable("news", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  link: text("link").notNull(),
  icon: text("icon").notNull(),
  order: text("order").notNull(),
});

export const galleryCategories = pgTable("gallery_categories", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  order: text("order").notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: varchar("id").primaryKey(),
  categoryId: varchar("category_id").notNull(),
  imageUrl: text("image_url").notNull(),
  order: text("order").notNull(),
});

export const contactInfo = pgTable("contact_info", {
  id: varchar("id").primaryKey(),
  mapEmbedUrl: text("map_embed_url").notNull(),
  phone: text("phone").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
});

export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({ id: true });
export const insertHeroSlideSchema = createInsertSchema(heroSlides).omit({ id: true });
export const insertCollaborationLogoSchema = createInsertSchema(collaborationLogos).omit({ id: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, createdAt: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertGalleryCategorySchema = createInsertSchema(galleryCategories).omit({ id: true });
export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true });
export const insertContactInfoSchema = createInsertSchema(contactInfo).omit({ id: true });

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type HeroSlide = typeof heroSlides.$inferSelect;
export type InsertHeroSlide = z.infer<typeof insertHeroSlideSchema>;
export type CollaborationLogo = typeof collaborationLogos.$inferSelect;
export type InsertCollaborationLogo = z.infer<typeof insertCollaborationLogoSchema>;
export type News = typeof news.$inferSelect;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;
export type GalleryCategory = typeof galleryCategories.$inferSelect;
export type InsertGalleryCategory = z.infer<typeof insertGalleryCategorySchema>;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type ContactInfo = typeof contactInfo.$inferSelect;
export type InsertContactInfo = z.infer<typeof insertContactInfoSchema>;
