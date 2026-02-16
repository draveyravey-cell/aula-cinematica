export const $ = (s, root = document) => root.querySelector(s);
export const $all = (s, root = document) =>
  Array.from(root.querySelectorAll(s));
export const el = (tag, props = {}) => {
  const node = document.createElement(tag);
  if (props.className) node.className = props.className;
  if (props.text) node.textContent = props.text;
  if (props.html) node.innerHTML = props.html;
  if (props.attrs)
    Object.entries(props.attrs).forEach(([k, v]) => node.setAttribute(k, v));
  return node;
};
