export type Language = 'en' | 'fa';

export type PageId = 'home' | 'work' | 'about' | 'experience' | 'contact';

export type ProjectCategory =
  | 'brand_identity'
  | 'packaging'
  | 'industrial_b2b'
  | 'art_direction_motion'
  | 'digital_campaigns';

export interface ProjectItem {
  id: string;
  slug: string;
  title: { en: string; fa: string };
  client: { en: string; fa: string };
  category: ProjectCategory;
  categoryLabel: { en: string; fa: string };
  industry: { en: string; fa: string };
  year: string;
  featured: boolean;
  heroImage: string;
  galleryImages: string[];
  role: { en: string; fa: string };
  context: { en: string; fa: string };
  creativeDirection: { en: string; fa: string };
  designDevelopment: { en: string; fa: string };
  deliverables: { en: string[]; fa: string[] };
  outcomesAndImpact: { en: string; fa: string };
  stats?: { value: string; label: { en: string; fa: string } };
  credits: { en: string; fa: string };
}

export interface ExperienceItem {
  id: string;
  company: { en: string; fa: string };
  role: { en: string; fa: string };
  period: { en: string; fa: string };
  location: { en: string; fa: string };
  type: { en: string; fa: string };
  summary: { en: string; fa: string };
  highlights: { en: string[]; fa: string[] };
  badge?: string;
}

export interface AreaOfExpertise {
  id: string;
  title: { en: string; fa: string };
  description: { en: string; fa: string };
  skills: { en: string[]; fa: string[] };
}
