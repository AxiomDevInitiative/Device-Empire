export function getUpgradeCost(currentLevel, baseCost = 2500) {
  return Math.max(1, currentLevel) * baseCost;
}
