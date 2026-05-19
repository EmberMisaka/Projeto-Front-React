export interface Service {
  id: string;
  title: string;
  description: string;
  category: 'frontend' | 'uxui' | 'backend' | 'ia' | 'dados';
  price: number;
  providerId: string;
  providerName: string;
  providerAvatar?: string;
  rating: number;
  reviews: number;
  image?: string;
}

export interface Order {
  id: string;
  serviceId: string;
  serviceName: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  price: number;
  date: string;
  providerRating?: number;
  clientRating?: number;
  providerReview?: string;
  clientReview?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract';
  description: string;
  requirements: string[];
  postedDate: string;
  status: 'open' | 'coming-soon';
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  type: 'provider' | 'client';
  photo?: string;
  banner?: string;
  bio?: string;
  rating: number;
  reviewsCount: number;
  joinDate: string;
  location?: string;
  website?: string;
  skills?: string[];
  totalOrders?: number;
  status?: 'active' | 'restricted' | 'banned';
  warnings?: number;
}

export interface UserReview {
  id: string;
  reviewerId: string;
  reviewerName: string;
  reviewerAvatar?: string;
  reviewerType: 'provider' | 'client';
  rating: number;
  comment: string;
  date: string;
  orderId: string;
  serviceName: string;
}

export interface Moderation {
  id: string;
  userId: string;
  username: string;
  type: 'warning' | 'restriction' | 'ban';
  reason: string;
  duration: number; // in hours
  startDate: string;
  endDate: string;
  adminId: string;
  status: 'active' | 'expired';
}

export const mockServices: Service[] = [
  {
    id: '1',
    title: 'Desenvolvimento de Landing Page em React',
    description: 'Criação de landing page moderna e responsiva com React e Tailwind CSS',
    category: 'frontend',
    price: 1500,
    providerId: '1',
    providerName: 'DevPro',
    rating: 4.9,
    reviews: 47,
  },
  {
    id: '2',
    title: 'Design de Interface Completa',
    description: 'Design de interface completa para aplicativos web e mobile',
    category: 'uxui',
    price: 2500,
    providerId: '3',
    providerName: 'DesignMaster',
    rating: 5.0,
    reviews: 62,
  },
  {
    id: '3',
    title: 'API REST com Node.js',
    description: 'Desenvolvimento de API RESTful com Node.js, Express e MongoDB',
    category: 'backend',
    price: 3000,
    providerId: '4',
    providerName: 'BackendPro',
    rating: 4.8,
    reviews: 35,
  },
  {
    id: '4',
    title: 'Modelo de Machine Learning',
    description: 'Criação e treinamento de modelo de ML personalizado',
    category: 'ia',
    price: 5000,
    providerId: '5',
    providerName: 'AIExpert',
    rating: 4.9,
    reviews: 28,
  },
  {
    id: '5',
    title: 'Análise de Dados e Dashboard',
    description: 'Análise completa de dados com visualizações interativas',
    category: 'dados',
    price: 2000,
    providerId: '6',
    providerName: 'DataScientist',
    rating: 4.7,
    reviews: 41,
  },
  {
    id: '6',
    title: 'Sistema de Autenticação',
    description: 'Implementação de sistema de autenticação seguro com JWT',
    category: 'backend',
    price: 1800,
    providerId: '4',
    providerName: 'BackendPro',
    rating: 4.9,
    reviews: 52,
  },
  {
    id: '7',
    title: 'Dashboard Administrativo',
    description: 'Dashboard completo com gráficos e gerenciamento de dados',
    category: 'frontend',
    price: 2200,
    providerId: '1',
    providerName: 'DevPro',
    rating: 4.8,
    reviews: 38,
  },
  {
    id: '8',
    title: 'Prototipagem de App Mobile',
    description: 'Prototipação interativa de aplicativo mobile no Figma',
    category: 'uxui',
    price: 1200,
    providerId: '3',
    providerName: 'DesignMaster',
    rating: 5.0,
    reviews: 55,
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    serviceId: '1',
    serviceName: 'Desenvolvimento de Landing Page em React',
    clientId: '101',
    clientName: 'TechClient',
    providerId: '1',
    providerName: 'DevPro',
    status: 'completed',
    price: 1500,
    date: '2026-03-15',
    rating: 5,
  },
  {
    id: '2',
    serviceId: '7',
    serviceName: 'Dashboard Administrativo',
    clientId: '102',
    clientName: 'StartupXYZ',
    providerId: '1',
    providerName: 'DevPro',
    status: 'in-progress',
    price: 2200,
    date: '2026-03-20',
  },
  {
    id: '3',
    serviceId: '1',
    serviceName: 'Desenvolvimento de Landing Page em React',
    clientId: '103',
    clientName: 'EcommerceBR',
    providerId: '1',
    providerName: 'DevPro',
    status: 'pending',
    price: 1500,
    date: '2026-03-25',
  },
  {
    id: '4',
    serviceId: '7',
    serviceName: 'Dashboard Administrativo',
    clientId: '104',
    clientName: 'FinanceCorp',
    providerId: '1',
    providerName: 'DevPro',
    status: 'completed',
    price: 2200,
    date: '2026-03-01',
    rating: 5,
  },
];

