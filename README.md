# Device Empire

A mobile-first, browser-based technology company simulator.

## Development

```bash
npm install
npm run dev
```

## Cloudflare Worker

The Worker name is `device-empire`, separate from the older `device-empire-prototype`.

## GitHub Actions deployment

The workflow is intentionally manual at first (`workflow_dispatch`) so pushes to `main` cannot deploy before credentials and the first build are verified.

Add these repository Actions secrets:

- `CLOUDFLARE_API_TOKEN`: a Cloudflare API token with narrowly scoped Workers deployment permissions.
- `CLOUDFLARE_ACCOUNT_ID`: the Cloudflare account ID.

After adding the secrets, run **Actions → Deploy Device Empire → Run workflow**. Automatic deployment on pushes to `main` can be enabled after the first successful test.

Never commit API tokens or other credentials to this repository.