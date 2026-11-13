export function renderSmartphone(config = {}) {
  const color = config.bodyColor || "#8b9baa";
  const frame = Number(config.frameThickness ?? 7);
  const camera = config.cameraStyle || "triple";
  const screen = config.screenStyle || "dynamic";
  const material = config.material || "aluminium";
  const cameras = camera === "single" ? 1 : camera === "dual" ? 2 : 3;
  const cameraMarkup = Array.from({ length: cameras }, (_, i) => `<i class="de-camera-lens lens-${i + 1}"></i>`).join("");
  return `
    <div class="de-phone" style="--phone-color:${color};--frame-size:${frame}px" data-material="${material}">
      <div class="de-phone-back">
        <div class="de-camera-island">${cameraMarkup}<span class="de-flash"></span></div>
        <span class="de-brand-mark">DE</span>
      </div>
      <div class="de-phone-side"></div>
      <div class="de-phone-front">
        <div class="de-screen screen-${screen}">
          <div class="de-screen-wallpaper"><span class="de-wallpaper-orb"></span><span class="de-wallpaper-glow"></span></div>
          <div class="de-status"><span>9:41</span><span>▮ ▮ ▰</span></div>
          <div class="de-dynamic-island"></div>
          <div class="de-screen-clock">09:41</div>
          <div class="de-screen-date">Friday, November 13</div>
          <div class="de-dock"><i></i><i></i><i></i><i></i></div>
        </div>
      </div>
      <div class="de-phone-button"></div>
    </div>`;
}
