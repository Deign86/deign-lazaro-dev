// Content for /alpha-premier, the Alpha Premier Realty internship case study.
// Every fact here comes from the four repos, alphapremiergroup.com or Deign directly.
// Items marked `confirm` still need Deign's sign-off before the page is shared.

export const company = {
  legalName: 'Alpha Premier Group of Companies OPC',
  brokerage: 'Alpha Premier Realty',
  line: 'Where Connections Grow Into Success',
  office: 'Unit 3104C, Tektite East Tower',
  district: 'Exchange Road, Ortigas Center, Pasig City',
  site: 'https://alphapremiergroup.com',
  enterprises: [
    'Alpha Premier Realty',
    'Luxe Prime Realty',
    'Alpha Premier Construction',
    'SwiftClear',
    '88 Prime',
    'Alta Venture',
    'Dynamic Tree',
    'Alpha Premier Virtual Office',
  ],
} as const;

export const hero = {
  headline: ['Lights on at', 'Unit 3104'],
  sentence:
    'Alpha Premier Realty had no IT department, so as its 2026 IT Administrator intern I built four systems it now uses.',
  action: { label: 'See the systems', href: '#systems' },
};

/** Narrow column beside the film. First paragraph is set in medium weight. */
export const before = [
  'When I arrived on the 31st floor of Tektite East Tower, Alpha Premier Realty was already leasing and selling offices, warehouses and condominiums across Metro Manila. It did all of it without an IT department.',
  'Interns signed in on a paper logbook. A second handwritten sheet tracked who had the restroom key.',
  'Listings lived in Google Drive folders. Every new client got a Viber group chat that someone created and named by hand.',
  'The group website was a set of static HTML pages that only a developer could change.',
];

/** The film chapters shown in the sticky half while the reading column scrolls. */
export const stage = [
  { id: 'arrival', floor: 'Exchange Road, ground level', still: '/alpha-premier/found/ortigas-night.webp', alt: 'Ortigas Center at night from above, office towers lit along the avenues' },
  { id: 'climb', floor: 'Tektite East Tower', still: '/alpha-premier/found/tektite.webp', alt: 'The twin stepped towers of Tektite on Exchange Road, seen from a neighbouring rooftop' },
  { id: 'floor', floor: '31st floor, Unit 3104C', still: '/alpha-premier/found/ortigas-dusk.webp', alt: 'The Ortigas skyline at dusk from a high floor' },
  { id: 'lit', floor: '31st floor, lights on', still: '/alpha-premier/ui/attendance-scan.webp', alt: 'The attendance kiosk confirming a time-in at the front desk' },
] as const;

export type LedgerRow = {
  name: string;
  kind: string;
  month: string;
  image: string;
  alt: string;
};

