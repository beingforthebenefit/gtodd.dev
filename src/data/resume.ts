// The single source of truth for who Gerald is and what he's done.
// The home page, /resume, /resume.pdf, /resume.json, /llms.txt and the
// schema.org JSON-LD are all generated from this file.

export interface Profile {
  network: string;
  username: string;
  url: string;
}

export interface Job {
  organization: string;
  url?: string;
  position: string;
  location: string;
  start: string; // YYYY-MM
  end?: string; // YYYY-MM, omitted while current
  summary?: string;
  highlights: string[];
}

export interface Degree {
  institution: string;
  url: string;
  area: string;
  studyType: string;
  end: string;
  notes: string[];
}

export const basics = {
  name: 'Gerald Todd',
  legalName: 'Gerald Vincent Todd II',
  label: 'Software Engineer',
  email: 'gerald@gtodd.dev',
  url: 'https://gtodd.dev',
  location: { city: 'San Francisco', region: 'CA', countryCode: 'US' },
  workSetting: 'Remote, Pacific time',
  summary:
    'Software engineer who builds AI systems people can trust with high-stakes work. ' +
    'Before software I taught university mathematics for four years, and I hold two master’s degrees in math. ' +
    'I’m at my best turning a messy, important problem into something clear enough to ship and to explain.',
  profiles: [
    { network: 'GitHub', username: 'beingforthebenefit', url: 'https://github.com/beingforthebenefit' },
    { network: 'LinkedIn', username: 'gerald-todd-abba57164', url: 'https://www.linkedin.com/in/gerald-todd-abba57164/' },
  ] satisfies Profile[],
};

export const work: Job[] = [
  {
    organization: 'Einstein Industries',
    position: 'Software Engineer III',
    location: 'Remote',
    start: '2022-09',
    highlights: [
      'Designed and built, as the sole engineer, a multi-agent deliberation system for legal work. A chair agent assembles the question, stakes, values and required confidence into a brief for sandboxed models from several providers, merges their drafts, and repeats until the panel votes unanimously. Any agent can pause to ask the operator for more context.',
      'Co-built a FastMCP server whose tools gather a client’s context from across the internal application suite and draft a working model of the finished product for human review. Measured throughput on that client work rose 10×.',
      'Replaced a 2012-era authentication system with AWS Cognito and Google sign-in across the application suite, partnering with the sysadmin.',
      'Led the team on a major release of the in-house product-creation software; built integration modules and abstract APIs moving data between internal and external REST services.',
    ],
  },
  {
    organization: 'AdaptiveStack',
    position: 'Full-Stack Developer',
    location: 'Remote',
    start: '2021-08',
    end: '2022-07',
    summary: 'PHP development on a federal contract for the Department of Veterans Affairs.',
    highlights: [
      'Built the portals veterans used to submit proof of COVID-19 vaccination or exemption, and the workflow supervisors used to approve or return each report.',
      'Led the application’s security audit, which earned a three-year Authority to Operate, the longest in its eleven-year history.',
    ],
  },
  {
    organization: 'iOSTheme.live',
    position: 'Founder and Developer',
    location: 'Portland, OR',
    start: '2020-11',
    end: '2021-06',
    highlights: [
      'Built a browser-based engine that generates custom iOS themes and installs them as configuration profiles, on a custom PHP framework.',
      'Formed an LLC, hired and trained a contract graphic designer, and ran SEO and ad campaigns. The code is now open source.',
    ],
  },
  {
    organization: 'Scan123',
    position: 'Full-Stack Developer',
    location: 'Gresham, OR',
    start: '2019-07',
    end: '2020-06',
    highlights: [
      'Wrote and optimized PHP and SQL for a document-scanning product on a LEMP stack, working in Scrum.',
      'Served on the hiring committee for two developers and designed the coding challenges and interview questions.',
    ],
  },
  {
    organization: 'University of Montana',
    url: 'https://www.umt.edu',
    position: 'Mathematics Instructor',
    location: 'Missoula, MT',
    start: '2014-08',
    end: '2018-06',
    highlights: [
      'Taught college algebra, applied calculus, probability and linear math, Calculus II and statistics to about 80 students a semester.',
      'Built interactive Mathematica lessons for a new touch-screen classroom.',
      'Twice won the College of Arts and Sciences award for the highest TA student evaluations.',
    ],
  },
];

export const education: Degree[] = [
  {
    institution: 'University of Montana',
    url: 'https://www.umt.edu',
    studyType: 'Master’s',
    area: 'Mathematics: Combinatorics and Optimization',
    end: '2016',
    notes: ['Earned alongside the degree below.'],
  },
  {
    institution: 'University of Montana',
    url: 'https://www.umt.edu',
    studyType: 'Master’s',
    area: 'Mathematics: Applied Mathematics and Analysis',
    end: '2016',
    notes: [],
  },
  {
    institution: 'University of Alaska Anchorage',
    url: 'https://www.uaa.alaska.edu',
    studyType: 'B.S.',
    area: 'Mathematics',
    end: '2012',
    notes: ['Highest GPA among mathematics and computer science graduates.'],
  },
];

export const paper = {
  title: 'Automorphism Groups and the Fixing Number of the Dowling Geometry',
  talkTitle: 'Breaking Bad Symmetries',
  year: '2016',
  adviser: 'Jenny McNulty',
  url: '/papers/todd-2016-dowling-geometry.pdf',
  venue: 'Pacific Northwest Section of the Mathematical Association of America, annual meeting',
  venuePlace: 'Oregon State University, Corvallis',
  venueDate: '2016-04-01',
  programUrl: 'http://sections.maa.org/pnw/meeting/programs/2016-program.pdf',
};

export const speech = {
  title: 'Student reflection, University of Montana mathematics graduation',
  url: 'https://www.youtube.com/watch?v=_AiWeeCFol4',
  date: '2016-05-15',
  duration: 'PT2M49S',
};

export const awards = [
  { title: 'College of Arts and Sciences award for top TA evaluations (twice)', awarder: 'University of Montana' },
  { title: 'Highest GPA among mathematics and computer science graduates', awarder: 'University of Alaska Anchorage' },
  { title: 'William Lowell Putnam Mathematical Competition: scored 2 of 120, above the national median of 0', awarder: 'Mathematical Association of America', date: '2012' },
];

export const certifications = ['Certified ScrumMaster', 'Tutor certification, College Reading and Learning Association', 'Tutor certification, American Tutoring Association'];

export const skills: { name: string; keywords: string[] }[] = [
  { name: 'AI systems', keywords: ['Multi-agent orchestration', 'Model Context Protocol (FastMCP)', 'LLM APIs across providers', 'Evaluation and consensus design'] },
  { name: 'Languages', keywords: ['Python', 'TypeScript', 'JavaScript', 'PHP', 'SQL', 'HTML', 'CSS'] },
  { name: 'Frameworks', keywords: ['React', 'Next.js', 'Node.js', 'Astro', 'Prisma'] },
  { name: 'Infrastructure', keywords: ['AWS Cognito', 'Docker', 'Linux', 'nginx', 'PostgreSQL', 'MySQL', 'GitHub Actions'] },
  { name: 'Mathematics', keywords: ['Combinatorics', 'Optimization', 'Matroid theory', 'Mathematica', 'MATLAB', 'R', 'LaTeX'] },
];

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function formatMonth(ym: string): string {
  const [y, m] = ym.split('-');
  return m ? `${monthNames[Number(m) - 1]} ${y}` : y;
}

export function formatRange(start: string, end?: string): string {
  return `${formatMonth(start)} – ${end ? formatMonth(end) : 'present'}`;
}
