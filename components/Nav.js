export const setupNav = (onAdd) => {
const btn = document.getElementById("addLessonBtn");
if (btn) {
btn.addEventListener("click", () => onAdd && onAdd());
}
};
