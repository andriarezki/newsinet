import { type User, type InsertUser } from "@shared/schema";
import { randomUUID } from "crypto";
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'server', 'data.json');

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  // site data
  getSiteSettings(): Promise<any>;
  setSiteSettings(data: any): Promise<void>;
  getHeroSlides(): Promise<Array<{ id: string; imageUrl: string }>>;
  setHeroSlides(slides: Array<{ id: string; imageUrl: string }>): Promise<void>;
  getCollaborationLogos(): Promise<Array<{ id: string; imageUrl: string; name: string }>>;
  setCollaborationLogos(items: Array<{ id: string; imageUrl: string; name: string }>): Promise<void>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private siteSettings: any;
  private heroSlides: Array<{ id: string; imageUrl: string }>;
  private collaborationLogos: Array<{ id: string; imageUrl: string; name: string }>;
  private newsItems: Array<any>;
  private services: Array<any>;
  private galleryCategories: Array<any>;
  private galleryImages: Array<any>;
  private contactInfo: any;
  private pages: Array<any>;

  constructor() {
    this.users = new Map();
    this.siteSettings = { logoUrl: undefined, divisionName: 'SMARTRI Information Data Management Center' };
    this.heroSlides = [];
    this.collaborationLogos = [];
    this.newsItems = [];
    this.services = [];
    this.galleryCategories = [];
    this.galleryImages = [];
    this.contactInfo = { mapEmbedUrl: '', phone: '', email: '', address: '' };
    this.pages = [];
    // load persisted data if available
    try {
      if (fs.existsSync(DATA_FILE)) {
        const raw = fs.readFileSync(DATA_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.users) {
          for (const u of parsed.users) this.users.set(u.id, u as User);
        }
        this.siteSettings = parsed.siteSettings ?? this.siteSettings;
        this.heroSlides = parsed.heroSlides ?? this.heroSlides;
        this.collaborationLogos = parsed.collaborationLogos ?? this.collaborationLogos;
        this.newsItems = parsed.newsItems ?? this.newsItems;
        this.services = parsed.services ?? this.services;
        this.galleryCategories = parsed.galleryCategories ?? this.galleryCategories;
        this.galleryImages = parsed.galleryImages ?? this.galleryImages;
        this.contactInfo = parsed.contactInfo ?? this.contactInfo;
        this.pages = parsed.pages ?? this.pages;
      }
    } catch (e) {
      // ignore load errors and continue with defaults
      // console.warn('Failed to load persisted data', e);
    }
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getSiteSettings(): Promise<any> {
    return this.siteSettings;
  }

  async setSiteSettings(data: any): Promise<void> {
    this.siteSettings = { ...this.siteSettings, ...data };
    await this.saveToDisk();
  }

  async getHeroSlides(): Promise<Array<{ id: string; imageUrl: string }>> {
    return this.heroSlides;
  }

  async setHeroSlides(slides: Array<{ id: string; imageUrl: string }>): Promise<void> {
    this.heroSlides = slides;
    await this.saveToDisk();
  }

  async getCollaborationLogos(): Promise<Array<{ id: string; imageUrl: string; name: string }>> {
    return this.collaborationLogos;
  }

  async setCollaborationLogos(items: Array<{ id: string; imageUrl: string; name: string }>): Promise<void> {
    this.collaborationLogos = items;
    await this.saveToDisk();
  }

  async getNews(): Promise<Array<any>> {
    return this.newsItems;
  }

  async setNews(items: Array<any>): Promise<void> {
    this.newsItems = items;
    await this.saveToDisk();
  }

  async getServices(): Promise<Array<any>> {
    return this.services;
  }

  async setServices(items: Array<any>): Promise<void> {
    this.services = items;
    await this.saveToDisk();
  }

  async getGalleryCategories(): Promise<Array<any>> {
    return this.galleryCategories;
  }

  async setGalleryCategories(items: Array<any>): Promise<void> {
    this.galleryCategories = items;
    await this.saveToDisk();
  }

  async getGalleryImages(): Promise<Array<any>> {
    return this.galleryImages;
  }

  async setGalleryImages(items: Array<any>): Promise<void> {
    this.galleryImages = items;
    await this.saveToDisk();
  }

  async getContactInfo(): Promise<any> {
    return this.contactInfo;
  }

  async setContactInfo(info: any): Promise<void> {
    this.contactInfo = info;
    await this.saveToDisk();
  }

  async getPages(): Promise<Array<any>> {
    return this.pages;
  }

  async setPages(items: Array<any>): Promise<void> {
    this.pages = items;
    await this.saveToDisk();
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    await this.saveToDisk();
    return user;
  }

  private async saveToDisk() {
    try {
      const payload = {
        users: Array.from(this.users.values()),
        siteSettings: this.siteSettings,
        heroSlides: this.heroSlides,
        collaborationLogos: this.collaborationLogos,
        newsItems: this.newsItems,
        services: this.services,
        galleryCategories: this.galleryCategories,
        galleryImages: this.galleryImages,
        contactInfo: this.contactInfo,
        pages: this.pages,
      };
      await fs.promises.mkdir(path.dirname(DATA_FILE), { recursive: true });
      await fs.promises.writeFile(DATA_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (e) {
      // ignore write errors for now
    }
  }
}

export const storage = new MemStorage();
