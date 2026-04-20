import React, { useState } from 'react';
import {Zap, Code, Database, Globe, GitBranch } from 'lucide-react';
import RectImg from '../assets/certificateImg/Saif-Advanced React & Hooks.png';
import GitImg from '../assets/certificateImg/Saif-Git & GitHub Essentials.png'; 
import MERNImg from '../assets/certificateImg/saif-MERN Stack Development (MongoDB, Express, React, Node).png';
import NodeImg from '../assets/certificateImg/saif-Node.js Backend Development.png';
import MongoImg from '../assets/certificateImg/saif-MongoDB Fundamentals.png';

// Demo certificates data with image paths
const demoCertificates = [
  {
    id: 'cert-001',
    courseTitle: 'Git & GitHub Essentials',
    userName: 'Saif',
    percentage: 100,
    score: 10,
    total: 10,
    date: '2025-08-14',
    certificateNumber: 'ST-2025-2642',
    icon: GitBranch,
    gradient: 'from-orange-500 to-red-500',
    category: 'Tools',
    description: 'Master version control with Git and collaborate using GitHub.',
    pdf: GitImg,
  },
  {
    id: 'cert-002',
    courseTitle: 'Full Stack Web Development with MERN',
    userName: 'Saif',
    percentage: 100,
    score: 10,
    total: 10,
    date: '2025-08-13',
    certificateNumber: 'ST-2025-0260',
    icon: Globe,
    gradient: 'from-blue-500 to-purple-600',
    category: 'Fullstack',
    description: 'Full Stack Web Development with MERN',
    pdf: MERNImg,
  },
  {
    id: 'cert-003',
    courseTitle: 'MongoDB Fundamentals',
    userName: 'Saif',
    percentage: 100,
    score: 10,
    total: 10,
    date: '2025-08-14',
    certificateNumber: 'ST-2025-0553',
    icon: Database,
    gradient: 'from-green-500 to-emerald-600',
    category: 'Database',
    description: 'Understand NoSQL database design with MongoDB.',
    pdf: MongoImg,
  },
  {
    id: 'cert-004',
    courseTitle: 'Node.js Backend Development',
    userName: 'Saif',
    percentage: 100,
    score: 10,
    total: 10,
    date: '2025-08-14',
    certificateNumber: 'ST-2025-2526',
    icon: Zap,
    gradient: 'from-yellow-500 to-orange-500',
    category: 'Backend',
    description: 'Learn backend programming using Node.js.',
    pdf: NodeImg,
  },
  {
    id: 'cert-005',
    courseTitle: 'Advanced React & Hooks',
    userName: 'Saif',
    percentage: 100,
    score: 10,
    total: 10,
    date: '2025-08-14',
    certificateNumber: 'ST-2025-4945',
    icon: Code,
    gradient: 'from-cyan-500 to-blue-600',
    category: 'Frontend',
    description: 'Dive deeper into advanced React concepts and hooks.',
    pdf: RectImg,
  }
];

export default demoCertificates;
