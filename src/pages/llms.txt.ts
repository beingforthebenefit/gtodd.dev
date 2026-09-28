// A plain-text summary for language models and AI assistants
// (https://llmstxt.org), generated from the same data as the résumé.
import type { APIRoute } from 'astro';
import { basics, work, education, paper, formatRange } from '../data/resume';

export const GET: APIRoute = () => {
  const lines = [
    `# ${basics.name}`,
    '',
    `> ${basics.summary}`,
    '',
    `${basics.label}. ${basics.location.city}, ${basics.location.region}. ${basics.workSetting}. Contact: ${basics.email}.`,
    '',
    '## Links',
    '',
    `- [Home](${basics.url}/): projects, research and background`,
    `- [Résumé](${basics.url}/resume/): full work history (also as [PDF](${basics.url}/resume.pdf) and [JSON Resume](${basics.url}/resume.json))`,
    ...basics.profiles.map((p) => `- [${p.network}](${p.url})`),
    '',
    '## Experience',
    '',
    ...work.flatMap((job) => [
      `### ${job.position}, ${job.organization} (${formatRange(job.start, job.end)})`,
      '',
      ...job.highlights.map((h) => `- ${h}`),
      '',
    ]),
    '## Education',
    '',
    ...education.map((d) => `- ${d.studyType}, ${d.area}, ${d.institution}, ${d.end}`),
    '',
    '## Research',
    '',
    `- [${paper.title}](${basics.url}${paper.url}) (${paper.year}), advised by ${paper.adviser}. Presented as "${paper.talkTitle}" at the ${paper.venue}, ${paper.venuePlace}.`,
    '',
  ];
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