/** Everything shipped during the internship, grouped by the month it started. */
export const ledger: { month: string; rows: LedgerRow[] }[] = [
  {
    month: 'July',
    rows: [
      { name: 'Group website', kind: 'One site for eight brands', month: 'Jul 2026', image: '/alpha-premier/ui/website-home-fold.webp', alt: 'alphapremiergroup.com home page' },
      { name: 'Attendance kiosk', kind: 'RFID taps, offline first', month: 'Jul 2026', image: '/alpha-premier/ui/attendance-kiosk.webp', alt: 'The attendance kiosk waiting for a card tap' },
    ],
  },
  {
    month: 'August',
    rows: [
      { name: 'Payroll engine', kind: 'Cutoff PDFs, written in Rust', month: 'Aug 2026', image: '/alpha-premier/ui/attendance-payroll.webp', alt: 'The payroll screen of the attendance admin' },
      { name: 'Branding Studio', kind: 'Listing photos, on brand', month: 'Aug 2026', image: '/alpha-premier/ui/branding-main.webp', alt: 'Branding Studio with three photos selected' },
      { name: 'Silent installs', kind: 'Action1 deployment scripts', month: 'Aug 2026', image: '/alpha-premier/ui/branding-update.webp', alt: 'The Branding Studio update dialog' },
      { name: 'Restroom key log', kind: 'One key per gender, timed', month: 'Aug 2026', image: '/alpha-premier/ui/attendance-restroom.webp', alt: 'The restroom key mode of the kiosk' },
    ],
  },
  {
    month: 'September',
    rows: [
      { name: 'Intern time records', kind: 'Synced to Google Sheets', month: 'Sep 2026', image: '/alpha-premier/ui/attendance-admin.webp', alt: 'The attendance admin table' },
    ],
  },
  {
    month: 'October',
    rows: [
      { name: 'Website launch', kind: 'Hostinger, October 9', month: 'Oct 2026', image: '/alpha-premier/ui/website-enterprises.webp', alt: 'The enterprises page of alphapremiergroup.com' },
      { name: 'Live listings', kind: 'Drive to website, every 15 minutes', month: 'Oct 2026', image: '/alpha-premier/ui/website-realty.webp', alt: 'The Alpha Premier Realty page with listings' },
      { name: 'PIN reset mailer', kind: 'Google Apps Script', month: 'Oct 2026', image: '/alpha-premier/ui/attendance-pin.webp', alt: 'The forgot-PIN screen of the kiosk admin' },
      { name: 'Viber MCP', kind: '42 tools for the office inbox', month: 'Oct 2026', image: '/alpha-premier/ui/website-admin.webp', alt: 'The website admin dashboard' },
    ],
  },
];

export type SystemSpec = { label: string; value: string };

