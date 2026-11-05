import { Hono } from "npm:hono@4.13.12";
import { labApi } from "./lab.ts";

/** Inject asset access so routing can be exercised without Val Town services. */
export function createApp(readPage: () => Promise<string>, serveAsset: (path: string) => Promise<Response>): Hono {
  const app = new Hono();
  app.onError((error) => { throw error; });
  app.route("/api/lab", labApi);
  app.get("/", async (c) => c.html(await readPage()));
  app.get("/lab", async (c) => c.html(await readPage()));

  const assets = new Set(["/lab/app.js", "/lab/shared.css", "/lab/tokens.css"]);
  app.get("/lab/*", (c) => assets.has(c.req.path) ? serveAsset(c.req.path) : c.notFound());
  return app;
}
