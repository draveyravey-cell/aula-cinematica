export const getTopicLabel = t => {
const map = {
"movimento-retilineo": "Movimento retilíneo",
mru: "MRU",
mruv: "MRUV",
"movimento-circular": "Movimento circular",
vetores: "Vetores",
"lancamento-obliquo": "Lançamento oblíquo"
};
return map[t] || t;
};
export const getLevelLabel = l => {
if (l === "basico") return "Básico";
if (l === "intermediario") return "Intermediário";
if (l === "avancado") return "Avançado";
return l;
};
