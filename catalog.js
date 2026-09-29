import { portfolio } from './site-data.js?v=20260929-content';

const all = [...portfolio.projects, ...portfolio.achievements];
const find = id => all.find(entry => entry.id === id);
function combine(projectId, awardId) {
  const project = find(projectId);
  const award = find(awardId);
  const media = Object.fromEntries(Object.keys(project.media).map(group => [group,
    [...new Map([...project.media[group], ...award.media[group]].map(item => [item.src, item])).values()]
  ]));
  return { ...project, media };
}
export const catalog = {
  competitions: [find('grow-a-garden-science'), combine('agri', 'depa-2026-third-place'),
    combine('youth-innovation', 'youth-bronze'), find('cityflowbkk'), find('phishwall-ai'),
    find('troposense'), find('idektep-honorable-mention'), find('depa-2025-national')],
  activities: [find('tira-iot-training'), find('minister-exhibition')]
};
