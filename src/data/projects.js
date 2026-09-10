// Selected work — the single source of truth for case studies.
//
// Only projects with active: true are surfaced in the UI.
// Everything else stays in the file (as source data) but is hidden.

export const projects = [
  // ---------------------------------------------------------------------------
  // MAHESH BUI — flagship project, details to be filled in as they land.
  // ---------------------------------------------------------------------------
  {
    id: 'mahesh-bui',
    number: '01',
    slug: 'mahesh-bui',
    title: 'Mahesh BUI',
    label: 'Client Project',
    projectType: 'client',
    categories: ['Web Application', 'Business Software'],
    industry: 'Business Software',
    shortDescription:
      'A custom digital product built end-to-end. Full case study coming soon.',
    overview:
      'Detailed overview to be added once the project is ready to share publicly.',
    challenge: 'To be documented as part of the full case study.',
    approach: 'To be documented as part of the full case study.',
    solution: 'To be documented as part of the full case study.',
    features: [],
    services: [],
    technologies: {
      frontend: [],
      backend: [],
      database: [],
      mobile: [],
      integrations: [],
      tools: [],
    },
    outcome: 'Outcome to be documented after launch.',
    cover: '/assets/img/portfolio/portfolio-7.webp',
    gallery: [],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    active: true,
    placeholder: true, // signals UI to show "details coming soon" affordances
  },

  // ---------------------------------------------------------------------------
  // Archived — real data preserved, hidden from UI until re-activated.
  // ---------------------------------------------------------------------------
  {
    id: 'majhi-paithani',
    number: '02',
    slug: 'majhi-paithani',
    title: 'Majhi Paithani',
    label: 'Client Project',
    projectType: 'client',
    categories: ['Website', 'E-commerce'],
    industry: 'Heritage Retail',
    shortDescription:
      'A heritage-driven e-commerce experience for a traditional Paithani saree brand.',
    overview:
      'A digital storefront and brand experience for a legacy Paithani weaver — translating decades of craft into a considered online presence with a modern product-discovery flow.',
    challenge:
      'The brand had a strong offline reputation but no digital presence capable of representing the craft or supporting online enquiries and orders.',
    approach:
      'Started with the customer journey and the weave-story that makes each saree unique, then built the catalog, editorial sections and enquiry flow around it.',
    solution:
      'A bespoke storefront with editorial product presentation, weave-story sections, WhatsApp-first enquiry flow and a lightweight admin surface for catalog updates.',
    features: [
      'Custom product catalog',
      'Editorial storytelling sections',
      'WhatsApp enquiry integration',
      'Admin catalog management',
      'Mobile-first experience',
      'SEO foundations',
    ],
    services: ['UI/UX Design', 'Frontend Development', 'Backend Development', 'Database Development', 'Deployment'],
    technologies: {
      frontend: ['React', 'Vite', 'CSS'],
      backend: ['Node.js', 'REST APIs'],
      database: ['MongoDB'],
      integrations: ['WhatsApp'],
      tools: ['Git', 'Cloud hosting'],
    },
    outcome:
      'A live storefront ready for enquiries and orders, plus a repeatable base to grow the catalog and add sales channels.',
    cover: '/assets/img/portfolio/MajhiPaithani-1.JPG',
    gallery: [
      '/assets/img/portfolio/MajhiPaithani-1.JPG',
      '/assets/img/portfolio/MajhiPaithani-2.JPG',
      '/assets/img/portfolio/MajhiPaithani-3.JPG',
      '/assets/img/portfolio/MajhiPaithani-4.JPG',
    ],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    active: false,
  },
  {
    id: 'hospitality-suite',
    number: '03',
    slug: 'hospitality-suite',
    title: 'Hospitality Booking Suite',
    label: 'Concept Build',
    projectType: 'concept',
    categories: ['Website', 'Web Application'],
    industry: 'Hospitality',
    shortDescription:
      'A booking-first hotel experience with enquiry management for independent properties.',
    overview:
      'A concept build exploring how independent hotels can present rooms, availability and enquiry flows without depending on third-party platforms.',
    challenge:
      'Independent hospitality properties lose margin to aggregators and struggle to represent their identity on generic booking platforms.',
    approach:
      'Prioritized room presentation and direct enquiries over feature bloat, keeping the admin surface simple enough for front-desk staff.',
    solution:
      'A property-owned website with room presentation, direct enquiry, seasonal offers and a lightweight enquiry-management panel.',
    features: [
      'Room catalog with availability signals',
      'Direct enquiry & callback flow',
      'Seasonal offer surfaces',
      'Admin enquiry panel',
    ],
    services: ['UI/UX Design', 'Frontend Development', 'Backend Development'],
    technologies: {
      frontend: ['React'],
      backend: ['.NET', 'C#'],
      database: ['SQL Server'],
      tools: ['Git'],
    },
    outcome: 'A demonstration of what independent property websites can look like when built around direct bookings.',
    cover: '/assets/img/portfolio/portfolio-7.webp',
    gallery: ['/assets/img/portfolio/portfolio-7.webp'],
    liveUrl: '',
    githubUrl: '',
    featured: true,
    active: false,
  },
  {
    id: 'edu-management',
    number: '04',
    slug: 'institute-management-system',
    title: 'Institute Management System',
    label: 'Concept Build',
    projectType: 'concept',
    categories: ['Web Application', 'Business Software'],
    industry: 'Education',
    shortDescription: 'Admissions, students and staff — one internal system for an education institute.',
    overview: 'A concept internal platform showing how an education institute can move admissions, student records and attendance off spreadsheets and into a single system.',
    challenge: 'Institutes juggle admissions, student records, fees, attendance and staff across scattered spreadsheets and paper.',
    approach: 'Modelled the real academic workflow first, then wrapped each role in a dedicated surface — admin, staff and parent-facing.',
    solution: 'A role-based admin platform with admissions, student profiles, attendance and fee tracking, plus a public-facing institute website.',
    features: ['Admissions pipeline', 'Student & staff records', 'Attendance tracking', 'Fee & receipt management', 'Public institute website'],
    services: ['UI/UX Design', 'Frontend Development', 'Backend Development', 'Database Development'],
    technologies: {
      frontend: ['React'],
      backend: ['.NET', 'C#', 'REST APIs'],
      database: ['SQL Server'],
      tools: ['Git'],
    },
    outcome: 'A blueprint for institute operations that can be shaped to a specific campus.',
    cover: '/assets/img/portfolio/portfolio-8.webp',
    gallery: ['/assets/img/portfolio/portfolio-8.webp'],
    liveUrl: '', githubUrl: '', featured: true, active: false,
  },
  {
    id: 'commerce-ops',
    number: '05',
    slug: 'commerce-operations-dashboard',
    title: 'Commerce Operations Dashboard',
    label: 'Concept Build',
    projectType: 'concept',
    categories: ['Dashboard', 'Internal Tool'],
    industry: 'E-commerce',
    shortDescription: 'An internal dashboard for orders, inventory and customer support across a small e-commerce team.',
    overview: 'A concept internal dashboard exploring how a small e-commerce operation can unify orders, inventory, support and analytics.',
    challenge: 'Small e-commerce teams switch between five tools to run a single order — losing time and context on every step.',
    approach: 'Designed for the daily rhythm of an operations team first, with role-based access so each function only sees what it needs.',
    solution: 'A single dashboard consolidating orders, inventory, customer messages and daily KPIs, with role-based access for team members.',
    features: ['Unified order view', 'Inventory alerts', 'Customer message inbox', 'Daily KPI overview', 'Role-based access'],
    services: ['UI/UX Design', 'Frontend Development', 'Backend Development'],
    technologies: {
      frontend: ['React'], backend: ['Node.js', 'REST APIs'], database: ['PostgreSQL'], tools: ['Git'],
    },
    outcome: 'A pattern for consolidating fragmented e-commerce operations into a single internal surface.',
    cover: '/assets/img/portfolio/portfolio-10.webp',
    gallery: ['/assets/img/portfolio/portfolio-10.webp'],
    liveUrl: '', githubUrl: '', featured: false, active: false,
  },
  {
    id: 'realestate-crm',
    number: '06',
    slug: 'property-leads-crm',
    title: 'Property Leads CRM',
    label: 'Concept Build',
    projectType: 'concept',
    categories: ['Web Application', 'CRM'],
    industry: 'Real Estate',
    shortDescription: 'A property-listing site with a lead-management CRM for a growing real estate desk.',
    overview: 'A concept build combining a property discovery site with a lightweight CRM to track enquiries from first tap to visit.',
    challenge: 'Real estate teams collect enquiries across WhatsApp, calls and portals — with no single view of where each lead stands.',
    approach: 'Built the lead pipeline first — where every enquiry lives — and layered the public site on top so nothing falls through the cracks.',
    solution: 'A public property site backed by a lead CRM with stages, notes, follow-up reminders and assignment.',
    features: ['Property listings & filters', 'Enquiry capture across channels', 'Lead stages & follow-ups', 'Agent assignment'],
    services: ['UI/UX Design', 'Frontend Development', 'Backend Development', 'Database Development'],
    technologies: {
      frontend: ['React'], backend: ['Node.js', 'REST APIs'], database: ['PostgreSQL'], tools: ['Git'],
    },
    outcome: 'A pattern for real estate desks to consolidate lead pipelines without abandoning existing channels.',
    cover: '/assets/img/portfolio/portfolio-11.webp',
    gallery: ['/assets/img/portfolio/portfolio-11.webp'],
    liveUrl: '', githubUrl: '', featured: false, active: false,
  },
];

export const activeProjects = projects.filter((p) => p.active);

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