export type System = {
  id: 'attendance' | 'website' | 'branding' | 'viber';
  tab: string;
  title: string;
  description: string;
  specs: SystemSpec[];
  image?: { src: string; alt: string };
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

/** The four systems, set like a listing sheet. */
export const systems: System[] = [
  {
    id: 'attendance',
    tab: 'Attendance',
    title: 'The front-desk kiosk',
    description:
      'Interns tap an RFID card and the kiosk shows their photo, greets them by name and records the time. It runs offline on SQLite and works out pay under the office rules.',
    specs: [
      { label: 'Built', value: 'July to October 2026' },
      { label: 'Stack', value: 'Tauri, Rust, React, SQLite' },
      { label: 'Releases', value: '115, updated on its own' },
      { label: 'Turnover', value: 'In use at the front desk' },
    ],
    primary: { label: 'Source code', href: 'https://github.com/Deign86/alpha-premier-attendance' },
    secondary: { label: 'Releases', href: 'https://github.com/Deign86/alpha-premier-attendance/releases' },
  },
  {
    id: 'website',
    tab: 'Website',
    title: 'One site, eight brands',
    description:
      'The group site with a subdomain for every enterprise, listings pulled from the Realty Drive every 15 minutes, a chat assistant staff can take over, and a hiring desk.',
    specs: [
      { label: 'Built', value: 'July to October 2026, with the APG team' },
      { label: 'Stack', value: 'React, PHP, MySQL' },
      { label: 'Launched', value: 'October 9, 2026' },
      { label: 'Load time', value: 'SwiftClear LCP from 6.1 s to 1.9 s' },
    ],
    image: { src: '/alpha-premier/ui/website-home-fold.webp', alt: 'alphapremiergroup.com home page with the gold peacock mark' },
    primary: { label: 'Source code', href: 'https://github.com/Deign86/apg-website' },
    secondary: { label: 'Live site', href: 'https://alphapremiergroup.com' },
  },
  {
    id: 'branding',
    tab: 'Branding',
    title: 'One official frame',
    description:
      'A Windows app that puts every listing photo and video in the official 6:5 Realty frame, with a crop studio, portrait pairing and a pen for covering private details.',
    specs: [
      { label: 'Built', value: 'August to October 2026' },
      { label: 'Stack', value: '.NET 8, WPF, Magick.NET' },
      { label: 'Releases', value: '20, signed' },
      { label: 'Frame', value: '1200 × 1000, the official ratio' },
    ],
    image: { src: '/alpha-premier/ui/branding-output-1.webp', alt: 'A sample listing image in the official Alpha Premier Realty frame' },
    primary: { label: 'Source code', href: 'https://github.com/Deign86/Alpha_Branding' },
    secondary: { label: 'Releases', href: 'https://github.com/Deign86/Alpha_Branding/releases' },
  },
  {
    id: 'viber',
    tab: 'Viber',
    title: 'The inbox assistant',
    description:
      'An MCP server that lets Claude work the office Viber in the background: it names client group chats, sends listings from Drive and holds back everything below the line.',
    specs: [
      { label: 'Built', value: 'October 14 to 17, 2026' },
      { label: 'Stack', value: 'Python, MCP, Windows UI Automation' },
      { label: 'Tools', value: '42' },
      { label: 'Group chats', value: 'Named FIRSTNAME-TYPE-(SQM, LOCATION)' },
    ],
    primary: { label: 'Source code', href: 'https://github.com/Deign86/viber-mcp' },
    secondary: { label: 'How it works', href: 'https://github.com/Deign86/viber-mcp#readme' },
  },
];

/** Kiosk rules, from the attendance README: day starts 08:00, every started hour late costs ₱10. */
export const kioskRules = {
  dailyRate: 80,
  lateCostPerHour: 10,
  dayStart: { hour: 8, minute: 0 },
  repeatTapSeconds: 10,
};

export const figures = [
  { value: '115', caption: 'updates shipped to the front-desk kiosk since August' },
  { value: '15 min', caption: 'from a new listing in Drive to the website' },
];

export type RecordRow = {
  name: string;
  period: string;
  description: string;
  image: string;
  alt: string;
  /** object-position for the 4:5 crop when the subject is off-centre */
  position?: string;
  confirm?: boolean;
};

/** The formal internship record for evaluators. Duties from Deign's DTR and daily progress trackers. */
export const record: RecordRow[] = [
  {
    name: 'IT administration',
    period: 'Jul – Oct 2026',
    description: 'Reformatted and labelled the office and intern PCs, rolled out Action1 for silent installs across every PC, mass-deployed printer drivers, and code-signed the in-house apps so Windows stopped blocking them.',
    image: '/alpha-premier/photos/photo-11.webp',
    alt: 'An intern removes the base panel of a laptop with a screwdriver at a desk.',
    position: '60% 50%',
  },
  {
    name: 'Network and printers',
    period: 'Jul – Oct 2026',
    description: 'Traced the office router fault, worked with the internet provider on the fix and a new line, renamed the WiFi with laminated QR cards, and fixed company-wide printing.',
    image: '/alpha-premier/photos/photo-07.webp',
    alt: 'One intern on a stepladder works at the ceiling while another steadies the ladder and a third looks on.',
  },
  {
    name: 'Accounts and access',
    period: 'Jul – Oct 2026',
    description: 'Made and registered the RFID IDs, set up accounts and inboxes, and handled the company email.',
    image: '/alpha-premier/photos/photo-04.webp',
    alt: 'Staff at the front desk beside a gold dragon figure and the RFID card reader on the counter.',
  },
  {
    name: 'Attendance and payroll',
    period: 'Jul – Oct 2026',
    description: 'Built the RFID kiosk and payroll, went live on August 11, then trained the HR interns and the front desk on it.',
    image: '/alpha-premier/photos/photo-12.webp',
    alt: 'An intern at a laptop running the attendance kiosk, which reads “Good afternoon” and asks for a card tap.',
    position: '80% 50%',
  },
  {
    name: 'Group website',
    period: 'Jun – Oct 2026',
    description: 'Prototyped the posting console and the new site from day one, set up the repos and the Jira board, and launched alphapremiergroup.com on October 9.',
    image: '/alpha-premier/photos/photo-13.webp',
    alt: 'Interns in the conference room watch the group website’s job application page on the TV.',
  },
  {
    name: 'Branding Studio',
    period: 'Aug – Oct 2026',
    description: 'Rebuilt the branding tool as a native Windows app and updated it from staff suggestions.',
    image: '/alpha-premier/photos/photo-06.webp',
    alt: 'An intern runs a batch in Branding Studio on a laptop, a folder of listing photos open on the portrait monitor beside it.',
  },
  {
    name: 'Viber MCP',
    period: 'Oct 14 – 17, 2026',
    description: 'Automated client group chats and listing sends for the office inbox.',
    image: '/alpha-premier/photos/photo-15.webp',
    alt: 'An intern in an Alpha Premier shirt works in a Viber group chat on a laptop beside a freshly set-up Windows laptop.',
    position: '75% 50%',
  },
  {
    name: 'Leading the IT interns',
    period: 'Jul – Oct 2026',
    description: 'Assigned and checked the IT interns’ work, and interviewed and onboarded new interns.',
    image: '/alpha-premier/photos/photo-09.webp',
    alt: 'The intern team poses together, some crouching and making hand signs, between the desks of the open office.',
  },
];

/** Closing letter. Written from what Deign said about each person. */
export const thanks = {
  opening: 'None of this was built alone, and three people are the reason it got built at all.',
  people: [
    { name: 'Ma’am Beatriz', text: 'was my first work friend. She guided me through my first days on the 31st floor, before I knew where anything was.' },
    { name: 'Ma’am Jean', text: 'our HR supervisor, gave me the opportunity to grow and made me part of the APG family.' },
    { name: 'Sir Mark', text: 'our President and CEO, built the company and the environment I got to work in. He gave me the freedom to pursue the projects I proposed and supported me through every one of them.' },
  ],
  closing: 'Thank you for every system on this page that started with someone here saying yes.',
  signature: 'Deign Lazaro',
  role: 'IT Administrator Intern, Alpha Premier Realty',
};

export const credits = [
  'Website built with raineer26, sabbie19-design, goyaa25 and ishixxvi.',
  'Branding Studio began as Joseph Tanay Amandy’s web tool. viber-mcp extends Wawi del Mundo’s original.',
  'Alpha Premier marks belong to Alpha Premier Group of Companies OPC.',
];

// ---------------------------------------------------------------------------
// Appended by build agent C (gallery, figures, record, letter, footer).
// Above this line, only the `record` rows were rewritten, at the lead's request.

export type Picture = { src: string; alt: string };

export type InternshipFact = 'name' | 'role' | 'company' | 'office' | 'period' | 'hours' | 'supervisor' | 'team';

export type Internship = {
  name: string;
  role: string;
  company: string;
  office: string;
  /** First day, from the DTR. The period below already shows it. */
  start: string;
  period: string;
  /** Rendered only when defined. */
  hours?: string;
  /** Rendered only when defined. */
  supervisor?: string;
  /** Rendered only when defined. */
  team?: string;
  /** Facts that still need Deign's sign-off before the page is shared. */
  confirm?: InternshipFact[];
};

/** The facts at the head of the internship record, from Deign's DTR and daily progress trackers. */
export const internship: Internship = {
  name: 'Deign Lazaro',
  role: 'IT Administrator Intern',
  company: company.brokerage,
  office: `${company.office}, ${company.district}`,
  start: 'June 29, 2026',
  period: 'June 29 – October 23, 2026',
  hours: '444 of 486 hours, as of October 16, 2026',
  supervisor: 'Jean Ashley Chico, HR Staff',
  team: 'Nominated IT Admin leader of the intern team on July 6',
};

/** Gallery stand-ins, shown until Deign's photographs exist as public/alpha-premier/photos/photo-NN.webp. */
export const fieldPhotoStandIns: Picture[] = [
  { src: '/alpha-premier/found/ortigas-dusk.webp', alt: 'The Ortigas skyline at dusk from a high floor' },
  { src: '/alpha-premier/ui/attendance-kiosk.webp', alt: 'The attendance kiosk waiting for a card tap' },
  { src: '/alpha-premier/ui/branding-output-2.webp', alt: 'A living-room listing image in the official Alpha Premier Realty frame' },
  { src: '/alpha-premier/found/ortigas-night.webp', alt: 'Ortigas Center at night from above, office towers lit along the avenues' },
  { src: '/alpha-premier/ui/branding-crop.webp', alt: 'The crop and alignment editor in Branding Studio' },
  { src: '/alpha-premier/ui/branding-output-3.webp', alt: 'A kitchen and bedroom listing image in the official Realty frame' },
  { src: '/alpha-premier/ui/website-realty.webp', alt: 'The Alpha Premier Realty page of the group website' },
  { src: '/alpha-premier/ui/attendance-live.webp', alt: 'The live attendance view with the day’s time-ins' },
  { src: '/alpha-premier/found/tektite.webp', alt: 'The twin stepped towers of Tektite on Exchange Road, seen from a neighbouring rooftop' },
];

/** The photograph beside the two figures, and the photograph the footer is set on. */
export const closingPhotos: { figures: Picture; footer: Picture } = {
  figures: { src: '/alpha-premier/photos/photo-01.webp', alt: 'An intern at a corner desk by the window works across a laptop spreadsheet and a portrait monitor, a condo tower outside.' },
  footer: { src: '/alpha-premier/found/ortigas-night.webp', alt: 'Ortigas Center at night, office towers lit across the middle of the view' },
};

/** Headings, labels and links for the closing sections. */
export const closing = {
  galleryHeading: 'The 31st floor',
  galleryCount: { photos: 'photographs', standIns: 'pictures' },
  galleryLabel: 'Photographs from the internship, scroll sideways',
  photoAlt: (n: string) => `Internship photograph ${n}, Alpha Premier Realty`,
  figuresHeading: 'What changed',
  recordHeading: 'Internship record',
  recordLabels: {
    name: 'Intern',
    role: 'Role',
    company: 'Company',
    office: 'Office',
    period: 'Period',
    hours: 'Hours',
    supervisor: 'Supervisor',
    team: 'Team',
  } satisfies Record<InternshipFact, string>,
  printLabel: 'Print this record',
  thanksHeading: 'Thank you',
  /** The one phrase in the closing line set on the flat marker. */
  thanksMarker: 'someone here saying yes',
  wordmark: 'Alpha Premier',
  links: [
    { label: 'Portfolio', href: '/' },
    { label: 'GitHub', href: 'https://github.com/Deign86' },
    { label: 'alphapremiergroup.com', href: company.site },
  ],
  contact: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/deign-grey-lazaro-2976a41b6/' },
    { label: 'Message me', href: '/' },
  ],
  photoCreditsLead: 'Photographs:',
};

