const KEYS = {
  lessons: "cinematica_lessons",
  quizzes: "cinematica_quizzes",
  progress: "cinematica_progress",
};
export const loadLessons = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEYS.lessons));
    return Array.isArray(v) ? v : [];
  } catch (_) {
    return [];
  }
};
export const saveLessons = (lessons) => {
  localStorage.setItem(KEYS.lessons, JSON.stringify(lessons));
};
export const loadQuizzes = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEYS.quizzes));
    return Array.isArray(v) ? v : [];
  } catch (_) {
    return [];
  }
};
export const saveQuizzes = (quizzes) => {
  localStorage.setItem(KEYS.quizzes, JSON.stringify(quizzes));
};
export const loadProgress = () => {
  try {
    const v = JSON.parse(localStorage.getItem(KEYS.progress));
    return v && typeof v === "object"
      ? v
      : { completedLessons: {}, quizResults: {} };
  } catch (_) {
    return { completedLessons: {}, quizResults: {} };
  }
};
export const saveProgress = (progress) => {
  localStorage.setItem(KEYS.progress, JSON.stringify(progress));
};
