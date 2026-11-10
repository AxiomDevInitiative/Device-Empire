export function applyCampaign(state, campaign) {
  state.campaigns.push({ ...campaign, createdAt: Date.now() });
  state.marketingBoost = Math.min(8, (state.marketingBoost || 0) + 3);
}
