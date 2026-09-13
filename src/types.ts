export interface Project {
  id: string;
  title: string;
  category: 'Full-Stack' | 'Frontend' | 'IoT & Hardware' | 'AI & Data';
  description: string;
  longDescription?: string;
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  features: string[];
  role: string;
  badge?: string;
}

export interface SkillItem {
  name: string;
  category: 'Frontend' | 'Backend' | 'Programming' | 'AI & Data' | 'Tools';
  level: string; // e.g., 'Advanced', 'Proficient', 'Familiar'
  highlight?: boolean;
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  detailedDescription: string;
  technologies: string[];
  deliverables: string[];
}

export interface TimelineItem {
  id: string;
  type: 'Education' | 'Projects' | 'Learning' | 'Experience' | 'Achievement';
  title: string;
  subtitle: string;
  organization: string;
  location: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  organization: string;
  date: string;
  category: string;
  credentialId?: string;
  skills: string[];
  summary: string;
  imageUrl?: string;
  imageAlt?: string;
  scholarshipBadge?: string;
  program?: string;
  intake?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  label: string;
}
