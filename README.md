# Device Empire

Modular source workspace for the Device Empire Cloudflare Worker game.

> This branch is an architecture scaffold only. It does not replace or deploy the live v0.3 Worker. The existing game implementation must be ported into these modules after its current Worker source is retrieved and reviewed.

## Architecture

- `src/core/`: state, persistence, economy and shared utilities.
- `src/systems/`: reusable game rules and business systems.
- `src/menus/`: menu/page composition.
- `src/ui/`: navigation, dashboard and presentation.
- `src/features/<feature-id>/`: **self-contained feature modules**. Add new gameplay features here without editing unrelated menu/system files. Register each feature once in `src/features/registry.js`.

## Add a feature

1. Create `src/features/<feature-id>/index.js`.
2. Export a feature object following `src/features/contract.js`: stable `id`, `title`, optional `menu`, and optional `actions`.
3. Add one import and one entry to `src/features/registry.js`. This is the only central registration point.
4. Keep feature-specific UI, logic and styles inside that feature folder. Use core/system APIs rather than changing shared state directly where possible.

A future plugin loader can discover generated modules at build time, but Cloudflare Workers bundle static imports; a file cannot become executable merely by being uploaded. The registry is the deliberate integration seam.

## Development

```bash
npm install
npm run check
npm run dev
```

No production deployment is configured by this scaffold. Review `wrangler.toml` before connecting any build pipeline.
