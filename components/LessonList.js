import { getLevelLabel, getTopicLabel } from "../utils/labels.js";
export const renderLessonList = (state, lessons, openLesson) => {
  const list = document.getElementById("lessonList");
  const template = document.getElementById("lessonCardTemplate");
  list.innerHTML = "";
  if (!lessons.length) {
    const p = document.createElement("p");
    p.className = "empty-state";
    p.textContent = "Nenhuma aula encontrada para os filtros atuais.";
    list.appendChild(p);
    return;
  }
  lessons.forEach((lesson) => {
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".lesson-card");
    card.dataset.lessonId = lesson.id;
    card.querySelector(".lesson-card-title").textContent = lesson.title;
    card.querySelector(".lesson-card-level").textContent = getLevelLabel(
      lesson.level,
    );
    card.querySelector(".lesson-card-description").textContent =
      lesson.description;
    card.querySelector(".lesson-card-topics").textContent = (
      lesson.topics || []
    )
      .map(getTopicLabel)
      .join(" • ");
    const txt = card.querySelector(".lesson-card-progress");
    if (state.progress.completedLessons[lesson.id]) {
      txt.textContent = "Concluída";
      txt.classList.add("text-success");
    } else {
      txt.textContent = "Não iniciada";
    }
    card
      .querySelector(".lesson-card-open")
      .addEventListener("click", () => openLesson(lesson.id));
    list.appendChild(node);
  });
};
