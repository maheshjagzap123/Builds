// =============================================================================
// Mahesh Builds — Work / Projects data (single source of truth)
//
// Two categories:
//   • personal  — products Mahesh Builds built independently
//   • client    — real client work (NONE public yet; add only verified data)
//
// STRICT RULES (see AUDIT_REPORT.md §18, §32):
//   • Never invent clients, features, technologies, results, stats, testimonials.
//   • Unknown fields use the string 'To Be Provided' or are left empty.
//   • Images distinguish `source: 'supporting'` (licensed contextual stock)
//     from `source: 'screenshot' | 'project-asset'` (real Mahesh Builds assets).
//   • UI priority: screenshot > project-asset > supporting.
//   • A supporting image must NEVER be labelled/presented as a real screenshot.
//
// Image object shape:
//   {
//     type: 'hero' | 'gallery',
//     source: 'screenshot' | 'project-asset' | 'brand-visual' | 'supporting' | 'external',
//     src: '/path-or-url',
//     alt: 'accurate description',
//     caption: '',                       // optional
//     license: '',                       // required for external/supporting
//     attribution: '',                   // if the licence requires it
//     sourceName: '', sourceUrl: '',      // provenance for supporting images
//   }
//
// NOTE: The three personal projects currently use ZERO bundled supporting
// images to avoid shipping heavy/unlicensed files. Supporting images should be
// added here once sourced + license-verified (Unsplash / Pexels / Wikimedia /
// public domain). Until then the UI falls back to a branded placeholder tile,
// which is honest (clearly not a screenshot) and light-weight.
// =============================================================================

const TBD = 'To Be Provided';

