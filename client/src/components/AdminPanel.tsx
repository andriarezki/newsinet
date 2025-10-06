import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  // optional local setters that Home provides so AdminPanel can apply edits locally
  siteSettings?: { logoUrl?: string; divisionName?: string };
  setSiteSettings?: React.Dispatch<React.SetStateAction<{ logoUrl?: string; divisionName: string }>>;
  heroSlides?: Array<{ id: string; imageUrl: string }>;
  setHeroSlides?: React.Dispatch<React.SetStateAction<Array<{ id: string; imageUrl: string }>>>;
  collaborationLogos?: Array<{ id: string; name?: string; imageUrl: string }>;
  setCollaborationLogos?: React.Dispatch<React.SetStateAction<Array<{ id: string; name?: string; imageUrl: string }>>>;
  newsItems?: Array<any>;
  setNewsItems?: React.Dispatch<React.SetStateAction<Array<any>>>;
  galleryCategories?: Array<{ id: string; title: string }>;
  setGalleryCategories?: React.Dispatch<React.SetStateAction<Array<{ id: string; title: string }>>>;
  galleryImages?: Array<{ id: string; imageUrl: string; categoryId?: string }>;
  setGalleryImages?: React.Dispatch<React.SetStateAction<Array<{ id: string; imageUrl: string; categoryId?: string }>>>;
}

const TABS = [
  { key: 'siteSettings', label: 'Site Settings', get: '/api/site-settings', post: '/api/site-settings' },
  { key: 'heroSlides', label: 'Hero Slides', get: '/api/hero-slides', post: '/api/hero-slides' },
  { key: 'collab', label: 'Collaboration Logos', get: '/api/collaboration-logos', post: '/api/collaboration-logos' },
  { key: 'news', label: 'News', get: '/api/news', post: '/api/news' },
  { key: 'services', label: 'Services', get: '/api/services', post: '/api/services' },
  { key: 'galleryCats', label: 'Gallery Categories', get: '/api/gallery-categories', post: '/api/gallery-categories' },
  { key: 'galleryImgs', label: 'Gallery Images', get: '/api/gallery-images', post: '/api/gallery-images' },
  { key: 'contact', label: 'Contact Info', get: '/api/contact-info', post: '/api/contact-info' },
  { key: 'pages', label: 'Pages', get: '/api/pages', post: '/api/pages' },
];

