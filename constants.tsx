
import React from 'react';
import { Layout, CreditCard, Code, GraduationCap, ShoppingBag, Building2, Briefcase,Guitar, Rocket, Heart, TrendingUp, Users } from 'lucide-react';
import { Service, JobPosition } from './types';

export const SERVICES: Service[] = [
  {
    id: 'saas',
    title: 'SaaS Platforms',
    description: 'Cloud-native software designed to scale your operations effortlessly. We build modular solutions for education, HR, and business operations.',
    icon: 'Layout',
    category: 'SaaS',
    benefits: ['Scalability on demand', 'Reduced operational costs', 'Real-time data synchronization']
  },
  {
    id: 'payments',
    title: 'Payment Systems',
    description: 'Secure, high-performance payment gateways and mobile money integrations tailored for the Zambian market.',
    icon: 'CreditCard',
    category: 'Payments',
    benefits: ['Mobile Money (MTN/Airtel/Zamtel) integration', 'PCI-DSS compliance', 'Fraud detection']
  },
  {
    id: 'custom',
    title: 'Custom Software',
    description: 'Bespoke development services solving unique enterprise challenges. From legacy migration to AI-driven automation.',
    icon: 'Code',
    category: 'Enterprise',
    benefits: ['Full ownership of code', 'Perfect fit for your workflow', 'Seamless integration']
  }
];

export const TAGLINES = [
  "Zambia's Digital Economy.",
  "The Future of SaaS Platforms.",
  "Seamless Payment Systems.",
  "Bespoke Enterprise Software.",
  "Innovation in Education."
];

export const INDUSTRIES = [
  { name: 'Education', icon: <GraduationCap className="w-5 h-5" /> },
  { name: 'Finance', icon: <Building2 className="w-5 h-5" /> },
  { name: 'Entertainment', icon: <Guitar className="w-5 h-5" /> },
  { name: 'Retail', icon: <ShoppingBag className="w-5 h-5" /> },
  { name: 'Enterprise', icon: <Briefcase className="w-5 h-5" /> },
];

export const JOBS: JobPosition[] = [
  {
    id: 'dev-2026',
    title: 'Software Developer',
    department: 'Engineering',
    location: 'Hybrid (Remote + Kitwe)',
    type: 'Part-time (Paid)',
    commitment: '8–18 hours per week',
    startDate: 'January 2026',
    compensation: 'K50 – K150 per hour',
    technologies: ['Python/Django', 'React/React Native', 'Node.js', 'HTML/CSS/JavaScript', 'TypeScript', 'PostgreSQL', 'Cloud(AWS(EC2,S3), Google Cloud)'],
    requirements: [
      'Ability to commit 6–8 hrs/week',
      'Willingness to learn and take feedback',
      'Entry-level to junior proficiency in core stack'
    ],
    responsibilities: [
      'Support ongoing SaaS and client projects',
      'Maintain version control via Git',
      'Explore AI tools and LLM integrations'
    ]
  },
  {
    id: 'mkt-2026',
    title: 'Digital Marketing Assistant',
    department: 'Marketing',
    location: 'Hybrid (Occasional field work)',
    type: 'Part-time (Paid)',
    commitment: '6–8 hours per week',
    startDate: 'January 2026',
    compensation: 'K50 – K150 per hour',
    requirements: [
      'Proficiency in Spreadsheets (Google Sheets / Excel)',
      'Strong communication skills',
      'Basic digital literacy'
    ],
    responsibilities: [
      'Manage and schedule social media content',
      'Assist with product campaigns',
      'Collect feedback and performance data'
    ]
  },
  {
    id: 'cfo-2026',
    title: 'Chief Financial Officer (CFO)',
    department: 'Executive',
    location: 'Remote',
    type: 'Equity-based (Unpaid)',
    commitment: 'Flexible / Strategic',
    startDate: 'January 2026',
    compensation: 'Equity Only',
    requirements: [
      'Diploma/Degree in Accounting, Finance or related',
      'Understanding of financial statements',
      'Willingness to grow with a startup'
    ],
    responsibilities: [
      'Prepare financial projections and budgets',
      'Support investor readiness and fundraising',
      'Structure financial policies and controls'
    ]
  }
];

export const CULTURE_POINTS = [
  {
    title: 'Growth-Oriented',
    desc: 'We invest in our people. Whether you have a degree or are self-taught, we value skill and dedication.',
    icon: <TrendingUp className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'Inclusive & Passionate',
    desc: 'Join a team of dreamers and builders who are passionate about the Zambian tech ecosystem.',
    icon: <Heart className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'Impact Driven',
    desc: 'Every line of code you write helps a local business scale or a student access better education tools.',
    icon: <Users className="w-6 h-6 text-indigo-600" />
  }
];

export const ICON_MAP: Record<string, React.ReactNode> = {
  Layout: <Layout className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  Code: <Code className="w-6 h-6" />,
  GraduationCap: <GraduationCap className="w-6 h-6" />,
  ShoppingBag: <ShoppingBag className="w-6 h-6" />,
  Building2: <Building2 className="w-6 h-6" />,
  Briefcase: <Briefcase className="w-6 h-6" />,
  Guitar: <Guitar className="w-6 h-6" />,
  Rocket: <Rocket className="w-6 h-6" />
};