export const categoryNames = {
  frontend: 'Frontend',
  uxui: 'UX/UI',
  backend: 'Backend',
  ia: 'IA',
  dados: 'Dados',
};

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Desenvolvedor(a) Frontend',
    department: 'Desenvolvimento',
    location: 'São Paulo, SP',
    type: 'full-time',
    description: 'Desenvolvimento de interfaces de usuário para aplicações web.',
    requirements: ['Experiência com React', 'Conhecimento em Tailwind CSS'],
    postedDate: '2026-03-01',
    status: 'open',
  },
  {
    id: '2',
    title: 'Designer(a) UX/UI',
    department: 'Design',
    location: 'Rio de Janeiro, RJ',
    type: 'part-time',
    description: 'Design de interfaces de usuário para aplicativos web e mobile.',
    requirements: ['Experiência com Figma', 'Conhecimento em UX/UI'],
    postedDate: '2026-03-05',
    status: 'open',
  },
  {
    id: '3',
    title: 'Desenvolvedor(a) Backend',
    department: 'Desenvolvimento',
    location: 'Belo Horizonte, MG',
    type: 'contract',
    description: 'Desenvolvimento de APIs RESTful com Node.js, Express e MongoDB.',
    requirements: ['Experiência com Node.js', 'Conhecimento em MongoDB'],
    postedDate: '2026-03-10',
    status: 'open',
  },
  {
    id: '4',
    title: 'Engenheiro(a) de Machine Learning',
    department: 'IA',
    location: 'Curitiba, PR',
    type: 'full-time',
    description: 'Criação e treinamento de modelos de machine learning personalizados.',
    requirements: ['Experiência com Python', 'Conhecimento em ML'],
    postedDate: '2026-03-15',
    status: 'open',
  },
  {
    id: '5',
    title: 'Analista(a) de Dados',
    department: 'Dados',
    location: 'Brasília, DF',
    type: 'part-time',
    description: 'Análise completa de dados com visualizações interativas.',
    requirements: ['Experiência com Python', 'Conhecimento em Pandas'],
    postedDate: '2026-03-20',
    status: 'open',
  },
];

export const mockUserProfiles: UserProfile[] = [
  {
    id: '1',
    username: 'DevPro',
    email: 'devpro@example.com',
    type: 'provider',
    photo: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/800x200',
    bio: 'Desenvolvedor(a) frontend com experiência em React e Tailwind CSS.',
    rating: 4.9,
    reviewsCount: 47,
    joinDate: '2026-01-01',
    location: 'São Paulo, SP',
    website: 'https://devpro.com',
    skills: ['React', 'Tailwind CSS'],
    totalOrders: 10,
    status: 'active',
    warnings: 0,
  },
  {
    id: '2',
    username: 'DesignMaster',
    email: 'designmaster@example.com',
    type: 'provider',
    photo: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/800x200',
    bio: 'Designer(a) UX/UI com experiência em Figma e princípios de design.',
    rating: 5.0,
    reviewsCount: 62,
    joinDate: '2026-01-05',
    location: 'Rio de Janeiro, RJ',
    website: 'https://designmaster.com',
    skills: ['Figma', 'UX/UI'],
    totalOrders: 15,
    status: 'active',
    warnings: 0,
  },
  {
    id: '3',
    username: 'BackendPro',
    email: 'backendpro@example.com',
    type: 'provider',
    photo: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/800x200',
    bio: 'Desenvolvedor(a) backend com experiência em Node.js, Express e MongoDB.',
    rating: 4.8,
    reviewsCount: 35,
    joinDate: '2026-01-10',
    location: 'Belo Horizonte, MG',
    website: 'https://backendpro.com',
    skills: ['Node.js', 'MongoDB'],
    totalOrders: 8,
    status: 'active',
    warnings: 0,
  },
  {
    id: '4',
    username: 'AIExpert',
    email: 'aiexpert@example.com',
    type: 'provider',
    photo: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/800x200',
    bio: 'Engenheiro(a) de machine learning com experiência em Python e ML.',
    rating: 4.9,
    reviewsCount: 28,
    joinDate: '2026-01-15',
    location: 'Curitiba, PR',
    website: 'https://aiexpert.com',
    skills: ['Python', 'ML'],
    totalOrders: 5,
    status: 'active',
    warnings: 0,
  },
  {
    id: '5',
    username: 'DataScientist',
    email: 'datascientist@example.com',
    type: 'provider',
    photo: 'https://via.placeholder.com/150',
    banner: 'https://via.placeholder.com/800x200',
    bio: 'Analista(a) de dados com experiência em Python e Pandas.',
    rating: 4.7,
    reviewsCount: 41,
    joinDate: '2026-01-20',
    location: 'Brasília, DF',
    website: 'https://datascientist.com',
    skills: ['Python', 'Pandas'],
    totalOrders: 12,
    status: 'active',
    warnings: 0,
  },
];

