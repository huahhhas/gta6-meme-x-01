// gta6-meme-x-01 entry (Node 22, standard library only): it copies POST.json
// from the repository root to /output/POST.json, where the gate reads it.
// That is all the program has to do. The entry is the post itself: the meme
// (meme.png, made by the agent in this session) is posted on X from a public
// account with make.fun (a link or written out) and/or a tag of @makefunai
// and the entrant's play code in its text, POST.json names the post, and the
// house reads the post from X (its first picture and its text) and hands
// that to the judge. Nothing this program writes about the post is judged.
//
// Outside the grader's container, MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// stand in for /bot and /output:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const postPath = join(BOT_DIR, 'POST.json');
const post = JSON.parse(readFileSync(postPath, 'utf8'));
if (typeof post !== 'object' || post === null || typeof post.url !== 'string') {
  console.error('POST.json must be an object with a url string');
  process.exit(1);
}
if (post.url.includes('PLACEHOLDER')) {
  console.warn('warning: POST.json still holds the placeholder address — ' +
    'replace it with the real post URL before submitting');
}

mkdirSync(OUTPUT_DIR, { recursive: true });
copyFileSync(postPath, join(OUTPUT_DIR, 'POST.json'));
console.log(`POST.json copied to ${OUTPUT_DIR} (url: ${post.url})`);
