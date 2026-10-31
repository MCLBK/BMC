export interface Service {
  id: number;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  target_audience: string;
  benefits: string;
  approach: string;
  image: string | null;
  category: number;
  category_name: string;
  is_featured: boolean;
  order: number;
}

export interface ServiceCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string;
  order: number;
  services: Service[];
}

export interface Training {
  id: number;
  title: string;
  slug: string;
  short_description: string;
  description?: string;
  objectives?: string;
  target_audience?: string;
  program?: string;
  prerequisites?: string;
  duration: string;
  format: string;
  level: string;
  start_date: string | null;
  end_date: string | null;
  image: string | null;
  is_featured: boolean;
  available_spots: number | null;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content?: string;
  cover_image: string | null;
  category: number;
  category_name: string;
  author_name: string;
  is_featured: boolean;
  published_at: string;
  meta_title?: string;
  meta_description?: string;
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  article_count: number;
}

export interface Project {
  id: number;
  title: string;
  slug: string;
  client_name: string;
  sector: string;
  context?: string;
  challenge?: string;
  intervention?: string;
  approach?: string;
  results?: string;
  cover_image: string | null;
  service_name: string;
  is_featured: boolean;
  images?: ProjectImage[];
}

export interface ProjectImage {
  id: number;
  image: string;
  caption: string;
  order: number;
}

export interface Opportunity {
  id: number;
  title: string;
  opportunity_type: string;
  description: string;
  requirements: string;
  location: string;
  duration: string;
  is_active: boolean;
  created_at: string;
}

export interface SiteSettings {
  site_name: string;
  tagline: string;
  description: string;
  email: string;
  phone_1: string;
  phone_2: string;
  phone_3: string;
  address: string;
  facebook_url: string;
  linkedin_url: string;
  instagram_url: string;
  twitter_url: string;
  whatsapp_number: string;
}

export interface HeroSection {
  id: number;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_url: string;
  image: string | null;
  order: number;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
