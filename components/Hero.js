export const renderHero = (state) => {
document.getElementById("heroLessonsCount").textContent = state.lessons.length.toString();
document.getElementById("heroQuizCount").textContent = state.quizzes.length.toString();
};
export const setupHeroActions = (state, getFiltered, openLesson, rerender) => {
document.getElementById("startBasicsBtn").addEventListener("click", () => {
state.filters.level = "basico";
document.querySelectorAll("#levelFilter .pill").forEach(btn => btn.classList.toggle("pill-active", btn.dataset.level === "basico"));
rerender();
const first = getFiltered().find(l => l.level === "basico");
if (first) openLesson(first.id);
});
document.getElementById("continueBtn").addEventListener("click", () => {
const completedIds = Object.keys(state.progress.completedLessons);
let nextLesson;
if (completedIds.length) {
const lastCompletedId = completedIds[completedIds.length - 1];
const lastIndex = state.lessons.findIndex(l => l.id === lastCompletedId);
const index = lastIndex >= 0 && lastIndex < state.lessons.length - 1 ? lastIndex + 1 : 0;
nextLesson = state.lessons[index];
} else {
nextLesson = state.lessons[0];
}
if (nextLesson) openLesson(nextLesson.id);
});
};