export const projects = [
  // ---------------------------------------------------------------------------
  // PERSONAL PROJECTS
  // ---------------------------------------------------------------------------
  {
    id: 'tripwise',
    slug: 'tripwise',
    number: '01',
    name: 'TripWise',
    category: 'personal',
    type: 'Mobile Application',
    label: 'Personal Project',
    status: 'Project / MVP',
    shortDescription:
      'Travel planning, budgeting and group expense management in one app.',
    overview:
      'TripWise brings trip planning, budgeting and group expense management together in a single mobile application — so planning a trip and settling shared costs happens in one place.',
    purpose:
      'Help travellers plan trips, manage budgets, track expenses and handle group expenses without juggling separate tools.',
    problem:
      'Travel and group trips get messy when planning, budgeting, individual expenses, group expenses, bill splitting, settlements and overall spend live across different apps and notes.',
    solution:
      'A single app that unifies trip planning, budgets, expense tracking, group expenses, bill splitting, settlement tracking and spending analysis.',
    targetUsers: ['Solo travellers', 'Friends travelling together', 'Families', 'Group travellers'],
    features: [
      'Trip planning',
      'Budget management',
      'Expense tracking',
      'Group expense management',
      'Bill splitting',
      'Settlement tracking',
      'Spending analysis',
    ],
    modules: [],
    technologies: {
      frontend: ['React Native'],
      backend: ['.NET API'],
      database: ['MSSQL', 'Supabase'],
      integrations: [],
      tools: [],
    },
    role: 'Design & full-stack development (personal product).',
    duration: TBD,
    images: [
      {
        type: 'hero',
        source: 'brand-visual',
        src: '/assets/img/portfolio/tripwise-cover.svg',
        alt: 'TripWise project cover illustrating travel planning, budgeting and group expense splitting',
        caption: 'Branded project cover — not an application screenshot.',
      },
    ],
    links: {}, // no public links yet — do not invent
    seo: {
      title: 'TripWise — Travel Planning & Group Expense App | Mahesh Builds',
      description:
        'TripWise is a personal project by Mahesh Builds: a mobile app for trip planning, budgeting, group expenses, bill splitting and settlements.',
      ogImage: '/assets/img/og-default.png',
    },
    featured: true,
    active: true,
  },
  {
    id: 'paithani-marketplace',
    slug: 'paithani-marketplace',
    number: '02',
    name: 'Paithani Marketplace',
    category: 'personal',
    type: 'Website / Web Application',
    label: 'Personal Project',
    status: TBD,
    shortDescription:
      'An online marketplace connecting Paithani saree customers, sellers and artisans.',
    overview:
      'Paithani Marketplace is an online marketplace for Paithani sarees — helping customers discover and buy sarees online while giving sellers and artisans a direct channel to showcase and sell their work.',
    purpose:
      'Create a direct online connection between customers, sellers and Paithani artisans.',
    problem:
      'Paithani artisans and sellers lack a dedicated online channel to reach customers directly, and customers lack a focused place to discover and buy authentic Paithani sarees online.',
    solution:
      'A digital marketplace where customers discover and purchase Paithani sarees, and sellers/artisans showcase and sell their sarees online.',
    targetUsers: ['Customers', 'Sellers', 'Artisans'],
    features: [
      'Dedicated Paithani saree marketplace',
      'Customer product discovery',
      'Online purchase journey',
      'Seller and artisan product showcase',
      'Direct online sales channel',
    ],
    modules: [],
    technologies: {
      frontend: [],
      backend: [],
      database: [],
      integrations: [],
      tools: [],
    },
    role: 'Design & development (personal product).',
    duration: TBD,
    images: [
      {
        type: 'hero',
        source: 'screenshot',
        src: '/assets/img/portfolio/MajhiPaithani-1.JPG',
        alt: 'Paithani Marketplace customer studio showing product filters and saree listings',
        caption: 'Customer marketplace interface.',
      },
    ],
    links: {},
    seo: {
      title: 'Paithani Marketplace — Online Saree Marketplace | Mahesh Builds',
      description:
        'Paithani Marketplace is a personal project by Mahesh Builds: an online marketplace connecting Paithani saree customers, sellers and artisans.',
      ogImage: '/assets/img/og-default.png',
    },
    featured: true,
    active: true,
  },
  {
    id: 'milk-management-system',
    slug: 'milk-management-system',
    number: '03',
    name: 'Milk Management System',
    category: 'personal',
    type: 'Web Application / Business Software',
    label: 'Personal Project',
    status: TBD,
    shortDescription:
      'Dairy/milk collection management with daily records and history for farmers.',
    overview:
      'The Milk Management System helps manage dairy/milk collection operations and gives farmers access to their daily milk records — quantity, rate and amount — with date-based history.',
    purpose:
      'Manage milk collection operations and let farmers view and track their daily milk-related records.',
    problem:
      'Farmers need an easy way to view and track daily milk quantity, rate and amount, and to review historical records over time.',
    solution:
      'A role-based system for dairy operations where farmers can review daily milk quantity (litres), rate and amount, see previous records, view the last 30 days and filter records by date.',
    targetUsers: ['Farmers', 'Milk Collectors', 'Dairy Owners'],
    features: [
      'Daily milk quantity (litres)',
      'Daily milk rate',
      'Daily amount / value',
      'Previous milk records',
      'Last 30 days of daily milk information',
      'Date-filtered milk records',
    ],
    modules: ['Farmer', 'Milk Collector', 'Dairy Owner'],
    technologies: {
      frontend: [],
      backend: [],
      database: [],
      integrations: [],
      tools: [],
    },
    role: 'Design & development (personal product).',
    duration: TBD,
    images: [
      {
        type: 'hero',
        source: 'brand-visual',
        src: '/assets/img/portfolio/milk-management-cover.svg',
        alt: 'Milk Management System project cover illustrating dairy quantity, rate and daily amount records',
        caption: 'Branded project cover — not an application screenshot.',
      },
    ],
    links: {},
    seo: {
      title: 'Milk Management System — Dairy Collection Software | Mahesh Builds',
      description:
        'Milk Management System is a personal project by Mahesh Builds: role-based dairy/milk collection software with daily records, 30-day history and date filtering.',
      ogImage: '/assets/img/og-default.png',
    },
    featured: true,
    active: true,
  },

  // ---------------------------------------------------------------------------
  // CLIENT PROJECTS
  // Currently NONE are public. Do NOT add fake clients. When real, permission-
  // cleared client work is available, add entries with category: 'client' using
  // the template in AUDIT_REPORT.md §18.6 and set active: true.
  // ---------------------------------------------------------------------------
];

export const activeProjects = projects.filter((p) => p.active);
export const personalProjects = activeProjects.filter((p) => p.category === 'personal');
export const clientProjects = activeProjects.filter((p) => p.category === 'client');

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug && p.active);
}
