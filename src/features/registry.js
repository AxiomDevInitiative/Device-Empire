import { deviceCreatorFeature } from "./device-creator/index.js";
import { componentLabFeature } from "./component-lab/index.js";
const features = [deviceCreatorFeature, componentLabFeature];
export const getRegisteredFeatures = () => features;
export const getFeature = id => features.find(feature => feature.id === id) || null;
