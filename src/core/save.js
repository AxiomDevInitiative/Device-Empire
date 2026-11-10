import { LEGACY_SAVE_KEY, migrateState } from "./state.js";

export function loadState(storage = globalThis.localStorage) {
  try {
    const raw = storage?.getItem(LEGACY_SAVE_KEY);
    return raw ? migrateState(JSON.parse(raw)) : null;
  } catch {
    return null;
  }
}

export function saveState(state, storage = globalThis.localStorage) {
  try {
    storage?.setItem(LEGACY_SAVE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
}

export function exportSave(state) {
  return JSON.stringify({ app: "Device Empire", version: 4, state }, null, 2);
}

export function importSave(json) {
  const parsed = JSON.parse(json);
  return migrateState(parsed?.state ?? parsed);
}
