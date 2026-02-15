import { deriveTopics } from "../services/filters.js";
export const showAddLessonModal = (state, onSave) => {
const root = document.getElementById("modalRoot");
root.innerHTML = "";
const backdrop = document.createElement("div");
backdrop.className = "modal-backdrop";
const modal = document.createElement("div");
modal.className = "modal";
const h = document.createElement("h3");
h.textContent = "Adicionar nova aula";
const form = document.createElement("form");
form.className = "modal-form";
form.innerHTML = `
<div class="full">
<label for="mTitle">Título</label>
<input id="mTitle" required>
</div>
<div>
<label for="mLevel">Nível</label>
<select id="mLevel" required>
<option value="basico">Básico</option>
<option value="intermediario">Intermediário</option>
<option value="avancado">Avançado</option>
</select>
</div>
<div>
<label for="mTopics">Tópicos</label>
<select id="mTopics" multiple>
<option value="movimento-retilineo">Movimento retilíneo</option>
<option value="mru">MRU</option>
<option value="mruv">MRUV</option>
<option value="movimento-circular">Movimento circular</option>
<option value="vetores">Vetores</option>
<option value="lancamento-obliquo">Lançamento oblíquo</option>
</select>
</div>
<div class="full">
<label for="mDescription">Descrição</label>
<textarea id="mDescription" rows="3" required></textarea>
</div>
<div class="full">
<label for="mVideo">URL do vídeo</label>
<input id="mVideo" placeholder="https://...">
</div>
`;
const actions = document.createElement("div");
actions.className = "modal-actions";
const cancel = document.createElement("button");
cancel.type = "button";
cancel.className = "ghost-btn";
cancel.textContent = "Cancelar";
cancel.addEventListener("click", () => {
root.innerHTML = "";
});
const save = document.createElement("button");
save.type = "submit";
save.className = "primary-btn";
save.textContent = "Salvar";
actions.appendChild(cancel);
actions.appendChild(save);
form.addEventListener("submit", e => {
e.preventDefault();
const id = `lesson-${Date.now()}`;
const title = document.getElementById("mTitle").value.trim();
const level = document.getElementById("mLevel").value;
const topics = Array.from(document.getElementById("mTopics").selectedOptions).map(o => o.value);
const description = document.getElementById("mDescription").value.trim();
const videoUrl = document.getElementById("mVideo").value.trim();
const data = { id, title, level, topics, description, videoUrl, interactiveUrl: "", downloads: [], exercises: "" };
onSave && onSave(data);
root.innerHTML = "";
});
modal.appendChild(h);
modal.appendChild(form);
modal.appendChild(actions);
backdrop.appendChild(modal);
root.appendChild(backdrop);
};