export default function AdminPanel({ isOpen, onClose, siteSettings, setSiteSettings, heroSlides, setHeroSlides, collaborationLogos, setCollaborationLogos, galleryCategories, setGalleryCategories, galleryImages, setGalleryImages, newsItems, setNewsItems }: AdminPanelProps) {
  const [active, setActive] = useState(TABS[0].key);
  const [dataMap, setDataMap] = useState<Record<string, any>>({});
  const [rawJson, setRawJson] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      setLoading(true);
      const map: Record<string, any> = {};
      for (const t of TABS) {
        try {
          const r = await fetch(t.get, { credentials: 'include' });
          if (r.ok) map[t.key] = await r.json();
          else map[t.key] = null;
        } catch (e) {
          map[t.key] = null;
        }
      }
      // ensure local-provided values (from Home) are used if server returns null
      if (siteSettings && !map.siteSettings) map.siteSettings = siteSettings;
      if (heroSlides && (!map.heroSlides || !map.heroSlides.length)) map.heroSlides = heroSlides;
      if (collaborationLogos && (!map.collab || !map.collab.length)) map.collab = collaborationLogos;

      setDataMap(map);
      setRawJson(JSON.stringify(map[active] ?? {}, null, 2));
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    setRawJson(JSON.stringify(dataMap[active] ?? {}, null, 2));
  }, [active, dataMap]);

  if (!isOpen) return null;

  const save = async () => {
    setError(null);
    try {
      const tab = TABS.find((t) => t.key === active)!;
      const parsed = JSON.parse(rawJson);
  // optimistic update
  setDataMap((m: Record<string, any>) => ({ ...m, [active]: parsed }));

      // apply to local setters if provided (so Home updates and persists to localStorage)
      try {
        if (active === 'siteSettings' && setSiteSettings) setSiteSettings(parsed);
        if (active === 'heroSlides' && setHeroSlides) setHeroSlides(parsed);
        if (active === 'collab' && setCollaborationLogos) setCollaborationLogos(parsed);
      } catch (e) {
        // continue
      }

      // send to server (best-effort)
      try {
        await fetch(tab.post, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(parsed) });
      } catch (e) {
        // server error — keep local
      }
      onClose();
    } catch (e: any) {
      setError(e.message || String(e));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-start justify-center p-6" onClick={onClose}>
  <Card className="w-full max-w-5xl mt-8" onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <CardHeader>
          <CardTitle>Admin — Edit Site Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="w-48">
              <nav className="flex flex-col gap-1">
                {TABS.map((t) => (
                  <button key={t.key} className={`text-left p-2 rounded ${active === t.key ? 'bg-muted' : ''}`} onClick={() => setActive(t.key)}>
                    {t.label}
                  </button>
                ))}
              </nav>
            </div>
            <div className="flex-1">
              <div className="mb-2">Editing: <strong>{TABS.find((x) => x.key === active)?.label}</strong></div>
              {active === 'siteSettings' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Division Name</label>
                    <input className="w-full p-2 border rounded" value={(dataMap.siteSettings?.divisionName) ?? ''} onChange={(e) => {
                      const v = e.target.value;
                      setDataMap((m: Record<string, any>) => ({ ...m, siteSettings: { ...m.siteSettings, divisionName: v } } as any));
                      setRawJson(JSON.stringify({ ...dataMap.siteSettings, divisionName: v }, null, 2));
                    }} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Logo</label>
                    <div className="flex gap-2 items-center">
                      <img src={dataMap.siteSettings?.logoUrl || '/images/placeholder-logo.png'} alt="logo" className="h-12 w-auto border" />
                      <input type="file" accept="image/*" onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        // preview locally
                        const reader = new FileReader();
                        reader.onload = () => setPreviewSrc(String(reader.result));
                        reader.readAsDataURL(file);

                        const form = new FormData();
                        form.append('file', file);
                        try {
                          setUploadProgress(0);
                          await new Promise<void>((resolve, reject) => {
                            const xhr = new XMLHttpRequest();
                            xhr.open('POST', '/api/upload');
                            xhr.withCredentials = true;
                            xhr.onload = () => {
                              if (xhr.status >= 200 && xhr.status < 300) {
                                const body = JSON.parse(xhr.responseText);
                                const url = body.url;
                                setDataMap((m: Record<string, any>) => ({ ...m, siteSettings: { ...m.siteSettings, logoUrl: url } } as any));
                                setRawJson(JSON.stringify({ ...dataMap.siteSettings, logoUrl: url }, null, 2));
                                try { setSiteSettings && setSiteSettings({ ...(dataMap.siteSettings || {}), logoUrl: url }); } catch {}
                                setUploadProgress(100);
                                resolve();
                              } else {
                                reject(new Error('Upload failed'));
                              }
                            };
                            xhr.onerror = () => reject(new Error('Upload failed'));
                            xhr.upload.onprogress = (ev) => { if (ev.lengthComputable) setUploadProgress(Math.round((ev.loaded / ev.total) * 100)); };
                            xhr.send(form);
                          });
                        } catch (err) {
                          // ignore
                        }
                      }} />
                      {previewSrc && <img src={previewSrc} className="h-12 w-auto border ml-2" />}
                      {uploadProgress > 0 && uploadProgress < 100 && <div className="text-xs ml-2">Uploading: {uploadProgress}%</div>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Hero Slides (comma separated URLs)</label>
                    <input className="w-full p-2 border rounded" value={(dataMap.heroSlides || []).map((s: any) => s.imageUrl).join(',')} onChange={(e) => {
                      const urls = e.target.value.split(',').map((u: string) => u.trim()).filter(Boolean);
                      const parsed = urls.map((u: string, i: number) => ({ id: String(i+1), imageUrl: u }));
                      setDataMap((m: Record<string, any>) => ({ ...m, heroSlides: parsed } as any));
                      setRawJson(JSON.stringify(parsed, null, 2));
                      try { setHeroSlides && setHeroSlides(parsed); } catch {}
                    }} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium">Collaboration Logos (format: name|url, comma separated)</label>
                    <input className="w-full p-2 border rounded" value={(dataMap.collab || []).map((c: any) => `${c.name || ''}|${c.imageUrl}`).join(',')} onChange={(e) => {
                      const parts = e.target.value.split(',').map((p: string) => p.trim()).filter(Boolean);
                      const parsed = parts.map((p: string, i: number) => {
                        const [name, url] = p.split('|').map((s: string) => s && s.trim());
                        return { id: String(i+1), name: name || `Partner ${i+1}`, imageUrl: url || '' };
                      });
                      setDataMap((m: Record<string, any>) => ({ ...m, collab: parsed } as any));
                      setRawJson(JSON.stringify(parsed, null, 2));
                      try { setCollaborationLogos && setCollaborationLogos(parsed); } catch {}
                    }} />
                  </div>

                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                  </div>
                </div>
              ) : active === 'heroSlides' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Slides</label>
                    <div className="space-y-2">
                      {(dataMap.heroSlides || []).map((s: any, idx: number) => (
                        <div key={s.id || idx} className="flex items-center gap-2">
                          <img src={s.imageUrl} className="h-20 w-32 object-cover border" />
                          <input className="flex-1 p-2 border" value={s.imageUrl} onChange={(e) => {
                            const v = e.target.value;
                            const copy = (dataMap.heroSlides || []).slice();
                            copy[idx] = { ...copy[idx], imageUrl: v };
                            setDataMap((m: Record<string, any>) => ({ ...m, heroSlides: copy }));
                            setRawJson(JSON.stringify(copy, null, 2));
                          }} />
                          <button className="px-2 py-1 border rounded" onClick={() => {
                            const copy = (dataMap.heroSlides || []).slice();
                            copy.splice(idx, 1);
                            setDataMap((m: Record<string, any>) => ({ ...m, heroSlides: copy }));
                            setRawJson(JSON.stringify(copy, null, 2));
                          }}>Remove</button>
                        </div>
                      ))}
                      <div className="flex gap-2">
                        <input type="file" accept="image/*" onChange={async (e) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          const form = new FormData(); form.append('file', file);
                          try {
                            const resp = await fetch('/api/upload', { method: 'POST', body: form });
                            if (resp.ok) {
                              const body = await resp.json();
                              const url = body.url;
                              const copy = (dataMap.heroSlides || []).slice();
                              copy.push({ id: String(Date.now()), imageUrl: url });
                              setDataMap((m: Record<string, any>) => ({ ...m, heroSlides: copy }));
                              setRawJson(JSON.stringify(copy, null, 2));
                              try { setHeroSlides && setHeroSlides(copy); } catch {}
                            }
                          } catch (err) {}
                        }} />
                        <Button onClick={() => {
                          const copy = (dataMap.heroSlides || []).slice();
                          copy.push({ id: String(Date.now()), imageUrl: 'https://via.placeholder.com/600x300' });
                          setDataMap((m: Record<string, any>) => ({ ...m, heroSlides: copy }));
                          setRawJson(JSON.stringify(copy, null, 2));
                        }}>Add Slide</Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                  </div>
                </div>
              ) : active === 'galleryImgs' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium">Gallery Images</label>
                    <div className="space-y-2">
                      {(dataMap.galleryImgs || dataMap.galleryImages || []).map((g: any, idx: number) => (
                        <div key={g.id || idx} className="flex items-center gap-2">
                          <img src={g.imageUrl} className="h-20 w-32 object-cover border" />
                          <select value={g.categoryId || ''} onChange={(e) => {
                            const v = e.target.value;
                            const copy = (dataMap.galleryImgs || dataMap.galleryImages || []).slice();
                            copy[idx] = { ...copy[idx], categoryId: v };
                            setDataMap((m: Record<string, any>) => ({ ...m, galleryImgs: copy, galleryImages: copy }));
                            setRawJson(JSON.stringify(copy, null, 2));
                          }}>
                            <option value="">Uncategorized</option>
                            {(dataMap.galleryCats || dataMap.galleryCategories || []).map((c: any) => (
                              <option key={c.id} value={c.id}>{c.title}</option>
                            ))}
                          </select>
                          <input className="flex-1 p-2 border" value={g.imageUrl} onChange={(e) => {
                            const v = e.target.value;
                            const copy = (dataMap.galleryImgs || dataMap.galleryImages || []).slice();
                            copy[idx] = { ...copy[idx], imageUrl: v };
                            setDataMap((m: Record<string, any>) => ({ ...m, galleryImgs: copy, galleryImages: copy }));
                            setRawJson(JSON.stringify(copy, null, 2));
                          }} />
                          <button className="px-2 py-1 border rounded" onClick={() => {
                            const copy = (dataMap.galleryImgs || dataMap.galleryImages || []).slice();
                            copy.splice(idx, 1);
                            setDataMap((m: Record<string, any>) => ({ ...m, galleryImgs: copy, galleryImages: copy }));
                            setRawJson(JSON.stringify(copy, null, 2));
                          }}>Remove</button>
                        </div>
                      ))}

                      <div className="flex gap-2">
                        <input type="file" accept="image/*" onChange={async (e) => {
                          const file = e.target.files?.[0]; if (!file) return;
                          const form = new FormData(); form.append('file', file);
                          try {
                            const resp = await fetch('/api/upload', { method: 'POST', body: form });
                            if (resp.ok) {
                              const body = await resp.json();
                              const url = body.url;
                              const copy = (dataMap.galleryImgs || dataMap.galleryImages || []).slice();
                              copy.push({ id: String(Date.now()), imageUrl: url });
                              setDataMap((m: Record<string, any>) => ({ ...m, galleryImgs: copy, galleryImages: copy }));
                              setRawJson(JSON.stringify(copy, null, 2));
                              try { setGalleryImages && setGalleryImages(copy); } catch {}
                            }
                          } catch (err) {}
                        }} />
                        <Button onClick={() => {
                          const copy = (dataMap.galleryImgs || dataMap.galleryImages || []).slice();
                          copy.push({ id: String(Date.now()), imageUrl: 'https://via.placeholder.com/600x400' });
                          setDataMap((m: Record<string, any>) => ({ ...m, galleryImgs: copy, galleryImages: copy }));
                          setRawJson(JSON.stringify(copy, null, 2));
                        }}>Add Image</Button>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                  </div>
                </div>
              ) : (
                <>
                  <textarea className="w-full h-96 p-2 border" value={rawJson} onChange={(e) => setRawJson(e.target.value)} />
                  {error && <div className="text-destructive mt-2">Error: {error}</div>}
                  <div className="mt-3 flex justify-end gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button onClick={save}>Save</Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
