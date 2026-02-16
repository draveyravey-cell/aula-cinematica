import { deriveTopics } from "../services/filters.js";
import { getTopicLabel } from "../utils/labels.js";
export const renderTopics = (state, onTopicChange) => {
  const container = document.getElementById("topicFilter");
  container.innerHTML = "";
  const allBtn = document.createElement("button");
  allBtn.className =
    "pill" + (state.filters.topic === null ? " pill-active" : "");
  allBtn.textContent = "Todos";
  allBtn.dataset.topic = "";
  container.appendChild(allBtn);
  deriveTopics(state.lessons).forEach((t) => {
    const b = document.createElement("button");
    b.className = "pill" + (state.filters.topic === t ? " pill-active" : "");
    b.textContent = getTopicLabel(t);
    b.dataset.topic = t;
    container.appendChild(b);
  });
  container.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    const topic = e.target.dataset.topic || null;
    state.filters.topic = topic;
    onTopicChange && onTopicChange(topic);
  });
};
export const renderProgress = (state) => {
  const totalLessons = state.lessons.length;
  const completedLessonsCount = Object.keys(
    state.progress.completedLessons,
  ).length;
  const totalQuizzes = state.quizzes.length;
  const completedQuizzesCount = Object.keys(state.progress.quizResults).length;
  document.getElementById("lessonsCompleted").textContent =
    `${completedLessonsCount} / ${totalLessons}`;
  document.getElementById("quizzesCompleted").textContent =
    `${completedQuizzesCount} / ${totalQuizzes}`;
  const lessonsFill = document.getElementById("lessonsProgressFill");
  const quizFill = document.getElementById("quizProgressFill");
  lessonsFill.style.width = totalLessons
    ? `${(completedLessonsCount / totalLessons) * 100}%`
    : "0%";
  quizFill.style.width = totalQuizzes
    ? `${(completedQuizzesCount / totalQuizzes) * 100}%`
    : "0%";
};
export const setupLevelAndSearch = (state, onUpdate) => {
  document.getElementById("levelFilter").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    const level = e.target.dataset.level;
    state.filters.level = level;
    document
      .querySelectorAll("#levelFilter .pill")
      .forEach((b) => b.classList.remove("pill-active"));
    e.target.classList.add("pill-active");
    onUpdate && onUpdate();
  });
  document.getElementById("searchInput").addEventListener("input", (e) => {
    state.filters.search = e.target.value;
    onUpdate && onUpdate();
  });
};
