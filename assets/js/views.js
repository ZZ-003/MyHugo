/* =========================================================================
  文章阅读计数前端
  后端：api/views.js（Upstash Redis）
  - 本标签页首次进入：POST 自增并返回最新值
  - 同一标签页重复进入：只 GET，不重复计数
  - 接口不可用（如本地 hugo server）：隐藏计数，不影响阅读
========================================================================= */
(function () {
  "use strict";

  var el = document.getElementById("page-views");
  if (!el) return;

  var api = el.getAttribute("data-api") || "/api/views";
  var slug = el.getAttribute("data-slug") || window.location.pathname;
  var countEl = el.querySelector("[data-views-count]");
  var storageKey = "pv:" + slug;
  var counted = false;

  try {
    counted = window.sessionStorage.getItem(storageKey) === "1";
  } catch (err) {
    counted = false;
  }

  function format(count) {
    if (count >= 10000) {
      return (count / 10000).toFixed(1).replace(/\.0$/, "") + "万";
    }
    return String(count);
  }

  function show(count) {
    if (typeof count !== "number" || !isFinite(count)) return;
    countEl.textContent = format(count);
    el.style.display = "inline-flex";
  }

  function call(method) {
    var init = { method: method, cache: "no-store", headers: {} };

    if (method === "POST") {
      init.headers["Content-Type"] = "application/json";
      init.body = JSON.stringify({ slug: slug });
      init.keepalive = true;
    }

    var url = api + "?slug=" + encodeURIComponent(slug);

    return fetch(url, init).then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.json();
    });
  }

  if (counted) {
    call("GET")
      .then(function (data) {
        show(data.count);
      })
      .catch(function () {});
    return;
  }

  call("POST")
    .then(function (data) {
      show(data.count);
      try {
        window.sessionStorage.setItem(storageKey, "1");
      } catch (err) {}
    })
    .catch(function () {
      // 写入失败时退化为只读取，计数接口彻底不可用则保持隐藏
      call("GET")
        .then(function (data) {
          show(data.count);
        })
        .catch(function () {});
    });
})();
