# First deployment

```bash
npm install
npm run predeploy
npx wrangler login
npm run deploy
```

Expected Worker name: `myhabbit-game`.

For GitHub, create repository `myHabbit-game`, extract this ZIP, and push the extracted files as the repository root (do not upload an extra wrapping folder inside the repository).

Cloudflare variables currently declared in `wrangler.jsonc`:
- `TELEGRAM_BOT_USERNAME`
- `OWNER_MAX_FAMILIES`

Keep private tokens and passwords in Cloudflare Secrets, never in GitHub.
