#!/usr/bin/env node
import { build } from 'esbuild';
import { readdir } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const args = process.argv.slice(2);
const targets = args.length
  ? args
  : (
      await Promise.all(
        (await readdir(path.join(root, 'src/content'))).map(async (entry) => {
          const dir = path.join(root, 'src/content', entry);
          try {
            const files = await readdir(dir);
            return files
              .filter(
                (file) =>
                  file.startsWith('exam-questions') && file.endsWith('.ts'),
              )
              .map((file) => path.join(dir, file));
          } catch {
            return [];
          }
        }),
      )
    )
      .flat()
      .filter(Boolean);

if (!targets.length) {
  console.error('No exam question files found.');
  process.exit(1);
}

let failed = false;
const seen = new Map();

for (const target of targets) {
  const absolute = path.resolve(target);
  const relative = path.relative(root, absolute);
  const result = await build({
    entryPoints: [absolute],
    bundle: true,
    platform: 'node',
    format: 'esm',
    write: false,
    logLevel: 'silent',
  });
  const source = result.outputFiles[0].text;
  const encoded = Buffer.from(source).toString('base64');
  const module = await import(`data:text/javascript;base64,${encoded}`);
  const groups = Object.entries(module).filter(([, value]) =>
    Array.isArray(value),
  );
  if (!groups.length) {
    console.error(`${relative}: no exported question arrays.`);
    failed = true;
    continue;
  }
  let count = 0;
  for (const [name, questions] of groups) {
    for (const question of questions) {
      count += 1;
      const where = `${relative}#${name}[${question.id ?? '?'}]`;
      if (!/^[a-z0-9][a-z0-9-]*$/.test(question.id ?? '')) {
        console.error(`${where}: invalid id.`);
        failed = true;
      }
      if (seen.has(question.id)) {
        console.error(
          `${where}: duplicate id, also in ${seen.get(question.id)}.`,
        );
        failed = true;
      } else {
        seen.set(question.id, relative);
      }
      for (const field of ['title', 'prompt', 'solution', 'reasoning']) {
        if (typeof question[field] !== 'string' || !question[field].trim()) {
          console.error(`${where}: missing ${field}.`);
          failed = true;
        }
      }
      if (
        question.explanation !== undefined &&
        (typeof question.explanation !== 'string' ||
          !question.explanation.startsWith('/') ||
          !question.explanation.includes('#'))
      ) {
        console.warn(
          `${where}: explanation has no # anchor and will be omitted.`,
        );
      }
      const answer = question.answer;
      if (!answer || typeof answer !== 'object') {
        console.error(`${where}: missing answer.`);
        failed = true;
      } else if (answer.kind === 'self') {
        if (!Array.isArray(answer.checklist) || !answer.checklist.length) {
          console.error(`${where}: self answer needs a checklist.`);
          failed = true;
        }
      } else if (answer.kind === 'choice') {
        if (
          !Array.isArray(answer.options) ||
          answer.options.filter((option) => option.correct).length !== 1
        ) {
          console.error(`${where}: choose exactly one correct option.`);
          failed = true;
        }
      } else if (answer.kind === 'number') {
        if (
          !Number.isFinite(answer.value) ||
          !Number.isFinite(answer.tolerance)
        ) {
          console.error(`${where}: invalid numeric answer.`);
          failed = true;
        }
      } else if (answer.kind === 'code') {
        if (
          ![
            'python',
            'javascript',
            'haskell',
            'prolog',
            'sqlite',
            'postgresql',
          ].includes(answer.language) ||
          !answer.starter?.trim() ||
          !Array.isArray(answer.tests) ||
          !answer.tests.length ||
          answer.tests.length > 12
        ) {
          console.error(`${where}: invalid code answer.`);
          failed = true;
        }
      } else {
        console.error(`${where}: unknown answer kind ${answer.kind}.`);
        failed = true;
      }
    }
  }
  console.log(`${relative}: ${count} questions.`);
}

console.log(`${seen.size} unique questions.`);
if (failed) process.exit(1);
