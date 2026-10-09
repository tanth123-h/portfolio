import { catalog } from "./catalog.js";
import { slugs } from "./os-state.js";
// Editorial metadata complements site-data.js; unknown dates remain unknown.
const statuses = {
  agri: "Regional Bronze; national qualifier (210 teams), no national award",
  "youth-innovation": "National Bronze",
  cityflowbkk: "Top 20 finalist",
  "phishwall-ai": "Workshop + proposal; did not qualify",
  troposense: "Selection-round second runner-up / Gold; national final pending",
  "grow-a-garden-science": "Gold / first place",
  "idektep-honorable-mention": "Honourable mention",
  "depa-2025-national": "National qualification + participation",
  "tira-iot-training": "Training completion",
  "minister-exhibition": "Exhibition participation",
};
export const manifest = [...catalog.competitions, ...catalog.activities].map(
  (entry) => ({
    id: entry.id,
    slug: slugs[entry.id] || entry.id,
    kind: catalog.activities.includes(entry) ? "activity" : "competition",
    category: entry.type,
    year:
      entry.id === "depa-2025-national" || entry.id === "tira-iot-training"
        ? 2025
        : 2026,
    description: entry.summary,
    technicalDetails: entry.approach || null,
    title: entry.title,
    date: entry.date || null,
    dateConfidence: entry.date ? "document-or-owner-confirmed" : "unconfirmed",
    role: entry.whatIDid,
    status: statuses[entry.id],
    relatedProject: entry.id === "grow-a-garden-science" ? "agri" : entry.id,
    sourceConfidence:
      "Owner account with attached project/event materials; implementation links where available",
    sources: Object.values(entry.links || {}),
    media: entry.media,
  }),
);
