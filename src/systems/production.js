export function calculateBatchCost(unitCost, quantity) {
  if (!Number.isFinite(unitCost) || !Number.isInteger(quantity) || quantity < 1) {
    throw new TypeError("Invalid production quantity or unit cost");
  }
  return unitCost * quantity;
}
