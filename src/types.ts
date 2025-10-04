export interface Result {
  id: string;
  created_at: string;
  category: string;
  event: string;
  participant: string;
  school: string;
  position: number;
  year: string;
  result_number: number;
}

export interface Team {
  id: string;
  created_at: string;
  name: string;
  points: number;
}

export interface GalleryItem {
    id: string;
    created_at: string;
    title: string;
    description: string;
    category: string;
    image_url: string;
    photographer: string;
    views: number;
}

export interface NewsItem {
  id: string;
  created_at: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  is_featured: boolean;
  status: 'published' | 'draft';
  views: number;
}

export interface ContactMessage {
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    status: 'unread' | 'read' | 'replied';
}

export interface AboutContent {
    id: number;
    section: 'mission' | 'vision' | 'history';
    content: string;
    updated_at: string;
}

export interface TeamMember {
    id: string;
    created_at: string;
    name: string;
    position: string;
    bio: string;
    image_url: string;
}

export interface HomepageBackground {
  id: string;
  created_at: string;
  type: 'image' | 'video';
  url: string;
  is_active: boolean;
}

export interface TextStyle {
  size: number;
  color: string;
  align: 'left' | 'center' | 'right';
  weight: '400' | '500' | '600' | '700' | '800' | '900';
  font: 'Poppins' | 'Inter' | 'Lexend' | 'Plus Jakarta Sans' | 'MuseoModerno' | 'Cinzel Decorative' | 'Pacifico' | 'Cooper Hewitt';
  y: number;
  x: number;
}

export interface PosterStyles {
  [key: string]: TextStyle;
  resultNumber?: TextStyle;
}

export interface PosterTemplate {
  id: string;
  created_at: string;
  name: string;
  layout_name: string;
  component_name: string | null;
  thumbnail_url: string | null;
  is_active: boolean;
  styles: PosterStyles | null;
  background_image_url: string | null;
  width: number;
  height: number;
}

export interface SiteSetting {
  key: string;
  value: string | null;
}
