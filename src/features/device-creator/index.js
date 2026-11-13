import { defineFeature } from "../contract.js";
import { renderDevicePreview } from "./preview/preview-engine.js";

export const deviceCreatorFeature = defineFeature({
  id: "device-creator",
  title: "Device Creator",
  menu: { group: "Products", label: "Create Device" },
  actions: {
    renderPreview: (config = {}) => renderDevicePreview(config)
  }
});

export { renderDevicePreview };
