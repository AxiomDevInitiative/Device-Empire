export function renderPreviewControls() {
  return `
    <div class="de-preview-controls" aria-label="Sudut preview">
      <button type="button" data-angle="front" aria-pressed="false">Depan</button>
      <button type="button" data-angle="back" aria-pressed="false">Belakang</button>
      <button type="button" data-angle="side" aria-pressed="false">Samping</button>
      <button type="button" data-angle="threeQuarter" aria-pressed="true">3/4</button>
      <button type="button" data-reset-view>Reset</button>
    </div>`;
}
