// The résumé in JSON Resume format (https://jsonresume.org/schema), for
// tools and recruiters' parsers that prefer structured data to a PDF.
import type { APIRoute } from 'astro';
import { basics, work, education, awards, certifications, skills, paper, speech } from '../data/resume';

export const GET: APIRoute = () => {
  const resume = {
    $schema: 'https://raw.githubusercontent.com/jsonresume/resume-schema/v1.0.0/schema.json',
    basics: {
      name: basics.name,
      label: basics.label,
      email: basics.email,
      url: basics.url,
      summary: basics.summary,
      location: { city: basics.location.city, region: basics.location.region, countryCode: basics.location.countryCode },
      profiles: basics.profiles,
    },
    work: work.map((job) => ({
      name: job.organization,
      position: job.position,
      location: job.location,
      url: job.url,
      startDate: job.start,
      endDate: job.end,
      summary: job.summary,
      highlights: job.highlights,
    })),
    education: education.map((d) => ({
      institution: d.institution,
      url: d.url,
      area: d.area,
      studyType: d.studyType,
      endDate: d.end,
    })),
    awards: awards.map((a) => ({ title: a.title, awarder: a.awarder, date: a.date })),
    certificates: certifications.map((name) => ({ name })),
    publications: [
      { name: paper.title, publisher: 'University of Montana', releaseDate: paper.year, url: `${basics.url}${paper.url}` },
    ],
    projects: [
      { name: paper.talkTitle, description: `Talk, ${paper.venue}, ${paper.venuePlace}`, startDate: paper.venueDate, url: paper.programUrl },
      { name: 'Student reflection speech', description: speech.title, startDate: speech.date, url: speech.url },
    ],
    skills,
    meta: { canonical: `${basics.url}/resume.json`, lastModified: new Date().toISOString() },
  };
  return new Response(JSON.stringify(resume, null, 2), { headers: { 'Content-Type': 'application/json' } });
};
