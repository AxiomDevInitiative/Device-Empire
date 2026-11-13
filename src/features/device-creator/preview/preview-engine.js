import { getCameraTransform } from "./preview-camera.js";
import { renderPreviewControls } from "./preview-controls.js";
import { renderSmartphone } from "../renderers/smartphone.js";

export const previewStyles = `
.de-preview-shell{display:grid;gap:18px;grid-template-columns:minmax(0,1.1fr) minmax(260px,.9fr);align-items:stretch}
.de-preview-stage{min-height:410px;position:relative;display:grid;place-items:center;overflow:hidden;border:1px solid #26364b;border-radius:22px;background:radial-gradient(ellipse at 50% 42%,#1c3450 0,#111d2d 42%,#0b1220 78%);perspective:1000px;touch-action:pan-y}
.de-preview-stage:before{content:"";position:absolute;width:270px;height:35px;bottom:58px;border-radius:50%;background:#02060d;filter:blur(17px);opacity:.8}
.de-preview-grid{position:absolute;inset:0;background-image:linear-gradient(#8ab4d00c 1px,transparent 1px),linear-gradient(90deg,#8ab4d00c 1px,transparent 1px);background-size:30px 30px;mask-image:linear-gradient(transparent,#000 20%,#000 80%,transparent)}
.de-preview-object{position:relative;z-index:1;transform-style:preserve-3d;transition:transform .45s cubic-bezier(.2,.75,.25,1);will-change:transform;cursor:grab}
.de-preview-object.is-dragging{transition:none;cursor:grabbing}
.de-phone{width:174px;height:350px;position:relative;transform-style:preserve-3d;transform:rotateY(-7deg) rotateX(3deg)}
.de-phone-front,.de-phone-back{position:absolute;inset:0;border-radius:30px;background:linear-gradient(125deg,#f4f7fa 0%,var(--phone-color) 22%,#263342 100%);border:var(--frame-size) solid color-mix(in srgb,var(--phone-color),#101722 35%);box-shadow:inset 0 0 0 1px #ffffff40,0 22px 45px #0008;backface-visibility:hidden;overflow:hidden}
.de-phone-front{transform:translateZ(5px);padding:7px}
.de-phone-back{transform:rotateY(180deg) translateZ(5px);background:linear-gradient(135deg,color-mix(in srgb,var(--phone-color),white 28%),var(--phone-color) 55%,color-mix(in srgb,var(--phone-color),black 28%))}
.de-phone-side{position:absolute;inset:4px 0;width:10px;left:calc(50% - 5px);background:linear-gradient(90deg,#101923,var(--phone-color),#dce5ec);transform:rotateY(90deg) translateZ(87px);border-radius:5px}
.de-phone-button{position:absolute;right:-3px;top:90px;width:4px;height:54px;border-radius:3px;background:linear-gradient(90deg,#172331,#aebdca);transform:translateZ(2px)}
.de-screen{height:100%;border-radius:22px;position:relative;overflow:hidden;background:#111b2b;color:white}
.de-screen-wallpaper{position:absolute;inset:0;background:linear-gradient(145deg,#152b48,#5c76a5 55%,#172b43)}
.de-wallpaper-orb{position:absolute;width:170px;height:220px;border-radius:50%;background:linear-gradient(130deg,#b8d8ed,#637cb2 55%,#273f6a);filter:blur(1px);top:55px;left:14px;transform:rotate(25deg);box-shadow:0 0 35px #8fcaff66}
.de-wallpaper-glow{position:absolute;width:170px;height:110px;bottom:-30px;left:0;background:#e1c4a8;filter:blur(45px);opacity:.55}
.screen-minimal .de-screen-wallpaper{background:linear-gradient(145deg,#101b2b,#253d59)}
.screen-neon .de-screen-wallpaper{background:linear-gradient(145deg,#160e31,#733d9a 55%,#152d57)}
.de-status{position:absolute;top:12px;left:15px;right:15px;display:flex;justify-content:space-between;font-size:8px;font-weight:700;z-index:2}
.de-dynamic-island{position:absolute;top:8px;left:50%;transform:translateX(-50%);width:55px;height:15px;border-radius:12px;background:#05070b;z-index:3}
.de-screen-clock{position:absolute;top:92px;width:100%;text-align:center;font-size:34px;font-weight:300;letter-spacing:-2px;text-shadow:0 2px 10px #0005}
.de-screen-date{position:absolute;top:133px;width:100%;text-align:center;font-size:8px;opacity:.8}
.de-dock{position:absolute;bottom:12px;left:15px;right:15px;height:37px;border-radius:14px;background:#ffffff26;backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:space-evenly}
.de-dock i{width:19px;height:19px;border-radius:6px;background:linear-gradient(145deg,#c8e8ff,#5799c5);box-shadow:0 2px 5px #0005}
.de-dock i:nth-child(2){background:linear-gradient(145deg,#f9d49a,#e18a56)}.de-dock i:nth-child(3){background:linear-gradient(145deg,#b7e6c7,#4d9b78)}.de-dock i:nth-child(4){background:linear-gradient(145deg,#d9c5ff,#896bc1)}
.de-camera-island{position:absolute;top:19px;left:18px;width:67px;height:67px;border-radius:17px;background:linear-gradient(145deg,#172333,#344456);border:1px solid #ffffff55;display:flex;flex-wrap:wrap;align-content:center;justify-content:center;gap:5px;transform:translateZ(3px);box-shadow:0 5px 12px #0005}
.de-camera-lens{width:19px;height:19px;border-radius:50%;border:3px solid #111b2a;background:radial-gradient(circle at 35% 30%,#a5d8ee 0 10%,#34536e 25%,#080e19 65%);box-shadow:0 0 0 1px #a9c1d477}
.de-camera-lens.lens-3{width:13px;height:13px}.de-flash{width:7px;height:7px;border-radius:50%;background:#f9edc9;box-shadow:0 0 7px #fff8}
.de-brand-mark{position:absolute;bottom:75px;left:0;right:0;text-align:center;color:#ffffff99;font-size:12px;font-weight:800;letter-spacing:5px}
[data-material="glass"] .de-phone-back{background:linear-gradient(135deg,#ffffff66,var(--phone-color) 45%,#ffffff22);box-shadow:inset 0 0 25px #ffffff44}
[data-material="plastic"] .de-phone-front,[data-material="plastic"] .de-phone-back{box-shadow:inset 0 0 0 1px #ffffff20,0 16px 30px #0008}
.de-preview-controls{display:flex;gap:7px;flex-wrap:wrap;justify-content:center;position:absolute;bottom:15px;left:12px;right:12px;z-index:3}
.de-preview-controls button,.de-config-panel button{border:1px solid #344a63;background:#152438;color:#dbeafe;padding:8px 11px;border-radius:10px;font-size:12px}
.de-preview-controls button[aria-pressed="true"]{background:#087eae;border-color:#29b8ef;color:white}
.de-config-panel{border:1px solid #26364b;border-radius:22px;background:#111c2b;padding:18px;color:#e7f0fa}
.de-config-panel h3{margin:0 0 15px;font-size:16px}.de-config-field{display:grid;gap:7px;margin:0 0 15px}.de-config-field label{font-size:12px;color:#9eb2c8}.de-config-field select,.de-config-field input{width:100%;box-sizing:border-box;background:#0b1421;color:#e7f0fa;border:1px solid #31445b;border-radius:10px;padding:10px}
.de-color-row{display:flex;gap:9px;flex-wrap:wrap}.de-color-swatch{width:29px;height:29px;border:2px solid #ffffff55;border-radius:50%;padding:0;cursor:pointer}.de-color-swatch[aria-pressed="true"]{outline:2px solid #38bdf8;outline-offset:3px}
.de-preview-hint{font-size:11px;color:#8197ad;text-align:center;margin-top:8px}
@media(max-width:700px){.de-preview-shell{grid-template-columns:1fr}.de-preview-stage{min-height:390px}.de-config-panel{padding:15px}}
`;

