import { Certification } from '../types/portfolio';

export const certifications: Certification[] = [
  {
    id: 'ibm-ai',
    title: 'Artificial Intelligence Fundamentals',
    issuer: 'IBM',
    year: '2024',
    skills: ['Machine Learning', 'Neural Networks', 'AI Ethics', 'Computer Vision'],
    badgeColor: 'blue',
  },
  {
    id: 'ms-azure',
    title: 'Azure Fundamentals & DevOps',
    issuer: 'Microsoft',
    year: '2024',
    skills: ['Cloud Architecture', 'CI/CD Pipelines', 'Azure Services', 'DevOps Principles'],
    badgeColor: 'cyan',
  },
  {
    id: 'mongodb',
    title: 'MongoDB Basics',
    issuer: 'MongoDB University',
    year: '2024',
    skills: ['Document Model', 'CRUD Operations', 'Aggregation Pipeline', 'Indexing'],
    badgeColor: 'emerald',
  },
  {
    id: 'nptel-cloud',
    title: 'Cloud Computing',
    issuer: 'NPTEL / IIT',
    year: '2025',
    skills: ['Distributed Systems', 'Virtualization', 'Resource Scheduling', 'Cloud Security'],
    badgeColor: 'amber',
  },
  {
    id: 'hackerrank-python',
    title: 'Python Certification',
    issuer: 'HackerRank',
    year: '2024',
    skills: ['Algorithms', 'Data Structures', 'OOP', 'Functional Programming'],
    badgeColor: 'purple',
  },
  {
    id: 'hackerrank-java',
    title: 'Java Basic Certification',
    issuer: 'HackerRank',
    year: '2024',
    skills: ['Core Java', 'OOP Concepts', 'Collections Framework', 'Exception Handling'],
    badgeColor: 'orange',
  },
];
