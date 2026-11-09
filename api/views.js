/* =========================================================================
  文章访问计数接口（Vercel Serverless Function + Upstash Redis）

  ▸ 环境变量（Vercel 项目 Settings → Environment Variables 中配置）：
      UPSTASH_REDIS_REST_URL    Upstash 集成自动注入
      UPSTASH_REDIS_REST_TOKEN  Upstash 集成自动注入
    兼容旧的 Vercel KV 变量名：KV_REST_API_URL / KV_REST_API_TOKEN
    未配置时接口返回 503，前端会自动隐藏计数，不影响页面。

  ▸ 接口约定：
      GET  /api/views?slug=/posts/xxx/   读取当前计数，不自增
      POST /api/views  { "slug": "..." } 自增并返回最新计数
    前端同一标签页只 POST 一次，重复浏览只 GET，避免重复计数。

  ▸ 存储：Upstash Redis，key = blog:views:<slug>
========================================================================= */

const REDIS_URL =
  process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const REDIS_TOKEN =
  process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
const KEY_PREFIX = "blog:views:";

function first(value) {
  return Array.isArray(value) ? value[0] : value;
}

function normalizeSlug(input) {
  if (typeof input !== "string") return null;
  let slug = input.trim();
  if (!slug || slug.length > 300) return null;

  // 传入完整 URL 时只取路径，便于以后复用
  if (/^https?:\/\//i.test(slug)) {
    try {
      slug = new URL(slug).pathname;
    } catch (err) {
      return null;
    }
  }

  slug = slug.split("#")[0].split("?")[0];
  if (!slug.startsWith("/")) slug = "/" + slug;
  if (slug.includes("..")) return null;
  if (!/^\/[A-Za-z0-9\-._~!$&'()*+,;=:@/%]*$/.test(slug)) return null;

  return slug;
}

async function redis(command) {
  const res = await fetch(REDIS_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${REDIS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
  });

  if (!res.ok) throw new Error(`Redis HTTP ${res.status}`);

  const data = await res.json();
  if (data.error) throw new Error(data.error);
  return data.result;
}

module.exports = async function handler(req, res) {
  res.setHeader("Cache-Control", "no-store, max-age=0");
  res.setHeader("CDN-Cache-Control", "no-store");

  if (!REDIS_URL || !REDIS_TOKEN) {
    return res.status(503).json({ error: "not_configured" });
  }

  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "method_not_allowed" });
  }

  const rawSlug =
    req.method === "GET"
      ? req.query.slug
      : (req.body && req.body.slug) || req.query.slug;
  const slug = normalizeSlug(first(rawSlug));

  if (!slug) {
    return res.status(400).json({ error: "invalid_slug" });
  }

  const key = KEY_PREFIX + slug;

  try {
    if (req.method === "POST") {
      const count = await redis(["INCR", key]);
      return res.status(200).json({ slug, count: Number(count) || 0 });
    }

    const value = await redis(["GET", key]);
    return res.status(200).json({ slug, count: Number(value) || 0 });
  } catch (err) {
    console.error("[views] redis error:", err);
    return res.status(502).json({ error: "upstream_error" });
  }
};
