/**
 * Reverse proxy: jesusactuallysaid.com → mrpronoia.com/jesus
 *
 * - Root requests (/) → mrpronoia.com/jesus/
 * - /anything → mrpronoia.com/jesus/anything
 * - Assets, API, and chat requests pass through to mrpronoia.com
 */

const ORIGIN = "https://mrpronoia.com";

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;

    let targetPath;

    // API calls go straight through (they're at the root of mrpronoia.com)
    if (path.startsWith("/api/")) {
      targetPath = path;
    }
    // Assets, stylesheets, and JS are under /jesus/ on the origin
    else if (path.startsWith("/assets/") || path.startsWith("/stylesheets/") || path.startsWith("/javascripts/")) {
      targetPath = "/jesus" + path;
    }
    // Spanish translation lives at /es/jesus/ on the origin
    else if (path.startsWith("/es/")) {
      // /es/jesus/... already correct, pass through
      if (path.startsWith("/es/jesus/")) {
        targetPath = path;
      }
      // /es/ or /es/anything → /es/jesus/ or /es/jesus/anything
      else if (path === "/es" || path === "/es/") {
        targetPath = "/es/jesus/";
      }
      else {
        targetPath = "/es/jesus" + path.slice(3);
      }
    }
    // Everything else gets prefixed with /jesus
    else if (path === "/" || path === "") {
      targetPath = "/jesus/";
    }
    else if (path === "/jesus") {
      // /jesus without trailing slash — redirect to root
      return Response.redirect(new URL("/", request.url).href, 301);
    }
    else if (path.startsWith("/jesus/")) {
      // Already has /jesus prefix (internal links)
      targetPath = path;
    }
    else {
      targetPath = "/jesus" + path;
    }

    const targetUrl = ORIGIN + targetPath + url.search;

    const response = await fetch(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.method !== "GET" && request.method !== "HEAD" ? request.body : undefined,
      cf: { cacheTtl: 0 },
    });

    // Clone response and modify headers
    const newResponse = new Response(response.body, response);
    newResponse.headers.set("X-Proxied-By", "jesus-proxy");

    // Don't let Cloudflare edge cache assets — origin changes on every deploy
    if (path.startsWith("/stylesheets/") || path.startsWith("/javascripts/") || path.startsWith("/assets/")) {
      newResponse.headers.set("Cache-Control", "no-cache");
    }

    return newResponse;
  },
};
