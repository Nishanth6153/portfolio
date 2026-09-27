import { SkillCategory } from '../types/portfolio';

export const skillCategories: SkillCategory[] = [
  {
    id: 'ai-ml',
    title: 'AI / Machine Learning',
    description: 'Deep learning architectures, edge inference, computer vision, and predictive modeling.',
    skills: [
      { name: 'Machine Learning', highlight: true, tag: 'Core AI' },
      { name: 'TensorFlow Lite', highlight: true, tag: 'Edge AI' },
      { name: 'MobileNetV2', highlight: true, tag: 'Vision' },
      { name: 'Data Preprocessing', highlight: false },
      { name: 'Feature Engineering', highlight: false },
      { name: 'Model Quantization', highlight: false },
    ],
  },
  {
    id: 'programming',
    title: 'Programming Languages',
    description: 'Object-oriented, functional, and systems programming languages for computational workflows.',
    skills: [
      { name: 'Python', highlight: true, tag: 'Primary' },
      { name: 'Java', highlight: true, tag: 'Enterprise' },
      { name: 'R', highlight: false, tag: 'Analytics' },
      { name: 'C', highlight: false, tag: 'Systems' },
      { name: 'TypeScript', highlight: true, tag: 'Type-Safe' },
      { name: 'Kotlin', highlight: false, tag: 'Android' },
    ],
  },
  {
    id: 'web-backend',
    title: 'Web & API Development',
    description: 'High-performance API engines, responsive client architectures, and modern web paradigms.',
    skills: [
      { name: 'FastAPI', highlight: true, tag: 'Async API' },
      { name: 'JavaScript', highlight: true, tag: 'Modern ES6+' },
      { name: 'HTML5', highlight: false },
      { name: 'CSS3', highlight: false },
      { name: 'React', highlight: true, tag: 'Frontend' },
      { name: 'Tailwind CSS', highlight: false, tag: 'Design Systems' },
    ],
  },
  {
    id: 'databases',
    title: 'Databases & Persistence',
    description: 'Relational data modeling, vector stores, and document-oriented databases.',
    skills: [
      { name: 'Supabase', highlight: true, tag: 'PostgreSQL & Realtime' },
      { name: 'MongoDB', highlight: true, tag: 'NoSQL Document Store' },
      { name: 'SQL Query Optimization', highlight: false },
      { name: 'Schema Design', highlight: false },
    ],
  },
  {
    id: 'devops-infra',
    title: 'DevOps & Tooling',
    description: 'Reproducible containerization, version control workflows, and Linux environments.',
    skills: [
      { name: 'Docker', highlight: true, tag: 'Containers' },
      { name: 'Git', highlight: true, tag: 'VCS' },
      { name: 'GitHub', highlight: true, tag: 'CI/CD' },
      { name: 'Linux', highlight: false, tag: 'Shell & CLI' },
      { name: 'k6 Benchmarking', highlight: false },
      { name: 'Prometheus & Grafana', highlight: false },
    ],
  },
  {
    id: 'core-cs',
    title: 'Core Computer Science',
    description: 'Foundational algorithmic concepts, software engineering patterns, and systems design.',
    skills: [
      { name: 'Data Structures & Algorithms', highlight: true, tag: 'Algorithms' },
      { name: 'Object-Oriented Programming (OOP)', highlight: true, tag: 'Design Patterns' },
      { name: 'Database Management Systems (DBMS)', highlight: false },
      { name: 'Operating Systems', highlight: false },
    ],
  },
];
