// schema.org JSON-LD, built from the résumé data so the two never disagree.
import { basics, work, education, paper, speech, awards, skills } from '../data/resume';

const personId = `${basics.url}/#person`;

export function personSchema() {
  const current = work.find((job) => !job.end);
  return {
    '@type': 'Person',
    '@id': personId,
    name: basics.name,
    alternateName: basics.legalName,
    givenName: 'Gerald',
    familyName: 'Todd',
    honorificSuffix: 'II',
    jobTitle: current?.position,
    description: basics.summary,
    email: `mailto:${basics.email}`,
    url: basics.url,
    image: `${basics.url}/og/gerald.jpg`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: basics.location.city,
      addressRegion: basics.location.region,
      addressCountry: basics.location.countryCode,
    },
    sameAs: basics.profiles.map((p) => p.url),
    worksFor: current && { '@type': 'Organization', name: current.organization },
    hasOccupation: {
      '@type': 'Occupation',
      name: basics.label,
      occupationLocation: { '@type': 'Country', name: 'United States' },
      skills: skills.flatMap((s) => s.keywords).join(', '),
    },
    alumniOf: [...new Map(education.map((d) => [d.institution, d])).values()].map((d) => ({
      '@type': 'CollegeOrUniversity',
      name: d.institution,
      url: d.url,
    })),
    hasCredential: education.map((d) => ({
      '@type': 'EducationalOccupationalCredential',
      credentialCategory: 'degree',
      name: `${d.studyType}, ${d.area}`,
      recognizedBy: { '@type': 'CollegeOrUniversity', name: d.institution },
    })),
    award: awards.map((a) => a.title),
    knowsAbout: skills.flatMap((s) => s.keywords),
  };
}

export function homeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'ProfilePage',
        '@id': `${basics.url}/#page`,
        url: basics.url,
        name: `${basics.name}, ${basics.label}`,
        mainEntity: { '@id': personId },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ScholarlyArticle',
        name: paper.title,
        alternativeHeadline: paper.talkTitle,
        author: { '@id': personId },
        datePublished: paper.year,
        url: `${basics.url}${paper.url}`,
        about: ['Matroid theory', 'Automorphism groups', 'Dowling geometry'],
        sourceOrganization: { '@type': 'CollegeOrUniversity', name: 'University of Montana' },
      },
      {
        '@type': 'VideoObject',
        name: speech.title,
        contentUrl: speech.url,
        embedUrl: speech.url.replace('watch?v=', 'embed/'),
        uploadDate: speech.date,
        duration: speech.duration,
        thumbnailUrl: 'https://i.ytimg.com/vi/_AiWeeCFol4/maxresdefault.jpg',
        description: 'Gerald gives the student reflection speech at the University of Montana mathematics graduation.',
        actor: { '@id': personId },
      },
    ],
  };
}

export function resumeSchema() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      personSchema(),
      {
        '@type': 'ProfilePage',
        url: `${basics.url}/resume/`,
        name: `${basics.name}, résumé`,
        mainEntity: { '@id': personId },
        dateModified: new Date().toISOString().slice(0, 10),
      },
    ],
  };
}
