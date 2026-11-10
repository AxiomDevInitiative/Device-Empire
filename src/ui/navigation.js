export function renderNavigation(groups=[]){return groups.map(g=>`<section><h2>${g.title}</h2><ul>${g.items.map(i=>`<li>${i}</li>`).join("")}</ul></section>`).join("");}
