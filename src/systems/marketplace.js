export function getDemandBonus(state, product) {
  return (state.marketingBoost || 0) + (product.launched ? 2 : 0);
}
