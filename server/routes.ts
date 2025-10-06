import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createServer, type Server } from "http";
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { storage } from "./storage";

function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (req.session && (req.session as any).isAdmin) return next();
  res.status(401).json({ message: 'Unauthorized' });
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ensure uploads directory exists and serve it
  const uploadsDir = path.join(process.cwd(), 'server', 'uploads');
  try { fs.mkdirSync(uploadsDir, { recursive: true }); } catch {}
  app.use('/uploads', express.static(uploadsDir));

  // multer setup with increased limits
  const storageEngine = multer.diskStorage({
    destination: function (_req, _file, cb) {
      cb(null, uploadsDir);
    },
    filename: function (_req, file, cb) {
      const unique = `${Date.now()}-${Math.random().toString(36).slice(2,8)}${path.extname(file.originalname)}`;
      cb(null, unique);
    }
  });
  const upload = multer({ 
    storage: storageEngine,
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB limit
      fieldSize: 50 * 1024 * 1024  // 50MB field size limit
    }
  });
  // auth
  app.post('/api/login', async (req: Request, res: Response) => {
    const { username, password } = req.body as any;
    // demo: accept the hard-coded admin/user credentials
    if (username === 'admin' && password === 'admin123') {
      (req.session as any).isAdmin = true;
      (req.session as any).username = 'admin';
      return res.json({ ok: true, role: 'admin' });
    }
    if (username === 'user' && password === 'user') {
      (req.session as any).isAdmin = false;
      (req.session as any).username = 'user';
      return res.json({ ok: true, role: 'user' });
    }
    res.status(401).json({ ok: false, message: 'Invalid credentials' });
  });

  app.post('/api/logout', (req: Request, res: Response) => {
    req.session && req.session.destroy?.(() => {});
    res.json({ ok: true });
  });

  // public site data endpoints
  app.get('/api/site-settings', async (req: Request, res: Response) => {
    const s = await storage.getSiteSettings();
    res.json(s);
  });

  app.get('/api/hero-slides', async (req: Request, res: Response) => {
    const slides = await storage.getHeroSlides();
    res.json(slides);
  });

  app.get('/api/collaboration-logos', async (req: Request, res: Response) => {
    const logos = await storage.getCollaborationLogos();
    res.json(logos);
  });

  app.get('/api/news', async (req: Request, res: Response) => {
    const items = await storage.getNews();
    res.json(items);
  });

  app.post('/api/news', requireAdmin, async (req: Request, res: Response) => {
    await storage.setNews(req.body);
    res.json({ ok: true });
  });

  app.get('/api/services', async (req: Request, res: Response) => {
    const items = await storage.getServices();
    res.json(items);
  });

  app.post('/api/services', requireAdmin, async (req: Request, res: Response) => {
    await storage.setServices(req.body);
    res.json({ ok: true });
  });

  app.get('/api/gallery-categories', async (req: Request, res: Response) => {
    const items = await storage.getGalleryCategories();
    res.json(items);
  });

  app.post('/api/gallery-categories', requireAdmin, async (req: Request, res: Response) => {
    await storage.setGalleryCategories(req.body);
    res.json({ ok: true });
  });

  app.get('/api/gallery-images', async (req: Request, res: Response) => {
    const items = await storage.getGalleryImages();
    res.json(items);
  });

  app.post('/api/gallery-images', requireAdmin, async (req: Request, res: Response) => {
    await storage.setGalleryImages(req.body);
    res.json({ ok: true });
  });

  app.get('/api/contact-info', async (req: Request, res: Response) => {
    const info = await storage.getContactInfo();
    res.json(info);
  });

  app.post('/api/contact-info', requireAdmin, async (req: Request, res: Response) => {
    await storage.setContactInfo(req.body);
    res.json({ ok: true });
  });

  app.get('/api/pages', async (req: Request, res: Response) => {
    const pages = await storage.getPages();
    res.json(pages);
  });

  app.post('/api/pages', requireAdmin, async (req: Request, res: Response) => {
    await storage.setPages(req.body);
    res.json({ ok: true });
  });

  // admin-only endpoints
  app.post('/api/site-settings', requireAdmin, async (req: Request, res: Response) => {
    await storage.setSiteSettings(req.body);
    res.json({ ok: true });
  });

  app.post('/api/hero-slides', requireAdmin, async (req: Request, res: Response) => {
    await storage.setHeroSlides(req.body);
    res.json({ ok: true });
  });

  app.post('/api/collaboration-logos', requireAdmin, async (req: Request, res: Response) => {
    await storage.setCollaborationLogos(req.body);
    res.json({ ok: true });
  });

  // file upload endpoint (admin only, but fallback for demo)
  app.post('/api/upload', upload.single('file'), async (req, res) => {
    if (!req.file) return res.status(400).json({ ok: false, message: 'No file uploaded' });
    // return a public URL relative to the server
    const url = `/uploads/${req.file.filename}`;
    res.json({ ok: true, url });
  });

  const httpServer = createServer(app);
  return httpServer;
}
