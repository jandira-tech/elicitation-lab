# Elicitation Lab

An interactive demonstration of the shape of an MCP `elicitation/create`
request and response. Choose one of three example requests, fill the form,
inspect its JSON payload, and send it to a server-side validator. The examples
cover deployment confirmation, matter intake, and redaction scope.

This repository extracts the lab from the [client intake demo](https://github.com/jandira-tech/intake-demo)
into its own Val Town project. Its presentation is adapted from the Elicitation
Lab page in Arthur Souza Rodrigues's design-system archive.

## What the demo does

1. Select a request in the queue. Its fields and validation rules come from the
   sample schema. The UI handles strings, enumerations, booleans, and numbers.
2. Choose **Accept**, **Decline**, or **Cancel**. Acceptance requires the
   requested fields; production deployment additionally requires a ticket.
   Decline and cancel return no content.
3. Inspect or copy the live JSON preview. **Validate response** sends it to the
   application's API, which checks types, allowed values, and numeric limits.
   Successfully validated responses update the queue in the current page.
4. Edit the rich-text context surface as scratch notes. It is local to the page;
   it is not sent to the server or model and disappears on reload.

The sample deployment, legal matter, and PII messages are illustrative. This
demo does **not** deploy software, send notifications, process actual matters,
or redact documents. Responses are not stored, and no external MCP server is
contacted. The interactive MCP transport is not implemented: `/api/lab/rpc`
returns an explicit error rather than fabricating an acceptance.

## Run and deploy

Requirements: a Val Town account, the [`vt` CLI](https://docs.val.town/cli/),
and Deno 2. No API keys or environment variables are needed.

```sh
git clone https://github.com/jandira-tech/elicitation-lab.git
cd elicitation-lab
deno task test
deno check --allow-import main.http.ts
```

Val Town provides `readFile` and `serveFile` for the hosted runtime, so a plain
local Deno HTTP server is not an equivalent deployment. To create your own
unlisted copy from this directory, run `vt create YOUR_VAL_NAME . --unlisted
--upload-if-exists`. For later updates, review `vt push --dry-run` and use
`vt push`. The `.vt/` directory contains local linkage and is excluded from Git;
never reuse another project's `.vt/` state. The Git and test files are excluded
from deployment by `.vtignore`. Open the HTTP trigger URL shown by Val Town.

## API

All endpoints are same-origin. The validator is stateless and requires no login.

| Method and path | Purpose |
| --- | --- |
| `GET /api/lab/plans` | List the sample plans and requested schemas. |
| `GET /api/lab/plans/:id` | Fetch one plan; returns 404 for an unknown ID. |
| `POST /api/lab/plans/:id/respond` | Validate an `accept`, `decline`, or `cancel` response; invalid content returns 422. |
| `POST /api/lab/rpc` | Inspect an `elicitation/create` request and return a JSON-RPC error explaining that interactive transport is unavailable. |

For example, this validates a staging response on your own deployed copy:

```sh
curl -X POST "$LAB_URL/api/lab/plans/deploy-confirm/respond" \
  -H 'Content-Type: application/json' \
  -d '{"action":"accept","content":{"environment":"staging","runMigrations":false}}'
```

The API returns the validated response; it does not persist or forward it.
Production acceptance without a change ticket is rejected. The API only covers
the included sample schemas; it is not a general-purpose JSON Schema validator.

## Project layout

- `main.http.ts` connects Val Town asset services to `backend/app.ts`, which
  serves the page, its browser assets, and the API.
- `backend/lab.ts` defines API routes; `backend/http_util.ts` handles malformed JSON.
- `lab/model.ts` defines plans and server validation.
- `lab/index.html`, `lab/app.js`, and the CSS files implement the interface.
- `lab/lab_test.ts` tests validation and API behavior.
- `DESIGN.md` describes the extracted visual tokens.

The browser loads Libre Franklin and Roboto Mono from Google Fonts, with system
fallbacks if that service is unavailable. The validator does not call an AI
model or a database. Use fictional information; the page does not encrypt data
entered into a device or browser.
