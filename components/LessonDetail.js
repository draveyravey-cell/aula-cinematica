import { getLevelLabel, getTopicLabel } from "../utils/labels.js";
export const openLessonDetail = (state, lessonId, save, rerender) => {
const lesson = state.lessons.find(l => l.id === lessonId);
if (!lesson) return;
state.currentLessonId = lessonId;
const detail = document.getElementById("lessonDetail");
detail.hidden = false;
document.querySelector(".cards-section").hidden = true;
document.querySelector(".hero").hidden = true;
document.getElementById("detailTitle").textContent = lesson.title;
document.getElementById("detailLevel").textContent = getLevelLabel(lesson.level);
document.getElementById("detailTopics").textContent = (lesson.topics || []).map(getTopicLabel).join(" • ");
document.getElementById("detailDescription").textContent = lesson.description || "";
const media = document.getElementById("detailMediaContainer");
media.innerHTML = "";
if (lesson.videoUrl) {
const wrap = document.createElement("div");
wrap.className = "responsive-media";
const iframe = document.createElement("iframe");
iframe.src = lesson.videoUrl;
iframe.loading = "lazy";
iframe.allowFullscreen = true;
wrap.appendChild(iframe);
media.appendChild(wrap);
}
renderQuiz(state, lessonId, save, rerender);
const completed = state.progress.completedLessons[lesson.id];
const markBtn = document.getElementById("markCompletedBtn");
markBtn.textContent = completed ? "Aula concluída" : "Marcar aula como concluída";
markBtn.disabled = !!completed;
markBtn.onclick = () => {
state.progress.completedLessons[lesson.id] = true;
save();
openLessonDetail(state, lesson.id, save, rerender);
rerender();
};
document.getElementById("backToListBtn").onclick = () => closeLessonDetail();
};
export const closeLessonDetail = () => {
document.getElementById("lessonDetail").hidden = true;
document.querySelector(".cards-section").hidden = false;
document.querySelector(".hero").hidden = false;
};
const renderQuiz = (state, lessonId, save, rerender) => {
const container = document.getElementById("quizContainer");
const badge = document.getElementById("quizStatusBadge");
container.innerHTML = "";
badge.textContent = "";
const quiz = state.quizzes.find(q => q.lessonId === lessonId);
if (!quiz) {
const p = document.createElement("p");
p.className = "empty-state";
p.textContent = "Nenhum quiz cadastrado para esta aula.";
container.appendChild(p);
badge.textContent = "Sem quiz";
return;
}
const previous = state.progress.quizResults[quiz.id];
if (previous) {
badge.textContent = previous.correct ? "Quiz concluído (acertou)" : "Quiz concluído (errou)";
badge.className = "badge " + (previous.correct ? "badge-success" : "badge-warning");
}
const q = document.createElement("p");
q.className = "quiz-question";
q.textContent = quiz.question;
container.appendChild(q);
const opts = document.createElement("div");
opts.className = "quiz-options";
["A","B","C","D"].forEach(letter => {
const b = document.createElement("button");
b.type = "button";
b.className = "quiz-option";
b.dataset.option = letter;
b.textContent = `${letter}) ${quiz.options[letter]}`;
if (previous && previous.selected === letter) {
b.classList.add(previous.correct ? "quiz-option-correct" : "quiz-option-incorrect");
}
b.addEventListener("click", () => {
const sel = b.dataset.option;
const correct = sel === quiz.correct;
state.progress.quizResults[quiz.id] = { selected: sel, correct };
save();
renderQuiz(state, lessonId, save, rerender);
rerender();
});
opts.appendChild(b);
});
container.appendChild(opts);
if (previous && quiz.explanation) {
const e = document.createElement("p");
e.className = "quiz-explanation";
e.textContent = quiz.explanation;
container.appendChild(e);
}
};