export function renderDevicePreview(config = {}) {
  return `
    <section class="de-preview-shell" id="device-preview">
      <div>
        <div class="de-preview-stage" data-preview-stage>
          <div class="de-preview-grid"></div>
          <div class="de-preview-object" data-preview-object>${renderSmartphone(config)}</div>
          ${renderPreviewControls()}
        </div>
        <p class="de-preview-hint">Geser perangkat untuk memutar preview • CSS 2.5D</p>
      </div>
      <aside class="de-config-panel">
        <h3>Device Appearance</h3>
        <div class="de-config-field"><label>Warna bodi</label><div class="de-color-row">
          <button class="de-color-swatch" style="background:#8b9baa" data-color="#8b9baa" aria-label="Silver" aria-pressed="true"></button>
          <button class="de-color-swatch" style="background:#17202b" data-color="#17202b" aria-label="Graphite" aria-pressed="false"></button>
          <button class="de-color-swatch" style="background:#9b7b70" data-color="#9b7b70" aria-label="Rose" aria-pressed="false"></button>
          <button class="de-color-swatch" style="background:#527c70" data-color="#527c70" aria-label="Forest" aria-pressed="false"></button>
          <button class="de-color-swatch" style="background:#536fba" data-color="#536fba" aria-label="Blue" aria-pressed="false"></button>
        </div></div>
        <div class="de-config-field"><label for="de-material">Material</label><select id="de-material" data-config="material"><option value="aluminium">Aluminium</option><option value="glass">Glass</option><option value="plastic">Plastic</option></select></div>
        <div class="de-config-field"><label for="de-camera">Desain kamera</label><select id="de-camera" data-config="cameraStyle"><option value="triple">Triple Camera</option><option value="dual">Dual Camera</option><option value="single">Single Camera</option></select></div>
        <div class="de-config-field"><label for="de-screen">Desain layar</label><select id="de-screen" data-config="screenStyle"><option value="dynamic">Dynamic</option><option value="minimal">Minimal</option><option value="neon">Neon</option></select></div>
        <div class="de-config-field"><label for="de-frame">Ketebalan frame: <output data-frame-value>7 px</output></label><input id="de-frame" type="range" min="4" max="12" value="7" data-config="frameThickness"></div>
      </aside>
    </section>`;
}

