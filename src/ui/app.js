import { renderDashboard } from "./dashboard.js";
import { getRegisteredFeatures } from "../features/registry.js";
export function renderApp() {
 const list=getRegisteredFeatures().map(f=>`<li>${f.title}</li>`).join("");
 return `<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Device Empire</title></head><body>${renderDashboard()}<section><h2>Feature modules</h2><ul>${list}</ul></section></body></html>`;
}
