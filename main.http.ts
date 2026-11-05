import { readFile, serveFile } from "https://esm.town/v/std/utils/index.ts";
import { createApp } from "./backend/app.ts";

const app = createApp(
  () => readFile("/lab/index.html", import.meta.url),
  (path) => serveFile(path, import.meta.url),
);

export default app.fetch;