/** Copy for the two interface fragments in the systems section (owned by the systems agent).
 *  The kiosk strings follow the real kiosk; the Viber client is fictional, never a real client. */
export const systemsDemo = {
  kiosk: {
    brand: 'Alpha Premier',
    place: 'Tektite East Tower',
    visitor: 'Visitor',
    promptIn: 'Tap the card to time in',
    promptOut: 'Tap the card to time out',
    promptDone: 'Reset to start again',
    timeIn: 'Time in recorded',
    timeOut: 'Time out recorded',
    complete: 'Attendance is already complete for today.',
    reset: 'Reset',
    note: 'A working copy of the kiosk’s rules: the day starts at 8:00, and every started hour late costs ₱10.',
    examplesCaption: 'How the kiosk prices a time-in',
    examples: [
      { time: '08:00', hour: 8, minute: 0 },
      { time: '08:08', hour: 8, minute: 8 },
      { time: '09:30', hour: 9, minute: 30 },
    ],
  },
  viber: {
    templatesChat: 'APG CLIENTS',
    template: 'New client: Ana, office, 250 sqm, Ortigas',
    /** viber-mcp's own rule: office → OS (viber_gc_logic.py, tested as BEA-OS-(120SQM, ORTIGAS)). */
    groupName: 'ANA-OS-(250SQM, ORTIGAS)',
    created: 'Group created from the APG CLIENTS template',
    listingTitle: 'Pasig, 250 sqm Office',
    listingLines: ['Office space for lease', '250 sqm in Ortigas Center'],
    heldBack: 'Held back: address, owner and agent numbers',
    hello: 'Hello @Ana',
  },
};