export function getPreviewScript() {
  return `<script>
  (() => {
    const root=document.querySelector("#device-preview"); if(!root) return;
    const object=root.querySelector("[data-preview-object]"), stage=root.querySelector("[data-preview-stage]");
    const config={bodyColor:"#8b9baa",material:"aluminium",cameraStyle:"triple",screenStyle:"dynamic",frameThickness:7};
    let angle="threeQuarter",dragX=0,dragY=0,pointer=null,startX=0,startY=0;
    const applyView=()=>{object.style.transform=${JSON.stringify(getCameraTransform("threeQuarter"))}.replace("rotateX(-8deg) rotateY(-28deg)", "rotateX("+(angle==="front"?0:angle==="back"?0:angle==="side"?0:-8+dragY)+"deg) rotateY("+(angle==="front"?0:angle==="back"?180:angle==="side"?90:-28+dragX)+"deg)")};
    const render=()=>{object.innerHTML=${JSON.stringify(renderSmartphone(config))};applyView()};
    root.querySelectorAll("[data-angle]").forEach(btn=>btn.addEventListener("click",()=>{angle=btn.dataset.angle;dragX=0;dragY=0;root.querySelectorAll("[data-angle]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));applyView()}));
    root.querySelector("[data-reset-view]").addEventListener("click",()=>{angle="threeQuarter";dragX=0;dragY=0;root.querySelectorAll("[data-angle]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.angle===angle)));applyView()});
    root.querySelectorAll("[data-color]").forEach(btn=>btn.addEventListener("click",()=>{config.bodyColor=btn.dataset.color;root.querySelectorAll("[data-color]").forEach(b=>b.setAttribute("aria-pressed",String(b===btn)));render()}));
    root.querySelectorAll("[data-config]").forEach(input=>input.addEventListener("input",()=>{config[input.dataset.config]=input.type==="range"?Number(input.value):input.value;const out=root.querySelector("[data-frame-value]");if(out)out.textContent=config.frameThickness+" px";render()}));
    stage.addEventListener("pointerdown",e=>{if(e.target.closest("button"))return;pointer=e.pointerId;startX=e.clientX-dragX;startY=e.clientY-dragY;object.classList.add("is-dragging");stage.setPointerCapture(pointer)});
    stage.addEventListener("pointermove",e=>{if(pointer!==e.pointerId)return;dragX=Math.max(-150,Math.min(150,e.clientX-startX));dragY=Math.max(-35,Math.min(35,startY-e.clientY));applyView()});
    const stop=e=>{if(pointer!==e.pointerId)return;pointer=null;object.classList.remove("is-dragging")};
    stage.addEventListener("pointerup",stop);stage.addEventListener("pointercancel",stop);
    render();
  })();
  </script>`;
}
