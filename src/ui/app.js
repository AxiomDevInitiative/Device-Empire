import { getRegisteredFeatures } from "../features/registry.js";
import { previewStyles, renderDevicePreview, getPreviewScript } from "../features/device-creator/preview/preview-engine.js";

export function renderApp() {
  const list = getRegisteredFeatures().map(f => `<li>${f.title}</li>`).join("");
  return `<!doctype html>
<html lang="id">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#0b1220">
  <title>Device Empire — Creator Lab</title>
  <style>
    :root{color-scheme:dark;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#0b1220;color:#e7f0fa}
    *{box-sizing:border-box}body{margin:0;background:radial-gradient(ellipse at 50% -20%,#1b3553 0,transparent 55%),#0b1220}
    .de-page{max-width:1100px;margin:0 auto;padding:26px 18px 50px}
    .de-topline{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:26px}
    .de-brand{font-size:13px;font-weight:900;letter-spacing:2px;color:#7dd3fc}.de-version{font-size:11px;color:#8197ad;border:1px solid #26364b;border-radius:99px;padding:6px 10px}
    .de-heading{margin-bottom:20px}.de-heading h1{font-size:clamp(25px,5vw,38px);margin:0 0 8px;letter-spacing:-1.2px}.de-heading p{margin:0;color:#91a8c0;font-size:14px;line-height:1.6}
    .de-section-title{font-size:16px;margin:28px 0 13px}.de-feature-list{display:flex;gap:8px;flex-wrap:wrap;padding:0;list-style:none}.de-feature-list li{font-size:11px;color:#a9bfd5;background:#142338;border:1px solid #273b53;border-radius:99px;padding:7px 11px}
    ${previewStyles}
  </style>
</head>
<body>
  <main class="de-page">
    <header class="de-topline"><div class="de-brand">DEVICE EMPIRE</div><span class="de-version">CREATOR LAB • CSS 2.5D</span></header>
    <section class="de-heading"><h1>Design your next device.</h1><p>Rancang tampilan smartphone dan lihat perubahan desain secara langsung. Geser perangkat untuk melihat sudut yang berbeda.</p></section>
    <h2 class="de-section-title">Smartphone Preview</h2>
    ${renderDevicePreview()}
    <h2 class="de-section-title">Feature Modules</h2>
    <ul class="de-feature-list">${list}</ul>
  </main>
  ${getPreviewScript()}
</body>
</html>`;
}
