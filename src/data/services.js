// What We Build — six top-level categories, each with concrete sub-services.
export const whatWeBuild = [
  {
    num: '01',
    title: 'Websites',
    intro: 'Modern, responsive websites built to represent the business and convert visitors.',
    items: [
      'Corporate websites',
      'Landing pages',
      'Business websites',
      'E-commerce storefronts',
      'Portfolio websites',
      'Website redesign',
      'Website modernization',
    ],
  },
  {
    num: '02',
    title: 'Web Applications',
    intro: 'Product-grade web apps for teams, customers and internal operations.',
    items: [
      'Customer portals',
      'Admin panels',
      'Dashboards',
      'SaaS applications',
      'Business applications',
      'Internal tools',
    ],
  },
  {
    num: '03',
    title: 'Mobile Applications',
    intro: 'Android, iOS and cross-platform mobile experiences.',
    items: [
      'Android applications',
      'iOS applications',
      'Cross-platform applications',
      'Customer apps',
      'Business apps',
      'Internal workforce apps',
    ],
  },
  {
    num: '04',
    title: 'Business Software',
    intro: 'Custom software that fits how the business actually works.',
    items: [
      'CRM systems',
      'ERP-style systems',
      'Management systems',
      'Inventory systems',
      'Booking systems',
      'Employee systems',
      'Custom workflows',
    ],
  },
  {
    num: '05',
    title: 'Automation & Integration',
    intro: 'Automate the repetitive work and connect the tools already in use.',
    items: [
      'API integrations',
      'WhatsApp workflows',
      'Email automation',
      'Third-party integrations',
      'Business process automation',
      'Data synchronization',
    ],
  },
  {
    num: '06',
    title: 'Maintenance & Support',
    intro: 'Long-term care so the product keeps working as the business evolves.',
    items: [
      'Website maintenance',
      'Software maintenance',
      'Bug fixing',
      'Performance optimization',
      'Security updates',
      'Feature upgrades',
      'Long-term technical support',
    ],
  },
];

// Business problems — problem-first framing.
export const businessProblems = [
  {
    num: '01',
    problem: 'Need more leads?',
    solution: 'Websites, landing pages, CRM and enquiry systems built to capture and convert.',
    services: ['Website', 'Landing Page', 'CRM'],
  },
  {
    num: '02',
    problem: 'Losing track of customers?',
    solution: 'CRM, dashboards and follow-up automation to keep every conversation in one place.',
    services: ['CRM', 'Dashboards', 'Automation'],
  },
  {
    num: '03',
    problem: 'Too much manual work?',
    solution: 'Custom software, automation and integrations that remove the repetitive workload.',
    services: ['Custom Software', 'Automation', 'Integrations'],
  },
  {
    num: '04',
    problem: 'Old software slowing you down?',
    solution: 'Modernization, redesign, migration and performance upgrades — without starting over.',
    services: ['Modernization', 'Redesign', 'Migration'],
  },
  {
    num: '05',
    problem: 'Need a mobile app?',
    solution: 'Android, iOS and cross-platform mobile applications for customers or internal teams.',
    services: ['Android', 'iOS', 'Cross-platform'],
  },
  {
    num: '06',
    problem: 'Website not performing?',
    solution: 'Redesign, performance, SEO and conversion improvements grounded in real analytics.',
    services: ['Redesign', 'Performance', 'SEO'],
  },
];

// Industries.
export const industries = [
  'Healthcare',
  'Education',
  'Real Estate',
  'Manufacturing',
  'Hospitality',
  'Professional Services',
  'Retail',
  'Fitness',
  'Restaurants',
  'Startups',
];

// Why businesses choose us.
export const principles = [
  {
    num: '01',
    title: 'Business first',
    text: 'We understand the business problem before choosing the technology.',
  },
  {
    num: '02',
    title: 'Built around your workflow',
    text: 'Software should fit the business, not force the business to fit the software.',
  },
  {
    num: '03',
    title: 'Scalable',
    text: 'Built with future features, growth and integrations in mind from day one.',
  },
  {
    num: '04',
    title: 'Long-term support',
    text: 'We can continue maintaining and improving the product after launch.',
  },
  {
    num: '05',
    title: 'One digital partner',
    text: 'Design, development, deployment and maintenance under a single roof.',
  },
];

// Business stages — WHERE a business is (distinct from Industries, which is WHO).
export const businessStages = [
  {
    num: '01',
    title: 'Startups',
    question: 'Need an MVP?',
    text: 'Turn an idea into a working product you can launch, test and grow.',
  },
  {
    num: '02',
    title: 'Growing Businesses',
    question: 'Need better systems?',
    text: 'Replace scattered tools with software built around how the team works.',
  },
  {
    num: '03',
    title: 'Established Businesses',
    question: 'Need modernization?',
    text: 'Redesign, rebuild and modernize the products already in use — without starting over.',
  },
  {
    num: '04',
    title: 'Businesses with Manual Workflows',
    question: 'Need automation?',
    text: 'Turn repetitive manual work into automated, connected digital workflows.',
  },
];

