
import React from 'react';
import { Layout, CreditCard, Code, GraduationCap, ShoppingBag, Building2, Briefcase,Guitar, Rocket, Heart, TrendingUp, Users } from 'lucide-react';
import { Service, JobPosition } from './types';

export const SERVICES: Service[] = [
  {
  id: 'custom',
  title: 'Custom Software',
  description: 'When off-the-shelf software can’t solve your problem, we design and build systems tailored specifically to how your business works.',
  icon: 'Code',
  category: 'Enterprise',
  benefits: [
    'Software built exactly for your workflow',
    'You fully own the system and data',
    'Easy integration with existing tools'
  ]
},
  {
  id: 'saas',
  title: 'SaaS Platforms',
  description: 'We build cloud-based software you can access anytime, anywhere. Our SaaS platforms help businesses manage education, HR, finance, and operations without complicated setups.',
  icon: 'Layout',
  category: 'SaaS',
  benefits: [
    'Grow users without changing systems',
    'Lower IT and maintenance costs',
    'Access real-time data from anywhere'
  ]
},
{
  id: 'payments',
  title: 'Payment Systems',
  description: 'We build secure payment systems that allow businesses to collect and send money reliably using mobile money and digital channels.',
  icon: 'CreditCard',
  category: 'Payments',
  benefits: [
    'MTN, Airtel, and Zamtel mobile money support',
    'Secure and compliant transactions',
    'Reduced payment failures and fraud risk'
  ]
}


];

export const TAGLINES = [
  "Building Zambia’s Digital Future.",
  "Software That Grows With Your Business.",
  "Payments That Just Work.",
  "Custom Systems, Built for You.",
  "Technology That Empowers Education."
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
