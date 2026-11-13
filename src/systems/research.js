export function completeResearch(state, research) {
  if (state.research.some(item => item.id === research.id)) return false;
  state.research.push({ ...research, completedAt: Date.now() });
  return true;
}
