import { renderApp } from "./ui/app.js";
import { getRegisteredFeatures } from "./features/registry.js";

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/health") {
      return Response.json({
        ok: true,
        app: "Device Empire",
        architecture: "modular-scaffold",
        features: getRegisteredFeatures().map(({ id, title }) => ({ id, title }))
      }, { headers: { "Cache-Control": "no-store" } });
    }

    return new Response(renderApp(), {
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }
};