export const mockUserReviews: UserReview[] = [
  {
    id: '1',
    reviewerId: '101',
    reviewerName: 'TechClient',
    reviewerAvatar: 'https://via.placeholder.com/150',
    reviewerType: 'client',
    rating: 5,
    comment: 'Excelente serviço! A landing page ficou incrível.',
    date: '2026-03-15',
    orderId: '1',
    serviceName: 'Desenvolvimento de Landing Page em React',
  },
  {
    id: '2',
    reviewerId: '102',
    reviewerName: 'StartupXYZ',
    reviewerAvatar: 'https://via.placeholder.com/150',
    reviewerType: 'client',
    rating: 4,
    comment: 'O dashboard está funcionando bem, mas poderia ter mais funcionalidades.',
    date: '2026-03-20',
    orderId: '2',
    serviceName: 'Dashboard Administrativo',
  },
  {
    id: '3',
    reviewerId: '103',
    reviewerName: 'EcommerceBR',
    reviewerAvatar: 'https://via.placeholder.com/150',
    reviewerType: 'client',
    rating: 3,
    comment: 'A landing page foi entregue, mas há alguns bugs que precisam ser corrigidos.',
    date: '2026-03-25',
    orderId: '3',
    serviceName: 'Desenvolvimento de Landing Page em React',
  },
  {
    id: '4',
    reviewerId: '104',
    reviewerName: 'FinanceCorp',
    reviewerAvatar: 'https://via.placeholder.com/150',
    reviewerType: 'client',
    rating: 5,
    comment: 'O dashboard é excelente e atendeu todas as nossas necessidades.',
    date: '2026-03-01',
    orderId: '4',
    serviceName: 'Dashboard Administrativo',
  },
];

export const mockModerations: Moderation[] = [
  {
    id: '1',
    userId: '1',
    username: 'DevPro',
    type: 'warning',
    reason: 'Comportamento inadequado em uma discussão.',
    duration: 24, // in hours
    startDate: '2026-03-01',
    endDate: '2026-03-02',
    adminId: 'admin1',
    status: 'active',
  },
  {
    id: '2',
    userId: '2',
    username: 'DesignMaster',
    type: 'restriction',
    reason: 'Violação de termos de serviço.',
    duration: 168, // in hours
    startDate: '2026-03-05',
    endDate: '2026-03-12',
    adminId: 'admin2',
    status: 'active',
  },
  {
    id: '3',
    userId: '3',
    username: 'BackendPro',
    type: 'ban',
    reason: 'Comportamento ofensivo.',
    duration: 720, // in hours
    startDate: '2026-03-10',
    endDate: '2026-03-15',
    adminId: 'admin3',
    status: 'active',
  },
  {
    id: '4',
    userId: '4',
    username: 'AIExpert',
    type: 'warning',
    reason: 'Comportamento inadequado em uma discussão.',
    duration: 24, // in hours
    startDate: '2026-03-15',
    endDate: '2026-03-16',
    adminId: 'admin1',
    status: 'active',
  },
  {
    id: '5',
    userId: '5',
    username: 'DataScientist',
    type: 'restriction',
    reason: 'Violação de termos de serviço.',
    duration: 168, // in hours
    startDate: '2026-03-20',
    endDate: '2026-03-27',
    adminId: 'admin2',
    status: 'active',
  },
];