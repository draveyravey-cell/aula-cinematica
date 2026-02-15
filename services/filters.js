import { getLevelLabel, getTopicLabel } from "../utils/labels.js";
export const deriveTopics = lessons => {
const s = new Set();
(lessons || []).forEach(l => (l.topics || []).forEach(t => s.add(t)));
return Array.from(s);
};
export const applyFilters = (filters, lessons) => {
let out = [...lessons];
if (filters.level !== "todos") out = out.filter(l => l.level === filters.level);
if (filters.topic) out = out.filter(l => (l.topics || []).includes(filters.topic));
if (filters.search && filters.search.trim()) {
const q = filters.search.toLowerCase();
out = out.filter(l => {
const haystack = [
l.title,
l.description,
getLevelLabel(l.level),
(l.topics || []).map(getTopicLabel).join(" ")
].join(" ").toLowerCase();
return haystack.includes(q);
});
}
return out;
};