// ---------------------------------------------------------------------------
// Appended by build agent A (stage). Nothing above this line was changed by agent A.

/**
 * The maquette keyframes shown as the stage stills, by `stage` chapter id. Each is a photograph of an
 * architectural scale model. When a file is missing, that chapter falls back to its found photograph in `stage`.
 */
export const stageStills: Record<string, Picture> = {
  arrival: {
    src: '/alpha-premier/stills/k1-aerial.webp',
    alt: 'An architectural scale model of Ortigas Center seen from above, with the twin stepped towers of Tektite',
  },
  climb: {
    src: '/alpha-premier/stills/k2-street.webp',
    alt: 'An architectural scale model seen from the street, looking up the east tower of Tektite',
  },
  floor: {
    src: '/alpha-premier/stills/k3-window.webp',
    alt: 'An architectural scale model of a dark office, seen from outside through its window',
  },
  lit: {
    src: '/alpha-premier/stills/k5-office-lit.webp',
    alt: 'An architectural scale model of the office with every light on, glowing gold',
  },
};

/** An extra stage chapter halfway down the ledger, between `floor` and `lit`. Left out when its still is missing. */
export const stageMidpoint = {
  id: 'dark',
  floor: '31st floor, lights off',
  still: '/alpha-premier/stills/k4-office-dark.webp',
  alt: 'An architectural scale model of the office with every light still off',
};

