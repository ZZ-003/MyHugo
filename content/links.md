---
title: "友链"
layout: "simple"
menu:
  main:
    weight: 40
---
<div class="friend-links">
  <p class="fl-lead">一山一村一寸一分</p>
  <div class="fl-grid">
    <a class="fl-card" href="https://pythontutor.com/index.html" target="_blank" rel="noopener noreferrer">
      <span class="fl-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      </span>
      <span class="fl-main">
        <span class="fl-title">代码断点可视化</span>
        <span class="fl-desc">看清每一步</span>
      </span>
      <svg class="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
    </a>
    <a class="fl-card" href="https://github.com/Fux-i/Learning-In-UESTC/tree/main" target="_blank" rel="noopener noreferrer">
      <span class="fl-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
      </span>
      <span class="fl-main">
        <span class="fl-title">Learn In UESTC</span>
        <span class="fl-desc">伟大无需多言</span>
      </span>
      <svg class="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
    </a>
    <a class="fl-card" href="https://platform.agnes-ai.com/billing/billing" target="_blank" rel="noopener noreferrer">
      <span class="fl-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z"/><path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z"/></svg>
      </span>
      <span class="fl-main">
        <span class="fl-title">赛博 API</span>
        <span class="fl-desc">AI 模型接口平台</span>
      </span>
      <svg class="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
    </a>
    <a class="fl-card" href="https://ide.cloud.tencent.com/dashboard/gpu-workspace" target="_blank" rel="noopener noreferrer">
      <span class="fl-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17.5 19a4.5 4.5 0 0 0 .5-8.97A6 6 0 0 0 6.2 9.4 4 4 0 0 0 7 17.5h10.5z"/></svg>
      </span>
      <span class="fl-main">
        <span class="fl-title">腾讯的羊毛</span>
        <span class="fl-desc">Cloud Studio 在线工作区，GPU 免费额度已取消</span>
      </span>
      <svg class="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
    </a>
    <a class="fl-card" href="https://tianjg.com/" target="_blank" rel="noopener noreferrer">
      <span class="fl-icon" aria-hidden="true">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="7" width="20" height="10" rx="4"/><path d="M6 12h4"/><path d="M8 10v4"/><circle cx="16" cy="11" r="1"/><circle cx="18" cy="13" r="1"/></svg>
      </span>
      <span class="fl-main">
        <span class="fl-title">娱乐</span>
        <span class="fl-desc">闲时逛逛</span>
      </span>
      <svg class="fl-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17L17 7"/><path d="M8 7h9v9"/></svg>
    </a>
  </div>
  <p class="fl-note">看看你的<a href="mailto:1397866418@qq.com">邮箱</a></p>
</div>
<style>
  .friend-links {
    --fl-fg: rgb(var(--color-neutral-900));
    --fl-muted: rgb(var(--color-neutral-500));
    --fl-border: rgb(var(--color-neutral-200));
    --fl-surface: #fff;
    --fl-accent: rgb(var(--color-primary-600));
    max-width: 62rem;
  }
  .friend-links .fl-lead {
    margin: 0 0 1.5rem;
    font-size: 1rem;
    color: var(--fl-muted);
  }
  .friend-links .fl-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 16rem), 1fr));
    gap: 0.875rem;
  }
  .friend-links .fl-card {
    display: flex;
    align-items: center;
    gap: 0.875rem;
    padding: 0.875rem 1rem;
    background: var(--fl-surface);
    border: 1px solid var(--fl-border);
    border-radius: 0.875rem;
    text-decoration: none;
    color: inherit;
    transition: transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
  }
  .friend-links .fl-card:hover {
    transform: translateY(-2px);
    border-color: rgb(var(--color-primary-300));
    box-shadow: 0 8px 24px -14px rgba(24, 24, 27, 0.35);
  }
  .friend-links .fl-icon {
    flex: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 0.75rem;
    background: rgb(var(--color-primary-50));
    color: var(--fl-accent);
  }
  .friend-links .fl-icon svg {
    width: 1.15rem;
    height: 1.15rem;
  }
  .friend-links .fl-main {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .friend-links .fl-title {
    font-size: 0.95rem;
    font-weight: 600;
    line-height: 1.35;
    color: var(--fl-fg);
  }
  .friend-links .fl-desc {
    margin-top: 0.15rem;
    font-size: 0.78rem;
    line-height: 1.45;
    color: var(--fl-muted);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
  }
  .friend-links .fl-arrow {
    flex: none;
    margin-left: auto;
    width: 1rem;
    height: 1rem;
    color: rgb(var(--color-neutral-400));
    opacity: 0;
    transform: translate(-2px, 2px);
    transition: opacity 0.18s ease, transform 0.18s ease, color 0.18s ease;
  }
  .friend-links .fl-card:hover .fl-arrow {
    opacity: 1;
    transform: none;
    color: var(--fl-accent);
  }
  .friend-links .fl-note {
    margin: 1.5rem 0 0;
    padding: 0.875rem 1rem;
    border: 1px dashed var(--fl-border);
    border-radius: 0.875rem;
    background: rgb(var(--color-neutral-50));
    font-size: 0.85rem;
    color: var(--fl-muted);
  }
  .friend-links .fl-note a {
    color: var(--fl-accent);
    text-decoration: none;
  }
  .friend-links .fl-note a:hover {
    text-decoration: underline;
  }
  html.dark .friend-links .fl-lead,
  html.dark .friend-links .fl-desc,
  html.dark .friend-links .fl-note {
    color: rgb(var(--color-neutral-400));
  }
  html.dark .friend-links .fl-title {
    color: rgb(var(--color-neutral-100));
  }
  html.dark .friend-links .fl-card {
    background: rgba(39, 39, 42, 0.75);
    border-color: rgba(255, 255, 255, 0.1);
  }
  html.dark .friend-links .fl-card:hover {
    border-color: rgb(var(--color-primary-400));
    box-shadow: 0 8px 24px -14px rgba(0, 0, 0, 0.9);
  }
  html.dark .friend-links .fl-icon {
    background: rgba(139, 92, 246, 0.16);
    color: rgb(var(--color-primary-300));
  }
  html.dark .friend-links .fl-note {
    background: rgba(39, 39, 42, 0.55);
    border-color: rgba(255, 255, 255, 0.12);
  }
  html.dark .friend-links .fl-note a {
    color: rgb(var(--color-primary-300));
  }
</style>