import { createServer } from "node:http";
import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
  ".woff2": "font/woff2",
  ".wasm": "application/wasm",
};
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    const file = resolve(
      root,
      "." + (pathname === "/" || /^\/(projects|achievements)\/[^/]+\/?$/.test(pathname) ? "/index.html" : pathname),
    );
    const relative = file.slice(root.length);
    if (
      !file.startsWith(root + sep) ||
      relative.split(/[\\/]/).some((p) => p.startsWith("."))
    ) {
      res.writeHead(403).end();
      return;
    }
    const info = await stat(file);
    if (!info.isFile()) {
      res.writeHead(404).end();
      return;
    }
    const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
    let start = 0,
      end = info.size - 1,
      status = 200;
    const headers = {
      "Content-Type": types[extname(file)] || "application/octet-stream",
      "Accept-Ranges": "bytes",
    };
    if (range) {
      start = Number(range[1]);
      end = range[2] ? Math.min(Number(range[2]), end) : end;
      status = 206;
      headers["Content-Range"] = "bytes " + start + "-" + end + "/" + info.size;
    }
    if (start > end || start >= info.size) {
      res.writeHead(416, { "Content-Range": "bytes */" + info.size }).end();
      return;
    }
    headers["Content-Length"] = end - start + 1;
    res.writeHead(status, headers);
    if (req.method === "HEAD") {
      res.end();
      return;
    }
    const stream = createReadStream(file, { start, end });
    stream.on("error", () => res.destroy());
    stream.pipe(res);
  } catch {
    res.writeHead(404).end("Not found");
  }
}).listen(port, "127.0.0.1", () =>
  console.log("Portfolio preview: http://127.0.0.1:" + port),
);
