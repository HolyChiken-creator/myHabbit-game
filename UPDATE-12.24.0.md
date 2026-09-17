# UPDATE 12.24.0 — JSON login on a new device

- Quick-login JSON is now validated against `/api/family/state` before anything is stored locally.
- A new device receives the fresh server profile instead of trusting the stale snapshot embedded in the file.
- Invalid/revoked JSON credentials now show a clear error instead of a false “login successful” state.
- After a successful import the app reloads through the normal authenticated session bootstrap, so live family sync, presence, daily sync and the first authenticated paint are initialized correctly.
- Existing JSON login files (`myHabbit-login-profile`, version 1) remain compatible.
- Teddy's room/customization code is unchanged by this update.