/** Words in the split stage: the hero's two links, the wordmark and the two section headings. */
export const stageCopy = {
  portfolio: { label: 'Portfolio', href: '/' },
  contact: { label: 'Contact', href: '#contact' },
  wordmark: 'Alpha Premier',
  /** Read by screen readers only; the intro has no visible heading. */
  beforeHeading: 'Before the systems',
  ledgerHeading: 'What I built',
};

/** Deign's internship photographs for the gallery, in slot order (tall, pair, wide, pair, tall, wide, tall). */
export const fieldPhotos: Picture[] = [
  { src: '/alpha-premier/photos/photo-02.webp', alt: 'Deign grins from behind a camera on a tripod in an office doorway while two colleagues steady its legs.' },
  { src: '/alpha-premier/photos/photo-03.webp', alt: 'Interns gathered around the long conference table under the Alpha Premier Group of Companies wall sign.' },
  { src: '/alpha-premier/photos/photo-04.webp', alt: 'Staff at the front desk, one making a peace sign, beside a gold dragon figure and the RFID card reader on the counter.' },
  { src: '/alpha-premier/photos/photo-05.webp', alt: 'An intern positions a softbox light in the gold-walled lounge under a crystal chandelier before a photo shoot.' },
  { src: '/alpha-premier/photos/photo-06.webp', alt: 'An intern runs a batch in Branding Studio on a laptop, a folder of listing photos open on the portrait monitor beside it.' },
  { src: '/alpha-premier/photos/photo-07.webp', alt: 'One intern on a stepladder works at the ceiling while another steadies the ladder and a third looks on.' },
  { src: '/alpha-premier/photos/photo-08.webp', alt: 'Deign films with a camera on a tripod in the lobby, the Alpha Premier sign behind them and colleagues gathered around.' },
  { src: '/alpha-premier/photos/photo-09.webp', alt: 'The intern team poses together, some crouching and making hand signs, between the desks of the open office.' },
  { src: '/alpha-premier/photos/photo-10.webp', alt: 'Interns stand around the conference-room TV reviewing a warehouse listing on the group website.' },
];
