/** Feature contract: stable id, title, optional menu, actions and render. */
export function defineFeature(feature) {
  if (!feature || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(feature.id || "")) throw new TypeError("Feature requires a kebab-case id");
  return Object.freeze(feature);
}
