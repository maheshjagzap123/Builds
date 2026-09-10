// Selected work — the source of truth for case studies.
// Only Majhi Paithani is a real client build. Others are concept builds
// (labeled explicitly) that showcase capability without fabricating client claims.

export const projects = [
  {
    id: 'majhi-paithani',
    number: '01',
    title: 'Majhi Paithani',
    label: 'Live Project',
    category: 'E-commerce / Heritage Retail',
    tagline:
      'A heritage-driven e-commerce experience for a traditional Paithani saree brand.',
    description:
      'A digital storefront and brand experience for a legacy Paithani weaver, translating decades of craft into a considered online presence with a modern product-discovery flow.',
    challenge:
      'The brand had a strong offline reputation but no digital presence capable of representing the craft, communicating heritage, or supporting online enquiries and orders.',
    solution:
      'Designed and built a bespoke e-commerce experience with editorial product presentation, weave-story sections, WhatsApp-first enquiry flow and a lightweight admin surface for catalog updates.',
    features: [
      'Custom product catalog',
      'Editorial storytelling sections',
      'WhatsApp enquiry integration',
      'Admin catalog management',
      'Mobile-first experience',
      'SEO foundations',
    ],
    services: ['Web Development', 'UI/UX', 'Backend'],
    technologies: ['React', 'Node.js', 'MongoDB', 'Cloud hosting'],
    cover: '/assets/img/portfolio/MajhiPaithani-1.JPG',
    gallery: [
      '/assets/img/portfolio/MajhiPaithani-1.JPG',
      '/assets/img/portfolio/MajhiPaithani-2.JPG',
      '/assets/img/portfolio/MajhiPaithani-3.JPG',
      '/assets/img/portfolio/MajhiPaithani-4.JPG',
    ],
    liveUrl: '',
    featured: true,
  },
  {
    id: 'hospitality-suite',
    number: '02',
    title: 'Hospitality Booking Suite',
    label: 'Concept Build',
    category: 'Hospitality / Booking',
    tagline:
      'A booking-first hotel experience with enquiry management for independent properties.',
    description:
      'A concept build exploring how independent hotels can present rooms, availability and enquiry flows without depending on third-party platforms.',
    challenge:
      'Independent hospitality properties lose margin to aggregators and struggle to represent their identity on generic booking platforms.',
    solution:
      'A property-owned website with room presentation, direct enquiry, seasonal offers and a lightweight enquiry-management panel.',
    features: [
      'Room catalog with availability signals',
      'Direct enquiry & callback flow',
      'Seasonal offer surfaces',
      'Admin enquiry panel',
    ],
    services: ['Web Development', 'UI/UX'],
    technologies: ['React', '.NET', 'SQL Server'],
    cover: '/assets/img/portfolio/portfolio-7.webp',
    gallery: ['/assets/img/portfolio/portfolio-7.webp'],
    liveUrl: '',
    featured: true,
  },
  {
    id: 'edu-management',
    number: '03',
    title: 'Institute Management System',
    label: 'Concept Build',
    category: 'Education',
    tagline:
      'Admissions, students and staff — one internal system for an education institute.',
    description:
      'A concept internal platform showing how an education institute can move admissions, student records and attendance off spreadsheets and into a single system.',
    challenge:
      'Institutes juggle admissions data, student records, fees and staff across scattered spreadsheets and paper.',
    solution:
      'A role-based admin platform with admissions, student profiles, attendance and fee tracking, plus a public-facing institute website.',
    features: [
      'Admissions pipeline',
      'Student & staff records',
      'Attendance tracking',
      'Fee & receipt management',
      'Public institute website',
    ],
    services: ['Business Software', 'Web Development'],
    technologies: ['React', '.NET', 'SQL Server', 'C#'],
    cover: '/assets/img/portfolio/portfolio-8.webp',
    gallery: ['/assets/img/portfolio/portfolio-8.webp'],
    liveUrl: '',
    featured: true,
  },
  {
    id: 'commerce-ops',
    number: '04',
    title: 'Commerce Operations Dashboard',
    label: 'Concept Build',
    category: 'E-commerce / Internal Tools',
    tagline:
      'An internal dashboard for orders, inventory and customer support across a small e-commerce team.',
    description:
      'A concept internal dashboard exploring how a small e-commerce operation can unify orders, inventory, support and analytics.',
    challenge:
      'Small e-commerce teams switch between five tools to run a single order — losing time and context on every step.',
    solution:
      'A single dashboard consolidating orders, inventory, customer messages and daily KPIs, with role-based access for team members.',
    features: [
      'Unified order view',
      'Inventory alerts',
      'Customer message inbox',
      'Daily KPI overview',
      'Role-based access',
    ],
    services: ['Business Software', 'Dashboards'],
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    cover: '/assets/img/portfolio/portfolio-10.webp',
    gallery: ['/assets/img/portfolio/portfolio-10.webp'],
    liveUrl: '',
    featured: false,
  },
  {
    id: 'realestate-crm',
    number: '05',
    title: 'Property Leads CRM',
    label: 'Concept Build',
    category: 'Real Estate',
    tagline:
      'A property-listing site with a lead-management CRM for a growing real estate desk.',
    description:
      'A concept build combining a property discovery site with a lightweight CRM to track enquiries from first tap to visit.',
    challenge:
      'Real estate teams collect enquiries across WhatsApp, calls and portals — with no single view of where each lead stands.',
    solution:
      'A public property site backed by a lead CRM with stages, notes, follow-up reminders and assignment.',
    features: [
      'Property listings & filters',
      'Enquiry capture across channels',
      'Lead stages & follow-ups',
      'Agent assignment',
    ],
    services: ['Web Development', 'CRM'],
    technologies: ['React', 'Node.js', 'PostgreSQL'],
    cover: '/assets/img/portfolio/portfolio-11.webp',
    gallery: ['/assets/img/portfolio/portfolio-11.webp'],
    liveUrl: '',
    featured: false,
  },
];