// Ecosystem — "From idea to growth" signature scroll journey.
export const ecosystem = [
  { id: 'idea', label: 'Idea', hint: 'Have an idea? We turn it into a practical digital product plan.' },
  { id: 'problem', label: 'Problem', hint: 'Have a repetitive business problem? We turn the manual workflow into software.' },
  { id: 'design', label: 'Design', hint: 'We design the experience before engineering the product.' },
  { id: 'build', label: 'Build', hint: 'Website, web application, mobile app or custom business software.' },
  { id: 'connect', label: 'Connect', hint: 'APIs, databases, third-party services and business tools.' },
  { id: 'launch', label: 'Launch', hint: 'Put the product into real-world use.' },
  { id: 'grow', label: 'Grow', hint: 'Maintain, improve and extend the system as the business grows.' },
];

// Extended lifecycle (8 steps).
export const processSteps = [
  { n: '01', title: 'Idea', text: 'Turn a rough idea into a scoped opportunity.' },
  { n: '02', title: 'Discovery', text: 'Understand the business, users, workflows and constraints.' },
  { n: '03', title: 'Design', text: 'Craft the interface, interactions and system architecture.' },
  { n: '04', title: 'Development', text: 'Engineer the product with regular previews and check-ins.' },
  { n: '05', title: 'Testing', text: 'Test across devices, edge cases and real usage scenarios.' },
  { n: '06', title: 'Launch', text: 'Ship with performance, SEO and observability in place.' },
  { n: '07', title: 'Maintenance', text: 'Keep the product healthy, secure and up to date.' },
  { n: '08', title: 'Growth', text: 'Evolve with new features as the business grows.' },
];

// Technology stack — grouped.
export const technologies = {
  Frontend: ['React', 'React.js', 'Next.js', 'Angular', 'TypeScript', 'JavaScript', 'HTML', 'CSS'],
  Backend: ['.NET', 'C#', 'Node.js', 'Java', 'C++'],
  Database: ['SQL Server', 'PostgreSQL', 'MongoDB', 'Supabase'],
  Mobile: ['Android', 'iOS', 'Flutter', 'Dart', 'React Native'],
  Other: ['REST APIs', 'API Integrations', 'Git', 'GitHub', 'Docker', 'Azure'],
};

// Value / outcome section (no invented numbers).
export const values = [
  { title: 'More efficient', text: 'Replace repetitive manual processes with software.' },
  { title: 'More accessible', text: 'Make services available digitally, anywhere.' },
  { title: 'More organized', text: 'Centralize business information in one system.' },
  { title: 'More scalable', text: 'Build systems that can evolve with the business.' },
  { title: 'More connected', text: 'Wire websites, software, APIs and mobile apps together.' },
];

// FAQ — concise, truthful, ~8 questions.
export const faq = [
  {
    q: 'What do you build?',
    a: 'Websites, web applications, mobile apps, custom business software and automation — for businesses across a range of industries.',
  },
  {
    q: 'Can you build both websites and software?',
    a: 'Yes. We design and develop websites, web applications, mobile apps and custom business software — usually as a single integrated system.',
  },
  {
    q: 'Can you build mobile applications?',
    a: 'Yes. Android, iOS and cross-platform apps — customer-facing apps as well as internal workforce apps connected to backend systems.',
  },
  {
    q: 'Can you build custom business systems?',
    a: 'Yes. CRMs, inventory, booking, admissions, dashboards and other management systems — built to match the workflow, not a generic template.',
  },
  {
    q: 'Can you integrate APIs and third-party services?',
    a: 'Yes. Payments, WhatsApp, email, analytics, shipping, CRM and other services — integrated as part of the build or added later.',
  },
  {
    q: 'Can you modernize existing software?',
    a: 'Yes. We audit, modernize and rebuild parts of existing products and websites — without a full rewrite where possible.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. Maintenance, monitoring and feature work are available as a monthly retainer or on demand.',
  },
  {
    q: 'How does a project start?',
    a: 'Send a short brief or a rough problem through the enquiry form. We review it, then come back to talk through scope and approach.',
  },
];

// Maintenance services.
export const maintenanceItems = [
  'Bug fixes',
  'Performance optimization',
  'Security updates',
  'Dependency updates',
  'Content updates',
  'New features',
  'Monitoring',
  'Backups',
  'Technical support',
  'Modernization',
];
