export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  technologies: string[];
  features: string[];
  metrics?: { label: string; value: string }[];
  github?: string;
  demo?: string;
  image?: string;
  sceneId: 'cnc' | 'sustatio' | 'plant' | 'perf';
  caseStudy: {
    challenge: string;
    solution: string;
    architecture: string[];
    outcomes: string[];
  };
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    highlight?: boolean;
    tag?: string;
  }[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  duration: string;
  type: string;
  description: string[];
  skills: string[];
  deliverables: string[];
}

export interface Achievement {
  id: string;
  title: string;
  position: string;
  organization: string;
  year: string;
  description: string;
  badge?: string;
  highlight?: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  skills: string[];
  badgeColor?: string;
}

export interface NavItem {
  label: string;
  href: string;
  id: string;
}

export interface SceneContainerProps {
  sceneId?: string;
  className?: string;
  interactive?: boolean;
  onSceneReady?: () => void;
}
