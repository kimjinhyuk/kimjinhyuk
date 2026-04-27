#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const BLOG_URL = 'https://blog.jinhyuk.kim/';
const README_PATH = path.resolve(process.cwd(), 'README.md');
const MARKER_START = '<!-- BLOG-FEED:START -->';
const MARKER_END = '<!-- BLOG-FEED:END -->';
const TOP_N = 3;

async function fetchHomepage() {
  const res = await fetch(BLOG_URL, {
    headers: { 'User-Agent': 'kimjinhyuk-profile-blog-feed/1.0 (+https://github.com/kimjinhyuk/kimjinhyuk)' },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}

function parsePosts(html) {
  const linkRe = /href="([^"]+)"[^>]*class="post-item glass"[^>]*>([\s\S]*?)<\/a>/g;
  const titleRe = /class="post-title"[^>]*>([^<]+)/;
  const dateRe = /class="post-date"[^>]*>([^<]+)/;
  const posts = [];
  let m;
  while ((m = linkRe.exec(html)) !== null) {
    const href = m[1];
    const inner = m[2];
    const title = inner.match(titleRe)?.[1]?.trim();
    const date = inner.match(dateRe)?.[1]?.trim();
    if (!title || !date) continue;
    const url = href.startsWith('http') ? href : new URL(href, BLOG_URL).toString();
    posts.push({ url, title, date });
    if (posts.length >= TOP_N) break;
  }
  return posts;
}

function renderBlock(posts) {
  return posts
    .map(p => `- [${p.title}](${p.url})  <sub>· ${p.date}</sub>`)
    .join('\n');
}

function replaceBlock(readme, block) {
  const startIdx = readme.indexOf(MARKER_START);
  const endIdx = readme.indexOf(MARKER_END);
  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error('BLOG-FEED markers not found in README.md');
  }
  const before = readme.slice(0, startIdx + MARKER_START.length);
  const after = readme.slice(endIdx);
  return `${before}\n${block}\n${after}`;
}

async function main() {
  let html;
  try {
    html = await fetchHomepage();
  } catch (err) {
    console.error(`Fetch failed: ${err.message}; leaving README untouched.`);
    return;
  }

  const posts = parsePosts(html);
  if (posts.length === 0) {
    console.error('No posts parsed; leaving README untouched.');
    return;
  }

  const block = renderBlock(posts);
  const readme = await fs.readFile(README_PATH, 'utf-8');
  const updated = replaceBlock(readme, block);

  if (updated !== readme) {
    await fs.writeFile(README_PATH, updated);
    console.log(`Updated BLOG-FEED with ${posts.length} posts:`);
    posts.forEach(p => console.log(`  - ${p.date}  ${p.title}`));
  } else {
    console.log('BLOG-FEED already up-to-date.');
  }
}

main().catch(err => {
  console.error(`Unexpected error: ${err.message}`);
  // Exit 0 to keep workflow green — better to skip a day than fail loudly.
});
