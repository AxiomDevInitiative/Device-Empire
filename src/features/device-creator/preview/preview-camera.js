export const PREVIEW_ANGLES = {
  front: { label: "Depan", rotateX: 0, rotateY: 0 },
  back: { label: "Belakang", rotateX: 0, rotateY: 180 },
  side: { label: "Samping", rotateX: 0, rotateY: 90 },
  threeQuarter: { label: "3/4", rotateX: -8, rotateY: -28 }
};

export function getCameraTransform(angle = "threeQuarter", dragX = 0, dragY = 0) {
  const preset = PREVIEW_ANGLES[angle] || PREVIEW_ANGLES.threeQuarter;
  return `rotateX(${preset.rotateX + dragY}deg) rotateY(${preset.rotateY + dragX}deg)`;
}
