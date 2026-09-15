#!/usr/bin/env node
// Tạo nhanh một bài viết MDX mới trong data/blog với frontmatter chuẩn.
// Dùng: yarn new-post "Tiêu đề bài viết" [tag1,tag2]

import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import readline from 'readline'

const __dirname = dirname(fileURLToPath(import.meta.url))
const blogDir = join(__dirname, '..', 'data', 'blog')

function slugify(str) {
  return str
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function today() {
  const d = new Date()
  return d.toISOString().slice(0, 10)
}

function ask(rl, question) {
  return new Promise((resolve) => rl.question(question, resolve))
}

async function main() {
  const argTitle = process.argv[2]
  const argTags = process.argv[3]

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout })

  const title = argTitle || (await ask(rl, 'Tiêu đề bài viết: '))
  if (!title || !title.trim()) {
    console.error('Cần nhập tiêu đề.')
    rl.close()
    process.exit(1)
  }

  const summary = await ask(rl, 'Tóm tắt ngắn (summary, có thể để trống): ')
  const tagsInput = argTags || (await ask(rl, 'Tags (phân cách bởi dấu phẩy, có thể để trống): '))
  rl.close()

  const tags = tagsInput
    ? tagsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean)
    : []

  const slug = slugify(title)
  if (!existsSync(blogDir)) mkdirSync(blogDir, { recursive: true })
  const filePath = join(blogDir, `${slug}.mdx`)

  if (existsSync(filePath)) {
    console.error(`File đã tồn tại: ${filePath}`)
    process.exit(1)
  }

  const escapedTitle = title.replace(/'/g, "\\'")
  const escapedSummary = (summary || '').replace(/'/g, "\\'")
  const tagsYaml = tags.length ? `[${tags.map((t) => `'${t}'`).join(', ')}]` : '[]'

  const content = `---
title: '${escapedTitle}'
date: '${today()}'
tags: ${tagsYaml}
draft: false
summary: '${escapedSummary}'
---

Viết nội dung ở đây.
`

  writeFileSync(filePath, content, 'utf8')
  console.log(`Đã tạo bài viết mới: ${filePath}`)
  console.log('Mở file này bằng editor để viết nội dung, sau đó commit & push như bình thường.')
}

main()
