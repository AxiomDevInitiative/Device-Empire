// Shared game-state shape. Preserve the legacy LocalStorage key when the
// existing v0.3 implementation is ported; do not silently reset player saves.
export const LEGACY_SAVE_KEY = "deviceEmpire_proto01";

export function createInitialState() {
  return {
    version: 4,
    company: { name: "New Technology Company", slogan: "" },
    money: 12000,
    reputation: 12,
    products: [],
    components: [],
    employees: [],
    facilities: { headquarters: 1, lab: 1, factory: 1 },
    campaigns: [],
    marketingBoost: 0,
    inventory: [],
    research: [],
    activity: []
  };
}

export function migrateState(saved) {
  const base = createInitialState();
  if (!saved || typeof saved !== "object") return base;
  return {
    ...base,
    ...saved,
    company: { ...base.company, ...(saved.company || {}) },
    components: Array.isArray(saved.components) ? saved.components : [],
    employees: Array.isArray(saved.employees) ? saved.employees : [],
    facilities: { ...base.facilities, ...(saved.facilities || {}) },
    campaigns: Array.isArray(saved.campaigns) ? saved.campaigns : [],
    products: Array.isArray(saved.products) ? saved.products : [],
    inventory: Array.isArray(saved.inventory) ? saved.inventory : [],
    research: Array.isArray(saved.research) ? saved.research : [],
    activity: Array.isArray(saved.activity) ? saved.activity : []
  };
}
