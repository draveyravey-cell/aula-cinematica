const lessonFiles = [
"exemplo.html"
];
const lessons = lessonFiles.map(file => {
const id = file.replace(/\.html$/,"");
const title = id
.split("-")
.map(part => part.charAt(0).toUpperCase() + part.slice(1))
.join(" ");
return { id, file: `aula/${file}`, title };
});
const state = {
currentLessonId: null
};
const getMenuElement = () => document.getElementById("lessonsMenu");
const getContainer = () => document.getElementById("lessonContainer");
const clearActive = () => {
const menu = getMenuElement();
if (!menu) return;
Array.from(menu.querySelectorAll("[data-lesson-id]")).forEach(btn => {
btn.classList.remove("lesson-link-active");
});
};
const setActive = id => {
clearActive();
const menu = getMenuElement();
if (!menu) return;
const btn = menu.querySelector(`[data-lesson-id="${id}"]`);
if (btn) btn.classList.add("lesson-link-active");
};
const loadLesson = async lesson => {
const container = getContainer();
if (!container) return;
state.currentLessonId = lesson.id;
setActive(lesson.id);
container.classList.add("lesson-container-fade-out");
try {
const res = await fetch(lesson.file, { cache: "no-cache" });
const html = await res.text();
setTimeout(() => {
container.innerHTML = html;
container.classList.remove("lesson-container-fade-out");
container.classList.add("lesson-container-fade-in");
setTimeout(() => container.classList.remove("lesson-container-fade-in"), 200);
}, 150);
} catch (_) {
setTimeout(() => {
container.innerHTML = "<p>Não foi possível carregar esta aula.</p>";
container.classList.remove("lesson-container-fade-out");
}, 150);
}
};
const buildMenu = () => {
const menu = getMenuElement();
if (!menu) return;
menu.innerHTML = "";
lessons.forEach(lesson => {
const btn = document.createElement("button");
btn.type = "button";
btn.className = "lesson-link";
btn.textContent = lesson.title;
btn.dataset.lessonId = lesson.id;
btn.addEventListener("click", () => loadLesson(lesson));
menu.appendChild(btn);
});
};
const init = () => {
buildMenu();
};
document.addEventListener("DOMContentLoaded", init);

