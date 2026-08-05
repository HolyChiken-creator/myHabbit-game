# myHabbit-game 12.0.0 — release checklist

## Completed automatically
- `src/worker.js` syntax check passed.
- `public/app.js` syntax check passed.
- Project validator passed.
- All JSON content and manifest files parse successfully.
- Required PWA files, icons, room artwork and Cloudflare configuration are present.
- Product name changed to `myHabbit-game`; Worker name changed to `myhabbit-game`.
- Cache and public version synchronized to `12.0.0`.
- Four room stages are included: levels 1, 5, 20 and 50.
- Existing patch-21 backend and family/game state logic were retained.

## Required before public launch
1. Create an empty GitHub repository named `myHabbit-game`.
2. Upload the contents of this archive to the repository root.
3. In Cloudflare Workers, create/import project `myhabbit-game`.
4. Add production secrets/variables used by your Telegram and owner flows.
5. Run `npm install`, then `npm run predeploy`, then `npm run deploy` in an environment with npm registry access.
6. Test a clean browser profile: create family, join second member, complete quest, buy shop item, export/import JSON, PWA install, admin and owner access.

The archive contains no production secrets and no `node_modules` directory.
