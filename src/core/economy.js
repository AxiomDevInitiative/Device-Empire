export function canAfford(state, amount) {
  return Number.isFinite(amount) && amount >= 0 && state.money >= amount;
}

export function transact(state, amount, reason = "Transaction") {
  if (!Number.isFinite(amount) || amount < 0) {
    return { ok: false, reason: "invalid-amount" };
  }
  if (!canAfford(state, amount)) return { ok: false, reason: "insufficient-funds" };
  state.money -= amount;
  state.activity.unshift({ type: "expense", amount, reason, at: Date.now() });
  return { ok: true, balance: state.money };
}
