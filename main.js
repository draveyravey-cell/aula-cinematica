import { loadLessons, saveLessons, loadQuizzes, saveQuizzes, loadProgress, saveProgress } from "./services/storage.js";
import { initialLessons, initialQuizzes } from "./services/seed.js";
import { applyFilters } from "./services/filters.js";
import { renderTopics, renderProgress, setupLevelAndSearch } from "./components/Sidebar.js";
import { renderHero, setupHeroActions } from "./components/Hero.js";
import { renderLessonList } from "./components/LessonList.js";
import { openLessonDetail, closeLessonDetail } from "./components/LessonDetail.js";

const state = {
lessons: [],
quizzes: [],
progress: { completedLessons: {}, quizResults: {} },
filters: { level: "todos", topic: null, search: "" },
currentLessonId: null
};

const persist = () => {
saveLessons(state.lessons);
saveQuizzes(state.quizzes);
saveProgress(state.progress);
};

const ensureSeed = () => {
state.lessons = loadLessons();
state.quizzes = loadQuizzes();
state.progress = loadProgress();
if (!state.lessons.length) {
state.lessons = initialLessons();
saveLessons(state.lessons);
}
if (!state.quizzes.length) {
state.quizzes = initialQuizzes();
saveQuizzes(state.quizzes);
}
};

const getFilteredLessons = () => applyFilters(state.filters, state.lessons);

const rerender = () => {
renderHero(state);
renderTopics(state, () => {
renderLessonList(state, getFilteredLessons(), openLesson);
renderProgress(state);
});
renderLessonList(state, getFilteredLessons(), openLesson);
renderProgress(state);
};

const openLesson = (lessonId) => {
openLessonDetail(state, lessonId, persist, rerender);
};

const setup = () => {
setupLevelAndSearch(state, rerender);
setupHeroActions(state, getFilteredLessons, openLesson, rerender);
document.getElementById("backToListBtn").addEventListener("click", () => closeLessonDetail());
};

const init = () => {
ensureSeed();
setup();
rerender();
};

document.addEventListener("DOMContentLoaded", init);
